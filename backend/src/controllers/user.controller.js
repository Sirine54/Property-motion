import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

export async function getCurrentUser(req, res) {
  try {
    console.log("[getCurrentUser] incoming request, headers:", {
      authorization: req.headers?.authorization,
      cookies: req.headers?.cookie, 
    });

    const userId = req.userId;
    console.log("[getCurrentUser] req.userId:", userId);

    if (!userId) {
      console.warn(
        "[getCurrentUser] No userId on request — user is not authenticated"
      );
      return res.status(401).json({ error: "Not authenticated" });
    }

    if (typeof userId !== "string") {
      console.error(
        "[getCurrentUser] userId has unexpected type:",
        typeof userId,
        userId
      );
      return res.status(400).json({ error: "Invalid user id format" });
    }

    let user;
    try {
      user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          uid: true,
          email: true,
          name: true,
          businessName: true,
          officeAddress: true,
          postCode: true,
          createdAt: true,
          // status: true,
        },
      });
    } catch (prismaErr) {
      console.error(
        "[getCurrentUser] Prisma error when finding user:",
        prismaErr
      );
      // surface message for dev; return generic in prod
      return res
        .status(500)
        .json({
          error: "Database error",
          detail: String(prismaErr.message || prismaErr),
        });
    }

    if (!user) {
      console.warn("[getCurrentUser] user not found for id:", userId);
      return res.status(404).json({ error: "User not found" });
    }

    console.log("[getCurrentUser] returning user:", {
      id: user.id,
      email: user.email,
    });
    return res.json(user);
  } catch (err) {
    console.error(
      "[getCurrentUser] Unexpected error:",
      err && err.stack ? err.stack : err
    );
    return res
      .status(500)
      .json({ error: "Server error", detail: String(err?.message || err) });
  }
}

export async function register(req, res) {
  try {
    const { email, password, name } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ error: "Email already exists" });
    }

    const hashed = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { email, password: hashed, name },
    });

    return res.status(201).json({
      id: user.id,
      email: user.email,
      name: user.name,
    });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}

export async function listUsers(req, res) {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        businessName: true,
        createdAt: true,
        status: true,
      },
    });
    return res.json(users);
  } catch (err) {
    console.error("List users error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}

export async function getUser(req, res) {
  try {
    const id = req.params.id;
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        uid: true,
        email: true,
        name: true,
        businessName: true,
        officeAddress: true,
        postCode: true,
        createdAt: true,
        status: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json(user);
  } catch (err) {
    console.error("Get user error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}

export async function createUser(req, res) {
  try {
    const { email, password, name, businessName, officeAddress, postCode } =
      req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const hashed = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashed,
        name,
        businessName,
        officeAddress,
        postCode,
      },
    });

    return res.status(201).json({
      id: user.id,
      email: user.email,
      name: user.name,
      businessName: user.businessName,
    });
  } catch (err) {
    console.error("Create user error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}

export async function updateUser(req, res) {
  try {
    const id = req.params.id;
    const { name, businessName, officeAddress, postCode, status } = req.body;

    const user = await prisma.user.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(businessName && { businessName }),
        ...(officeAddress && { officeAddress }),
        ...(postCode && { postCode }),
        ...(status && { status }),
      },
    });

    return res.json({
      id: user.id,
      email: user.email,
      name: user.name,
      businessName: user.businessName,
      officeAddress: user.officeAddress,
      postCode: user.postCode,
      status: user.status,
    });
  } catch (err) {
    console.error("Update user error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}

export async function deleteUser(req, res) {
  try {
    const id = req.params.id;
    await prisma.user.delete({ where: { id } });
    return res.json({ ok: true });
  } catch (err) {
    console.error("Delete user error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
