import {
  MetricCreateManyInput,
  RatingCreateManyInput,
  ShareValueCreateManyInput,
} from "@/generated/prisma/models";
import { prisma } from "./prisma";
import { faker } from "@faker-js/faker";

async function main() {
  await prisma.company.createMany({
    data: [
      { name: "Apple Inc.", ticker: "AAPL" },
      {
        name: "Microsoft Corporation",
        ticker: "MSFT",
      },
      { name: "Amazon.com, Inc.", ticker: "AMZN" },
      { name: "Alphabet Inc.", ticker: "GOOGL" },
      { name: "Meta Platforms, Inc.", ticker: "META" },
    ],
    skipDuplicates: true,
  });

  const getMetrics = (companyId: number) => ({
    data: Array.from(
      { length: 365 },
      () =>
        ({
          companyId: companyId,
          date: new Date(
            Date.now() - Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000
          ),
          per: Math.random() * 50,
          eps: Math.random() * 10,
          roe: Math.random(),
          d2e: Math.random(),
        } as MetricCreateManyInput)
    ),
    skipDuplicates: true,
  });

  Array.from(
    { length: 5 },
    async (_, i) => await prisma.metric.createMany(getMetrics(i + 1))
  );

  const getShareValues = (companyId: number) => ({
    data: Array.from({ length: 365 }, () => Math.random() * 500).map(
      (value, index) =>
        ({
          companyId: companyId,
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

  Array.from(
    { length: 5 },
    async (_, i) => await prisma.shareValue.createMany(getShareValues(i + 1))
  );

  const getNewsItems = (companyId: number) => ({
    data: Array.from({ length: 365 }, () => ({
      companyId: companyId,
      date: new Date(
        Date.now() - Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000
      ),
      title: faker.book.title(),
      src: "https://example.com/news",
      sentiment: Math.random() * 2 - 1,
    })),
    skipDuplicates: true,
  });

  Array.from(
    { length: 5 },
    async (_, i) => await prisma.newsItem.createMany(getNewsItems(i + 1))
  );

  await prisma.rating.createMany({
    data: Array.from({ length: 365 }, () => ({
      companyId: 1,
      date: new Date(
        Date.now() - Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000
      ),
      agency: faker.company.name(),
      rating: Math.random() * 100,
    })),
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
