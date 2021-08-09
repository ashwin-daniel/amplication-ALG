import * as common from '@nestjs/common';
import * as swagger from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { Request } from 'express';
import * as nestAccessControl from 'nest-access-control';
import * as nestMorgan from 'nest-morgan';
import * as abacUtil from '../../auth/abac.util';
import * as jwtAuthGuard from '../../auth/jwtAuth.guard';
import * as errors from '../../errors';
import { isRecordNotFoundError } from '../../prisma.util';
import { MemberService } from '../member.service';
import { Member } from './Member';
import { MemberCreateInput } from './MemberCreateInput';
import { MemberFindManyArgs } from './MemberFindManyArgs';
import { MemberUpdateInput } from './MemberUpdateInput';
import { MemberWhereUniqueInput } from './MemberWhereUniqueInput';

export class MemberControllerBase {
  constructor(
    protected readonly service: MemberService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor('combined'))
  @common.UseGuards(jwtAuthGuard.JwtAuthGuard)
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: 'Member',
    action: 'create',
    possession: 'any',
  })
  @swagger.ApiCreatedResponse({ type: Member })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Body() data: MemberCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Member> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: 'create',
      possession: 'any',
      resource: 'Member',
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(', ');
      const roles = userRoles.map((role: string) => JSON.stringify(role)).join(',');
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${'Member'} creation is forbidden for roles: ${roles}`
      );
    }
    return await this.service.create({
      data: data,
      select: {
        ace: true,
        avatar: true,
        createdAt: true,
        dob: true,
        doj: true,
        email: true,
        firstName: true,
        gender: true,
        id: true,
        lastName: true,
        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor('combined'))
  @common.UseGuards(jwtAuthGuard.JwtAuthGuard)
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: 'Member',
    action: 'read',
    possession: 'any',
  })
  @swagger.ApiOkResponse({ type: [Member] })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => MemberFindManyArgs,
    style: 'deepObject',
    explode: true,
  })
  async findMany(
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Member[]> {
    const args = plainToClass(MemberFindManyArgs, request.query);

    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: 'read',
      possession: 'any',
      resource: 'Member',
    });
    const results = await this.service.findMany({
      ...args,
      select: {
        ace: true,
        avatar: true,
        createdAt: true,
        dob: true,
        doj: true,
        email: true,
        firstName: true,
        gender: true,
        id: true,
        lastName: true,
        updatedAt: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor('combined'))
  @common.UseGuards(jwtAuthGuard.JwtAuthGuard)
  @common.Get('/:id')
  @nestAccessControl.UseRoles({
    resource: 'Member',
    action: 'read',
    possession: 'own',
  })
  @swagger.ApiOkResponse({ type: Member })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Param() params: MemberWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Member | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: 'read',
      possession: 'own',
      resource: 'Member',
    });
    const result = await this.service.findOne({
      where: params,
      select: {
        ace: true,
        avatar: true,
        createdAt: true,
        dob: true,
        doj: true,
        email: true,
        firstName: true,
        gender: true,
        id: true,
        lastName: true,
        updatedAt: true,
      },
    });
    if (result === null) {
      throw new errors.NotFoundException(`No resource was found for ${JSON.stringify(params)}`);
    }
    return permission.filter(result);
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor('combined'))
  @common.UseGuards(jwtAuthGuard.JwtAuthGuard)
  @common.Patch('/:id')
  @nestAccessControl.UseRoles({
    resource: 'Member',
    action: 'update',
    possession: 'any',
  })
  @swagger.ApiOkResponse({ type: Member })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Param() params: MemberWhereUniqueInput,
    @common.Body()
    data: MemberUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Member | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: 'update',
      possession: 'any',
      resource: 'Member',
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(', ');
      const roles = userRoles.map((role: string) => JSON.stringify(role)).join(',');
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${'Member'} update is forbidden for roles: ${roles}`
      );
    }
    try {
      return await this.service.update({
        where: params,
        data: data,
        select: {
          ace: true,
          avatar: true,
          createdAt: true,
          dob: true,
          doj: true,
          email: true,
          firstName: true,
          gender: true,
          id: true,
          lastName: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(`No resource was found for ${JSON.stringify(params)}`);
      }
      throw error;
    }
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor('combined'))
  @common.UseGuards(jwtAuthGuard.JwtAuthGuard)
  @common.Delete('/:id')
  @nestAccessControl.UseRoles({
    resource: 'Member',
    action: 'delete',
    possession: 'any',
  })
  @swagger.ApiOkResponse({ type: Member })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(@common.Param() params: MemberWhereUniqueInput): Promise<Member | null> {
    try {
      return await this.service.delete({
        where: params,
        select: {
          ace: true,
          avatar: true,
          createdAt: true,
          dob: true,
          doj: true,
          email: true,
          firstName: true,
          gender: true,
          id: true,
          lastName: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(`No resource was found for ${JSON.stringify(params)}`);
      }
      throw error;
    }
  }
}
