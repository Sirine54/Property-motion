import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "devsecret";

function extractTokenFromReq(req) {
  const auth = req.headers?.authorization;
  if (auth && typeof auth === "string") {
    const parts = auth.split(" ");
    if (parts.length === 2 && parts[0].toLowerCase() === "bearer") {
      return parts[1];
    }
  }

  if (req.cookies && req.cookies.session) {
    return req.cookies.session;
  }

  return null;
}

export async function verifySession(req, res, next) {
  try {
    const token = extractTokenFromReq(req);
    if (!token) return res.status(401).json({ error: "No token provided" });

    const payload = jwt.verify(token, JWT_SECRET);
    req.userId = payload.userId;
    req.user = payload;
    return next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized" });
  }
}
