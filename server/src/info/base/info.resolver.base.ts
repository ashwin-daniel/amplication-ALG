import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import { CreateInfoArgs } from "./CreateInfoArgs";
import { UpdateInfoArgs } from "./UpdateInfoArgs";
import { DeleteInfoArgs } from "./DeleteInfoArgs";
import { InfoFindManyArgs } from "./InfoFindManyArgs";
import { InfoFindUniqueArgs } from "./InfoFindUniqueArgs";
import { Info } from "./Info";
import { InfoService } from "../info.service";

@graphql.Resolver(() => Info)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class InfoResolverBase {
  constructor(
    protected readonly service: InfoService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Info",
    action: "read",
    possession: "any",
  })
  async _infosMeta(
    @graphql.Args() args: InfoFindManyArgs
  ): Promise<MetaQueryPayload> {
    const results = await this.service.count({
      ...args,
      skip: undefined,
      take: undefined,
    });
    return {
      count: results,
    };
  }

  @graphql.Query(() => [Info])
  @nestAccessControl.UseRoles({
    resource: "Info",
    action: "read",
    possession: "any",
  })
  async infos(
    @graphql.Args() args: InfoFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Info[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Info",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Info, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Info",
    action: "read",
    possession: "own",
  })
  async info(
    @graphql.Args() args: InfoFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Info | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Info",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Info)
  @nestAccessControl.UseRoles({
    resource: "Info",
    action: "create",
    possession: "any",
  })
  async createInfo(
    @graphql.Args() args: CreateInfoArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Info> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Info",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Info"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => Info)
  @nestAccessControl.UseRoles({
    resource: "Info",
    action: "update",
    possession: "any",
  })
  async updateInfo(
    @graphql.Args() args: UpdateInfoArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Info | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Info",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Info"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: args.data,
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => Info)
  @nestAccessControl.UseRoles({
    resource: "Info",
    action: "delete",
    possession: "any",
  })
  async deleteInfo(@graphql.Args() args: DeleteInfoArgs): Promise<Info | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }
}
