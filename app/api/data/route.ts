import { prisma } from "@/prisma/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const companyId = searchParams.get("companyId")!;

  const results = await prisma.shareValue.findMany({
    where: {
      companyId: Number(companyId),
    },
    select: {
      date: true,
      closePrice: true,
    },
  });

  return new Response(JSON.stringify(results), {
    headers: { "Content-Type": "application/json" },
  });
}
