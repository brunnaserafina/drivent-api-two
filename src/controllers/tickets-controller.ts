import { AuthenticatedRequest } from "@/middlewares";
import ticketsService from "@/services/tickets-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function getTicketsTypes(_req: Request, res: Response) {
  try {
    const ticketsTypes = await ticketsService.getTicketsTypes();
    return res.status(httpStatus.OK).send(ticketsTypes);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send(error);
  }
}

export async function getTicket(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId as number;

  try {
    const tickets = await ticketsService.getTicket(userId);
    return res.status(httpStatus.OK).send(tickets);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}

export async function insertTicket(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId as number;
  const ticketTypeId = req.body.ticketTypeId as number;

  if (!ticketTypeId) return res.sendStatus(httpStatus.BAD_REQUEST);

  try {
    await ticketsService.insertTicket(userId, ticketTypeId);
    const ticket = await ticketsService.getTicket(userId);
    return res.status(httpStatus.CREATED).send(ticket);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}
