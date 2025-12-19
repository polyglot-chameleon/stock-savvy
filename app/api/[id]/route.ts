import { prisma } from "@/prisma/prisma";

export async function GET(_req: Request, ctx: RouteContext<"/api/[id]">) {
  const { id } = await ctx.params;

  const results = await prisma.company.findUnique({
    where: {
      id: Number(id),
    },
    include: { shareValues: true, metrics: true },
  });

  return new Response(JSON.stringify(results), {
    headers: { "Content-Type": "application/json" },
  });
}
