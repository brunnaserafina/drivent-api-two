import { notFoundError, unauthorizedError } from "@/errors";
import ticketsRepository from "@/repositories/tickets-repository/index";
import paymentsRepository from "@/repositories/payments-repository/index";
import { CardData, PaymentsEntity } from "@/protocols";

async function getPaymentByTicketId(ticketId: number, userId: number): Promise<PaymentsEntity> {
  const ticket = await ticketsRepository.findFirstByTicketId(ticketId);
  if (!ticket) throw notFoundError();

  if (ticket.Enrollment.userId !== userId) throw unauthorizedError();

  const payment = await paymentsRepository.findFirst(ticketId);
  if (!payment) throw notFoundError();

  return payment;
}

async function postPayment(ticketId: number, userId: number, cardData: CardData): Promise<PaymentsEntity> {
  const ticket = await ticketsRepository.findFirstByTicketId(ticketId);
  if (!ticket) throw notFoundError();

  if (ticket.Enrollment.userId !== userId) throw unauthorizedError();

  const value: number = ticket.TicketType.price;

  const postedPayment = await paymentsRepository.create(ticketId, cardData, value);
  if (!postedPayment) throw notFoundError();

  await ticketsRepository.update(ticketId);

  const payment = await paymentsRepository.findFirst(ticketId);
  if (!payment) throw notFoundError();

  return payment;
}

const paymentsService = { getPaymentByTicketId, postPayment };

export default paymentsService;
