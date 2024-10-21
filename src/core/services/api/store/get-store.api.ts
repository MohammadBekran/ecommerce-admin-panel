import prisma from "@/lib/db";
import { IPrismaFindManyProps } from "@/core/types";

const getStore = async (options: IPrismaFindManyProps | undefined) => {
  const store = await prisma.store.findFirst(options);

  return store;
};

export default getStore;
