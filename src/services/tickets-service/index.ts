import { notFoundError } from "@/errors";
import ticketsRepository from "@/repositories/tickets-repository/index";
import userRepository from "@/repositories/user-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { TicketsTypesEntity, TicketsEntity } from "@/protocols";
import { exclude } from "@/utils/prisma-utils";

async function getTicketsTypes(): Promise<TicketsTypesEntity[]> {
  const ticketstypes = await ticketsRepository.findMany();
  if (!ticketstypes) throw notFoundError();

  return ticketstypes;
}

async function getTicket(userId: number): Promise<TicketsEntity> {
  const user = await userRepository.findByUserId(userId);
  if (!user) throw notFoundError();

  const ticket = await ticketsRepository.findFirst(userId);
  if (!ticket) throw notFoundError();

  return exclude(ticket, "Enrollment");
}

async function insertTicket(userId: number, ticketTypeId: number): Promise<void> {
  const user = await userRepository.findByUserId(userId);
  if (!user) throw notFoundError();

  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  await ticketsRepository.create(ticketTypeId, enrollment.id);
}

const ticketsService = {
  getTicketsTypes,
  getTicket,
  insertTicket,
};

export default ticketsService;
