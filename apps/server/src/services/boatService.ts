import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getBoatById(id: string) {
  try {
    const boat = await prisma.boat.findUnique({
      where: { id },
    });
    return boat;
  } catch (error) {
    console.error('Error fetching boat:', error);
    throw new Error('Could not fetch boat');
  }
}

// services/boatService.ts

export async function cloneBoat(boatId: string) {
  // 1. Find the original boat
  const originalBoat = await prisma.boat.findUnique({
    where: { id: boatId },
  });

  if (!originalBoat) {
    throw new Error('Boat not found');
  }

  // 2. Create a copy without the id
  const { id, ...boatData } = originalBoat;

  // Optional: adjust name to show it's a copy
  boatData.tittle = `${boatData.tittle} (Copy)`;

  // 3. Insert new boat
  const newBoat = await prisma.boat.create({
    data: boatData,
  });

  return newBoat;
}

export async function deleteBoat(boatId: string) {
  await prisma.boat.delete({
    where: { id: boatId },
  });
}
