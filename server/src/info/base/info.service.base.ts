import { PrismaService } from "nestjs-prisma";
import { Prisma, Info } from "@prisma/client";

export class InfoServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.InfoFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.InfoFindManyArgs>
  ): Promise<number> {
    return this.prisma.info.count(args);
  }

  async findMany<T extends Prisma.InfoFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.InfoFindManyArgs>
  ): Promise<Info[]> {
    return this.prisma.info.findMany(args);
  }
  async findOne<T extends Prisma.InfoFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.InfoFindUniqueArgs>
  ): Promise<Info | null> {
    return this.prisma.info.findUnique(args);
  }
  async create<T extends Prisma.InfoCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.InfoCreateArgs>
  ): Promise<Info> {
    return this.prisma.info.create<T>(args);
  }
  async update<T extends Prisma.InfoUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.InfoUpdateArgs>
  ): Promise<Info> {
    return this.prisma.info.update<T>(args);
  }
  async delete<T extends Prisma.InfoDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.InfoDeleteArgs>
  ): Promise<Info> {
    return this.prisma.info.delete(args);
  }
}
