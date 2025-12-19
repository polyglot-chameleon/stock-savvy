import { prisma } from "@/prisma/prisma";

export async function GET(req: Request, ctx: RouteContext<"/api/news/[id]">) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");
  const { id } = await ctx.params;

  const results = await prisma.newsItem.findMany({
    where: {
      companyId: Number(id),
      date: {
        gte: new Date(Date.parse(date!) - 24 * 60 * 60 * 1000),
        lte: new Date(Date.parse(date!) + 24 * 60 * 60 * 1000),
      },
    },
    select: { id: true, title: true, date: true, sentiment: true },
  });

  return new Response(JSON.stringify(results), {
    headers: { "Content-Type": "application/json" },
  });
}
