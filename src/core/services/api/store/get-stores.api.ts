import prisma from "@/lib/db";
import { IPrismaFindManyProps } from "@/core/types";

const getStores = async (options: IPrismaFindManyProps | undefined) => {
  const stores = await prisma.store.findMany(options);

  return stores;
};

export default getStores;
