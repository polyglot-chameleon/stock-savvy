import { prisma } from "@/prisma/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");

  const results = await prisma.rating.findMany({
    where: {
      date: {
        gte: new Date(Date.parse(date!) - 24 * 60 * 60 * 1000),
        lte: new Date(Date.parse(date!) + 24 * 60 * 60 * 1000),
      },
    },
    select: { id: true, rating: true },
  });

  return new Response(JSON.stringify(results), {
    headers: { "Content-Type": "application/json" },
  });
}
