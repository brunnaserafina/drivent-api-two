import { prisma } from "@/config";

async function findMany() {
  return prisma.ticketType.findMany();
}

const ticketsRepository = {
  findMany,
};

export default ticketsRepository;
