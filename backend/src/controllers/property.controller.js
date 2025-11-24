import prisma from "../lib/prisma.js";
import { nanoid } from "nanoid";


export async function createProperty(req, res) {
  try {
    const {
      name,
      address,
      city,
      country,
      postCode,
      reference,
      propertyValue,
      propertyType,
      accessProperty,
      dimensions,
      bedrooms,
      bathrooms,
      floors,
      features,
      propertyOn,
    } = req.body;

    if (!name) return res.status(400).json({ error: "Property name required" });

    const ownerId = req.userId || req.body.ownerId;
    if (!ownerId) return res.status(400).json({ error: "ownerId required" });

    let imageUrl = null;
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    const uid = nanoid(21);

    const data = {
      uid,
      name,
      imageUrl,
      address: address || null,
      city: city || null,
      country: country || null,
      postCode: postCode || null,
      reference: reference || null,
      propertyValue: propertyValue ? Number(propertyValue) : null,
      propertyType: propertyType || null,
      accessProperty: accessProperty || null,
      dimensions: dimensions || null,
      bedrooms: bedrooms ? parseInt(bedrooms, 10) : null,
      bathrooms: bathrooms ? parseInt(bathrooms, 10) : null,
      floors: floors ? parseInt(floors, 10) : null,
      features: features
        ? typeof features === "string"
          ? features
          : JSON.stringify(features)
        : null,
       propertyOn:propertyOn || null, 
      ownerId,

    };

    const property = await prisma.property.create({
      data,
      select: {
        id: true,
        uid: true,
        name: true,
        imageUrl: true,
        address: true,
        city: true,
        country: true,
        postCode: true,
        reference: true,
        propertyValue: true,
        propertyType: true,
        accessProperty: true,
        dimensions: true,
        bedrooms: true,
        bathrooms: true,
        floors: true,
        features: true,
        ownerId: true,
        propertyOn:true,
        createdAt: true,
      },
    });

    return res.status(201).json(property);
  } catch (err) {
    console.error("CREATE PROPERTY ERROR:", err);
    return res.status(500).json({ error: "Server error" });
  }
}

export async function listProperties(req, res) {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const pageSize = Math.min(50, Number(req.query.limit) || 10);
    const skip = (page - 1) * pageSize;

    const [items, total] = await Promise.all([
      prisma.property.findMany({
        skip,
        take: pageSize,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          uid: true,
          name: true,
          imageUrl: true,
          address: true,
          city: true,
          country: true,
          postCode: true,
          reference: true,
          propertyValue: true,
          propertyType: true,
          accessProperty: true,
          dimensions: true,
          bedrooms: true,
          bathrooms: true,
          floors: true,
          features: true,
          propertyOn:true,
          ownerId: true,
          createdAt: true,
        },
      }),
      prisma.property.count(),
    ]);

    return res.json({ items, total, page, pageSize });
  } catch (err) {
    console.error("LIST PROPERTIES ERROR:", err);
    return res.status(500).json({ error: "Server error" });
  }
}

export async function getProperty(req, res) {
  try {
    const idOrUid = req.params.id;
    const property = await prisma.property.findFirst({
      where: { OR: [{ uid: idOrUid }, { id: idOrUid }] },
      include: {
        owner: {
          select: {
            id: true,
            uid: true,
            email: true,
            name: true,
            businessName: true,
          },
        },
      },
    });
    if (!property) return res.status(404).json({ error: "Property not found" });
    return res.json(property);
  } catch (err) {
    console.error("GET PROPERTY ERROR:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
