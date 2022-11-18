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

async function findUnique(ticketTypeId: number) {
  return prisma.ticketType.findUnique({
    where: {
      id: ticketTypeId,
    },
  });
}

async function findFirstByTicketId(ticketId: number) {
  return prisma.ticket.findUnique({
    where: {
      id: ticketId,
    },
    include: {
      Enrollment: true,
      TicketType: true,
    },
  });
}

async function create(ticketTypeId: number, enrollmentId: number) {
  return prisma.ticket.create({
    data: {
      ticketTypeId: ticketTypeId,
      enrollmentId: enrollmentId,
      status: "RESERVED",
    },
  });
}

async function update(ticketId: number) {
  return prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      status: "PAID",
    },
  });
}

const ticketsRepository = {
  findMany,
  findFirst,
  findUnique,
  findFirstByTicketId,
  create,
  update,
};

export default ticketsRepository;
