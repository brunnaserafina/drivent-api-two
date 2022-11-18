import { notFoundError, unauthorizedError } from "@/errors";
import ticketsRepository from "@/repositories/tickets-repository/index";
import paymentsRepository from "@/repositories/payments-repository/index";
import { PaymentsEntity } from "@/protocols";

async function getPaymentByTicketId(ticketId: number, userId: number): Promise<PaymentsEntity> {
  const ticket = await ticketsRepository.findFirstByTicketId(ticketId);
  if (!ticket) throw notFoundError();

  if (ticket.Enrollment.userId !== userId) throw unauthorizedError();

  const payment = await paymentsRepository.findFirst(ticketId);
  if (!payment) throw notFoundError();

  return payment;
}

const paymentsService = { getPaymentByTicketId };

export default paymentsService;
