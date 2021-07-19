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
import { CreateMemberArgs } from "./CreateMemberArgs";
import { UpdateMemberArgs } from "./UpdateMemberArgs";
import { DeleteMemberArgs } from "./DeleteMemberArgs";
import { MemberFindManyArgs } from "./MemberFindManyArgs";
import { MemberFindUniqueArgs } from "./MemberFindUniqueArgs";
import { Member } from "./Member";
import { MemberService } from "../member.service";

@graphql.Resolver(() => Member)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class MemberResolverBase {
  constructor(
    protected readonly service: MemberService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Member",
    action: "read",
    possession: "any",
  })
  async _membersMeta(
    @graphql.Args() args: MemberFindManyArgs
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

  @graphql.Query(() => [Member])
  @nestAccessControl.UseRoles({
    resource: "Member",
    action: "read",
    possession: "any",
  })
  async members(
    @graphql.Args() args: MemberFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Member[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Member",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Member, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Member",
    action: "read",
    possession: "own",
  })
  async member(
    @graphql.Args() args: MemberFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Member | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Member",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Member)
  @nestAccessControl.UseRoles({
    resource: "Member",
    action: "create",
    possession: "any",
  })
  async createMember(
    @graphql.Args() args: CreateMemberArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Member> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Member",
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
        `providing the properties: ${properties} on ${"Member"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => Member)
  @nestAccessControl.UseRoles({
    resource: "Member",
    action: "update",
    possession: "any",
  })
  async updateMember(
    @graphql.Args() args: UpdateMemberArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Member | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Member",
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
        `providing the properties: ${properties} on ${"Member"} update is forbidden for roles: ${roles}`
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

  @graphql.Mutation(() => Member)
  @nestAccessControl.UseRoles({
    resource: "Member",
    action: "delete",
    possession: "any",
  })
  async deleteMember(
    @graphql.Args() args: DeleteMemberArgs
  ): Promise<Member | null> {
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
