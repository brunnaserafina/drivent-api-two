import { notFoundError, unauthorizedError } from "@/errors";
import ticketsRepository from "@/repositories/tickets-repository/index";
import paymentsRepository from "@/repositories/payments-repository/index";
import { CardData, PaymentsEntity, TicketsEntity } from "@/protocols";
import { exclude } from "@/utils/prisma-utils";

async function compareTicketIdByUserId(ticketId: number, userId: number): Promise<TicketsEntity> {
  const ticket = await ticketsRepository.findFirstTicketById(ticketId);
  if (!ticket) throw notFoundError();

  if (ticket.Enrollment.userId !== userId) throw unauthorizedError();

  return exclude(ticket, "Enrollment");
}

async function getPaymentByTicketId(ticketId: number, userId: number): Promise<PaymentsEntity> {
  await compareTicketIdByUserId(ticketId, userId);

  const payment = await paymentsRepository.findFirst(ticketId);
  if (!payment) throw notFoundError();

  return payment;
}

async function postPayment(ticketId: number, userId: number, cardData: CardData): Promise<PaymentsEntity> {
  const ticket = await compareTicketIdByUserId(ticketId, userId);

  const postedPayment = await paymentsRepository.create(ticketId, cardData, ticket.TicketType.price);
  if (!postedPayment) throw notFoundError();

  await ticketsRepository.updateTicket(ticketId);

  return await getPaymentByTicketId(ticketId, userId);
}

const paymentsService = { getPaymentByTicketId, postPayment };

export default paymentsService;
