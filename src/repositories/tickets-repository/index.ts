import { prisma } from "@/config";

async function findMany() {
  return prisma.ticketType.findMany();
}

async function findFirst(userId: number) {
  return prisma.ticket.findFirst({
    where: {
      Enrollment: {
        userId: userId,
      },
    },
    include: {
      TicketType: true,
      Enrollment: true,
    },
  });
}

const ticketsRepository = {
  findMany,
  findFirst,
};

export default ticketsRepository;
