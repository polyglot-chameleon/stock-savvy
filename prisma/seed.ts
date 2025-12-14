import { ShareValueCreateManyInput } from "@/generated/prisma/models";
import { prisma } from "./prisma";

async function main() {
  await prisma.company.createMany({
    data: [
      { name: "Apple Inc.", ticker: "AAPL", marketCap: 2500000000000 },
      {
        name: "Microsoft Corporation",
        ticker: "MSFT",
        marketCap: 2000000000000,
      },
      { name: "Amazon.com, Inc.", ticker: "AMZN", marketCap: 1500000000000 },
      { name: "Alphabet Inc.", ticker: "GOOGL", marketCap: 1250000000000 },
      { name: "Meta Platforms, Inc.", ticker: "META", marketCap: 857534234567 },
    ],
    skipDuplicates: true,
  });

  await prisma.shareValue.createMany({
    data: Array.from({ length: 365 }, () => Math.random() * 500).map(
      (value, index) =>
        ({
          companyId: 1,
          date: new Date(Date.now() - (364 - index) * 24 * 60 * 60 * 1000),
          highPrice: value,
          lowPrice: value,
          openPrice: value,
          closePrice: value,
          volume: Math.floor(Math.random() * 1000000),
        } as ShareValueCreateManyInput)
    ),
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
