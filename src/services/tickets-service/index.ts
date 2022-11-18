import { notFoundError } from "@/errors";
import ticketsRepository from "@/repositories/tickets-repository/index";
import { TicketsTypesEntity } from "@/protocols";

async function getTicketsTypes(): Promise<TicketsTypesEntity[]> {
  const ticketstypes = await ticketsRepository.findMany();
  if (!ticketstypes) throw notFoundError();

  return ticketstypes;
}

const ticketsService = {
  getTicketsTypes,
};

export default ticketsService;
