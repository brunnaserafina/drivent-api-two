import { notFoundError } from "@/errors";
import ticketsRepository from "@/repositories/tickets-repository/index";
import userRepository from "@/repositories/user-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { TicketsTypesEntity, TicketsEntity } from "@/protocols";
import { exclude } from "@/utils/prisma-utils";

async function findUserById(userId: number): Promise<void> {
  const user = await userRepository.findByUserId(userId);
  if (!user) throw notFoundError();
}

async function getTicketsTypes(): Promise<TicketsTypesEntity[]> {
  const ticketstypes = await ticketsRepository.findManyTicketType();
  if (!ticketstypes) throw notFoundError();

  return ticketstypes;
}

async function getTicket(userId: number): Promise<TicketsEntity> {
  findUserById(userId);

  const ticket = await ticketsRepository.findFirstTicket(userId);
  if (!ticket) throw notFoundError();

  return exclude(ticket, "Enrollment");
}

async function insertTicket(userId: number, ticketTypeId: number): Promise<void> {
  findUserById(userId);

  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  await ticketsRepository.createTicket(ticketTypeId, enrollment.id);
}

const ticketsService = {
  getTicketsTypes,
  getTicket,
  insertTicket,
};

export default ticketsService;
