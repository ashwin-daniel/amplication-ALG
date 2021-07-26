import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { InfoService } from "./info.service";
import { InfoControllerBase } from "./base/info.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("infos")
@common.Controller("infos")
export class InfoController extends InfoControllerBase {
  constructor(
    protected readonly service: InfoService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
