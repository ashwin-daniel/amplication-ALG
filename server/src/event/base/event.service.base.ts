import { PrismaService } from "nestjs-prisma";
import { Prisma, Event } from "@prisma/client";

export class EventServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.EventFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.EventFindManyArgs>
  ): Promise<number> {
    return this.prisma.event.count(args);
  }

  async findMany<T extends Prisma.EventFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.EventFindManyArgs>
  ): Promise<Event[]> {
    return this.prisma.event.findMany(args);
  }
  async findOne<T extends Prisma.EventFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.EventFindUniqueArgs>
  ): Promise<Event | null> {
    return this.prisma.event.findUnique(args);
  }
  async create<T extends Prisma.EventCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.EventCreateArgs>
  ): Promise<Event> {
    return this.prisma.event.create<T>(args);
  }
  async update<T extends Prisma.EventUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.EventUpdateArgs>
  ): Promise<Event> {
    return this.prisma.event.update<T>(args);
  }
  async delete<T extends Prisma.EventDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.EventDeleteArgs>
  ): Promise<Event> {
    return this.prisma.event.delete(args);
  }
}
