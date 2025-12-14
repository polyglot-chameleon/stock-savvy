import { prisma } from "@/prisma/prisma";

export async function GET(req: Request) {
  const results = await prisma.metric.findMany({
    select: { per: true, eps: true, roe: true, d2e: true },
  });

  return new Response(JSON.stringify(results), {
    headers: { "Content-Type": "application/json" },
  });
}
