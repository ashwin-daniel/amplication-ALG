import { Module } from "@nestjs/common";
import { InfoModuleBase } from "./base/info.module.base";
import { InfoService } from "./info.service";
import { InfoController } from "./info.controller";
import { InfoResolver } from "./info.resolver";

@Module({
  imports: [InfoModuleBase],
  controllers: [InfoController],
  providers: [InfoService, InfoResolver],
  exports: [InfoService],
})
export class InfoModule {}
