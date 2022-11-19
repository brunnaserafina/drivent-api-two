import { Request, Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import ticketsService from "@/services/tickets-service";
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
  const { userId } = req;

  try {
    const ticket = await ticketsService.getTicket(userId);
    return res.status(httpStatus.OK).send(ticket);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}

export async function insertTicket(req: AuthenticatedRequest, res: Response) {
  const { ticketTypeId } = req.body;
  const { userId } = req;

  try {
    await ticketsService.insertTicket(userId, ticketTypeId);
    const ticket = await ticketsService.getTicket(userId);
    return res.status(httpStatus.CREATED).send(ticket);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
