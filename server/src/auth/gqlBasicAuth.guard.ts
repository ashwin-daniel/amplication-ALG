import { Injectable, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import type { Request } from "express";
import { JwtAuthGuard } from "./jwtAuth.guard";

@Injectable()
export class GqlBasicAuthGuard extends JwtAuthGuard {
  // This method is required for the interface - do not delete it.
  getRequest(context: ExecutionContext): Request {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext<{ req: Request }>().req;
  }
}
