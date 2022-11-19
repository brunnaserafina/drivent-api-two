import { prisma } from "@/config";
import { TicketStatus } from "@prisma/client";

async function findManyTicketType() {
  return prisma.ticketType.findMany();
}

async function findUniqueTicketType(ticketTypeId: number) {
  return prisma.ticketType.findUnique({
    where: {
      id: ticketTypeId,
    },
  });
}

async function findFirstTicket(userId: number) {
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

async function findFirstTicketById(ticketId: number) {
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

async function createTicket(ticketTypeId: number, enrollmentId: number) {
  return prisma.ticket.create({
    data: {
      ticketTypeId,
      enrollmentId,
      status: TicketStatus.RESERVED,
    },
  });
}

async function updateTicket(ticketId: number) {
  return prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      status: TicketStatus.PAID,
    },
  });
}

const ticketsRepository = {
  findManyTicketType,
  findUniqueTicketType,
  findFirstTicket,
  findFirstTicketById,
  createTicket,
  updateTicket,
};

export default ticketsRepository;
