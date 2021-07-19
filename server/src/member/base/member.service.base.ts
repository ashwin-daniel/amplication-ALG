import { PrismaService } from "nestjs-prisma";
import { Prisma, Member } from "@prisma/client";

export class MemberServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.MemberFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.MemberFindManyArgs>
  ): Promise<number> {
    return this.prisma.member.count(args);
  }

  async findMany<T extends Prisma.MemberFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.MemberFindManyArgs>
  ): Promise<Member[]> {
    return this.prisma.member.findMany(args);
  }
  async findOne<T extends Prisma.MemberFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.MemberFindUniqueArgs>
  ): Promise<Member | null> {
    return this.prisma.member.findUnique(args);
  }
  async create<T extends Prisma.MemberCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.MemberCreateArgs>
  ): Promise<Member> {
    return this.prisma.member.create<T>(args);
  }
  async update<T extends Prisma.MemberUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.MemberUpdateArgs>
  ): Promise<Member> {
    return this.prisma.member.update<T>(args);
  }
  async delete<T extends Prisma.MemberDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.MemberDeleteArgs>
  ): Promise<Member> {
    return this.prisma.member.delete(args);
  }
}
