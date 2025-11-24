import prisma from "../lib/prisma.js";
import { nanoid } from "nanoid";

function success(res, statusCode, data) {
  return res.status(statusCode).json({ statusCode, success: true, data });
}
function fail(res, statusCode, message) {
  return res
    .status(statusCode)
    .json({ statusCode, success: false, error: message });
}

export async function createService(req, res) {
  try {
    const { name, description } = req.body;
    if (!name) return fail(res, 400, "name required");
    const uid = nanoid(16);
    const s = await prisma.service.create({
      data: { uid, name, description },
      select: { id: true, uid: true, name: true, description: true },
    });
    return success(res, 201, s);
  } catch (err) {
    console.error("CREATE SERVICE ERROR:", err);
    return fail(res, 500, "Erreur serveur.");
  }
}

export async function listServices(req, res) {
  try {
    const items = await prisma.service.findMany({
      orderBy: { createdAt: "desc" },
    });
    return success(res, 200, items);
  } catch (err) {
    console.error("LIST SERVICES ERROR:", err);
    return fail(res, 500, "Erreur serveur.");
  }
}

export async function getService(req, res) {
  try {
    const idOrUid = req.params.id;
    const service = await prisma.service.findFirst({
      where: { OR: [{ uid: idOrUid }, { id: idOrUid }] },
    });
    if (!service) return fail(res, 404, "Service not found");
    return success(res, 200, service);
  } catch (err) {
    console.error("GET SERVICE ERROR:", err);
    return fail(res, 500, "Erreur serveur.");
  }
}

export async function updateService(req, res) {
  try {
    const idOrUid = req.params.id;
    const data = {};
    if (req.body.name) data.name = req.body.name;
    if (req.body.description !== undefined)
      data.description = req.body.description;
    const service = await prisma.service
      .update({ where: { uid: idOrUid }, data })
      .catch(async () => {
        return prisma.service.update({ where: { id: idOrUid }, data });
      });
    return success(res, 200, service);
  } catch (err) {
    console.error("UPDATE SERVICE ERROR:", err);
    return fail(res, 500, "Erreur serveur.");
  }
}

export async function deleteService(req, res) {
  try {
    const idOrUid = req.params.id;
    await prisma.service
      .delete({ where: { uid: idOrUid } })
      .catch(async () => prisma.service.delete({ where: { id: idOrUid } }));
    return success(res, 200, { message: "Service supprimé" });
  } catch (err) {
    console.error("DELETE SERVICE ERROR:", err);
    return fail(res, 500, "Erreur serveur.");
  }
}
