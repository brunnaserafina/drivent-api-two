import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { getTicketsTypes, getTicket, insertTicket } from "@/controllers";
import { createTicketSchema } from "@/schemas";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", getTicketsTypes)
  .get("/", getTicket)
  .post("/", validateBody(createTicketSchema), insertTicket);

export { ticketsRouter };
