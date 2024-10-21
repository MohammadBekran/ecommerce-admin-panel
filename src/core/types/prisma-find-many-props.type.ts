import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

interface IPrismaFindManyProps {
  select?: Prisma.StoreSelect<DefaultArgs> | null | undefined;
  where?: Prisma.StoreWhereInput | undefined;
  orderBy?:
    | (
        | Prisma.StoreOrderByWithRelationInput
        | Prisma.StoreOrderByWithRelationInput[]
      )
    | undefined;
  cursor?: Prisma.StoreWhereUniqueInput | undefined;
  take?: number | undefined;
  skip?: number | undefined;
  distinct?:
    | (Prisma.StoreScalarFieldEnum | Prisma.StoreScalarFieldEnum[])
    | undefined;
}

export default IPrismaFindManyProps;
