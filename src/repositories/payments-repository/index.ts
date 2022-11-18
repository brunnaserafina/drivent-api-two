import { prisma } from "@/config";

async function findFirst(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId: ticketId,
    },
  });
}

const paymentsRepository = {
  findFirst,
};

export default paymentsRepository;
