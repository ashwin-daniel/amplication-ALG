import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { InfoServiceBase } from "./base/info.service.base";

@Injectable()
export class InfoService extends InfoServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
