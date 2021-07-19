import { Module } from "@nestjs/common";
import { MemberModuleBase } from "./base/member.module.base";
import { MemberService } from "./member.service";
import { MemberController } from "./member.controller";
import { MemberResolver } from "./member.resolver";

@Module({
  imports: [MemberModuleBase],
  controllers: [MemberController],
  providers: [MemberService, MemberResolver],
  exports: [MemberService],
})
export class MemberModule {}
