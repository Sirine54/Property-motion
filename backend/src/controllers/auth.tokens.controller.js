import prisma from '../lib/prisma.js'
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { randomBytes } from "crypto";

const JWT_SECRET = process.env.JWT_SECRET || "change_this_now";
const ACCESS_EXPIRES = "15m"; 
const REFRESH_EXPIRES_DAYS = 30;
const COOKIE_NAME = "refresh_token";
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
};

function signAccessToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_EXPIRES });
}

function genRawToken() {
  return randomBytes(48).toString("hex");
}

async function hashToken(token) {
  return bcrypt.hash(token, 12);
}


export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Missing credentials" });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });

    const accessToken = signAccessToken({ userId: user.id });

    const raw = genRawToken();
    const hashed = await hashToken(raw);
    const expiresAt = new Date(
      Date.now() + REFRESH_EXPIRES_DAYS * 24 * 60 * 60 * 1000
    );

    const rt = await prisma.refreshToken.create({
      data: {
        tokenHash: hashed,
        userId: user.id,
        expiresAt,
      },
    });

    const cookieValue = `${rt.id}:${raw}`;
    res.cookie(COOKIE_NAME, cookieValue, {
      ...COOKIE_OPTIONS,
      maxAge: REFRESH_EXPIRES_DAYS * 24 * 60 * 60 * 1000,
    });

    return res.json({
      accessToken,
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
 
export async function refreshToken(req, res) {
  try {
    const cookie = req.cookies?.[COOKIE_NAME];
    if (!cookie) return res.status(401).json({ error: "No refresh token" });

    const [idStr, raw] = cookie.split(":");
    const id = idStr;
   if (!id || !raw) {
     res.clearCookie(COOKIE_NAME);
     return res.status(401).json({ error: "Invalid refresh token" });
   }

   const record = await prisma.refreshToken.findUnique({ where: { id } });
   if (!record || record.revoked) {
     res.clearCookie(COOKIE_NAME);
     return res.status(401).json({ error: "Invalid refresh token" });
   }


    if (new Date() > record.expiresAt) {
      await prisma.refreshToken.update({
        where: { id },
        data: { revoked: true },
      });
      res.clearCookie(COOKIE_NAME);
      return res.status(401).json({ error: "Refresh token expired" });
    }

    const match = await bcrypt.compare(raw, record.tokenHash);
    if (!match) {
      await prisma.refreshToken.update({
        where: { id },
        data: { revoked: true },
      });
      res.clearCookie(COOKIE_NAME);
      return res.status(401).json({ error: "Invalid refresh token" });
    }

    const newRaw = genRawToken();
    const newHashed = await hashToken(newRaw);
    const newExpiresAt = new Date(
      Date.now() + REFRESH_EXPIRES_DAYS * 24 * 60 * 60 * 1000
    );

    const newRecord = await prisma.refreshToken.create({
      data: {
        tokenHash: newHashed,
        userId: record.userId,
        expiresAt: newExpiresAt,
        replacedById: null,  
      },
    });

    await prisma.refreshToken.update({
      where: { id },
      data: { revoked: true, replacedById: newRecord.id },
    });

    const newCookieVal = `${newRecord.id}:${newRaw}`;
    res.cookie(COOKIE_NAME, newCookieVal, {
      ...COOKIE_OPTIONS,
      maxAge: REFRESH_EXPIRES_DAYS * 24 * 60 * 60 * 1000,
    });

    const accessToken = signAccessToken({ userId: record.userId });

    return res.json({ accessToken });
  } catch (err) {
    console.error("Refresh error:", err);
    res.clearCookie(COOKIE_NAME);
    return res.status(500).json({ error: "Server error" });
  }
}


export async function logout(req, res) {
  try {
    const cookie = req.cookies?.[COOKIE_NAME];
    if (cookie) {
      const [idStr] = cookie.split(":");
      const id = Number(idStr);
      if (id) {
        await prisma.refreshToken.updateMany({
          where: { id },
          data: { revoked: true },
        });
      }
    }

    res.clearCookie(COOKIE_NAME);
    return res.json({ ok: true });
  } catch (err) {
    console.error("Logout error:", err);
    res.clearCookie(COOKIE_NAME);
    return res.status(500).json({ error: "Server error" });
  }
}
