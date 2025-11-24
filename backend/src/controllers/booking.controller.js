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

export async function createBooking(req, res) {
  try {
    const {
      serviceId,
      total,
      details,
      date,
      userId,
      status,
    } = req.body;

    const ownerId = req.userId || userId;
    if (!serviceId) return fail(res, 400, "serviceId requis");

    let service = await prisma.service.findUnique({
      where: { uid: serviceId },
    });
    if (!service)
      service = await prisma.service.findUnique({ where: { id: serviceId } });
    if (!service) return fail(res, 404, "Service introuvable.");

    const validStatuses = ["PENDING", "IN_PROGRESS", "COMPLETED", "CANCELLED"];
    const bookingStatus =
      status && validStatuses.includes(status.toUpperCase())
        ? status.toUpperCase()
        : "PENDING";

    const uid = nanoid(21);
    const booking = await prisma.booking.create({
      data: {
        uid,
        serviceId: service.id,
        userId: ownerId || null,
        total: total ? Number(total) : null,
        details: details || null,
        date: date ? new Date(date) : null,
        status: bookingStatus,
      },
      include: {
        service: true,
        user: { select: { id: true, uid: true, email: true, name: true } },
      },
    });

    return success(res, 201, booking);
  } catch (err) {
    console.error("CREATE BOOKING ERROR:", err);
    return fail(res, 500, err.message || "Erreur serveur.");
  }
}

export async function listBookings(req, res) {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(100, Number(req.query.limit) || 10);
    const skip = (page - 1) * limit;

    const where = {};

    if (req.query.status) {
      const validStatuses = [
        "PENDING",
        "IN_PROGRESS",
        "COMPLETED",
        "CANCELLED",
      ];
      const status = req.query.status.toUpperCase();
      if (validStatuses.includes(status)) {
        where.status = status;
      }
    }

    if (req.query.ownerId) {
      where.userId = req.query.ownerId;
    }

    if (req.query.serviceId) {
      where.serviceId = req.query.serviceId;
    }

    if (req.query.month) {
      try {
        const [y, m] = req.query.month.split("-");
        const year = Number(y);
        const month = Number(m);

        if (!isNaN(year) && !isNaN(month) && month >= 1 && month <= 12) {
          const from = new Date(year, month - 1, 1);
          const to = new Date(year, month, 1);
          where.date = { gte: from, lt: to };
        }
      } catch (err) {
        console.error("Month parsing error:", err);
      }
    }

    const [items, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          service: { select: { id: true, uid: true, name: true } },
          user: { select: { id: true, uid: true, name: true, email: true } },
        },
      }),
      prisma.booking.count({ where }),
    ]);

    return success(res, 200, { items, total, page, limit });
  } catch (err) {
    console.error("LIST BOOKINGS ERROR:", err);
    return fail(res, 500, err.message || "Erreur serveur.");
  }
}

export async function getBooking(req, res) {
  try {
    const idOrUid = req.params.id;
    const booking = await prisma.booking.findFirst({
      where: { OR: [{ uid: idOrUid }, { id: idOrUid }] },
      include: {
        service: true,
        user: { select: { id: true, uid: true, name: true, email: true } },
      },
    });
    if (!booking) return fail(res, 404, "Booking not found.");
    return success(res, 200, booking);
  } catch (err) {
    console.error("GET BOOKING ERROR:", err);
    return fail(res, 500, err.message || "Erreur serveur.");
  }
}

export async function updateBooking(req, res) {
  try {
    const idOrUid = req.params.id;
    const data = {};

    if (req.body.status) {
      const validStatuses = [
        "PENDING",
        "IN_PROGRESS",
        "COMPLETED",
        "CANCELLED",
      ];
      const status = req.body.status.toUpperCase();
      if (validStatuses.includes(status)) {
        data.status = status;
      }
    }

    if (req.body.details !== undefined) data.details = req.body.details;
    if (req.body.total !== undefined) data.total = Number(req.body.total);
    if (req.body.date !== undefined)
      data.date = req.body.date ? new Date(req.body.date) : null;

    const booking = await prisma.booking
      .update({
        where: { uid: idOrUid },
        data,
        include: {
          service: true,
          user: { select: { id: true, uid: true, name: true, email: true } },
        },
      })
      .catch(async (e) => {
        return prisma.booking.update({
          where: { id: idOrUid },
          data,
          include: {
            service: true,
            user: { select: { id: true, uid: true, name: true, email: true } },
          },
        });
      });

    return success(res, 200, booking);
  } catch (err) {
    console.error("UPDATE BOOKING ERROR:", err);
    return fail(res, 500, err.message || "Erreur serveur.");
  }
}

export async function deleteBooking(req, res) {
  try {
    const idOrUid = req.params.id;
    await prisma.booking
      .delete({ where: { uid: idOrUid } })
      .catch(async (e) => {
        return prisma.booking.delete({ where: { id: idOrUid } });
      });
    return success(res, 200, { message: "Booking supprimé." });
  } catch (err) {
    console.error("DELETE BOOKING ERROR:", err);
    return fail(res, 500, err.message || "Erreur serveur.");
  }
}

export async function bookingStats(req, res) {
  try {
    const where = {};

    if (req.query.ownerId) {
      where.userId = req.query.ownerId;
    }

    if (req.query.month) {
      try {
        const [y, m] = req.query.month.split("-");
        const year = Number(y);
        const month = Number(m);

        if (!isNaN(year) && !isNaN(month) && month >= 1 && month <= 12) {
          const from = new Date(year, month - 1, 1);
          const to = new Date(year, month, 1);
          where.date = { gte: from, lt: to };
        }
      } catch (err) {
        console.error("Month parsing error:", err);
      }
    }

    const statuses = ["PENDING", "IN_PROGRESS", "COMPLETED", "CANCELLED"];
    const results = {};

    for (const s of statuses) {
      const count = await prisma.booking.count({
        where: { ...where, status: s },
      });
      results[s] = count;
    }
    return success(res, 200, results);
  } catch (err) {
    console.error("BOOKING STATS ERROR:", err);
    return fail(res, 500, err.message || "Erreur serveur.");
  }
}
