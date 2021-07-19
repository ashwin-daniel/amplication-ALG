import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { MemberServiceBase } from "./base/member.service.base";

@Injectable()
export class MemberService extends MemberServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
