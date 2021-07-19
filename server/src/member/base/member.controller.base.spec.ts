import { Test } from "@nestjs/testing";
import { INestApplication, HttpStatus, ExecutionContext } from "@nestjs/common";
import request from "supertest";
import { MorganModule } from "nest-morgan";
import { ACGuard } from "nest-access-control";
import { BasicAuthGuard } from "../../auth/basicAuth.guard";
import { ACLModule } from "../../auth/acl.module";
import { MemberController } from "../member.controller";
import { MemberService } from "../member.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  ace: "exampleAce",
  avatar: "exampleAvatar",
  createdAt: new Date(),
  dob: new Date(),
  doj: new Date(),
  email: "exampleEmail",
  firstName: "exampleFirstName",
  id: "exampleId",
  lastName: "exampleLastName",
  updatedAt: new Date(),
};
const CREATE_RESULT = {
  ace: "exampleAce",
  avatar: "exampleAvatar",
  createdAt: new Date(),
  dob: new Date(),
  doj: new Date(),
  email: "exampleEmail",
  firstName: "exampleFirstName",
  id: "exampleId",
  lastName: "exampleLastName",
  updatedAt: new Date(),
};
const FIND_MANY_RESULT = [
  {
    ace: "exampleAce",
    avatar: "exampleAvatar",
    createdAt: new Date(),
    dob: new Date(),
    doj: new Date(),
    email: "exampleEmail",
    firstName: "exampleFirstName",
    id: "exampleId",
    lastName: "exampleLastName",
    updatedAt: new Date(),
  },
];
const FIND_ONE_RESULT = {
  ace: "exampleAce",
  avatar: "exampleAvatar",
  createdAt: new Date(),
  dob: new Date(),
  doj: new Date(),
  email: "exampleEmail",
  firstName: "exampleFirstName",
  id: "exampleId",
  lastName: "exampleLastName",
  updatedAt: new Date(),
};

const service = {
  create() {
    return CREATE_RESULT;
  },
  findMany: () => FIND_MANY_RESULT,
  findOne: ({ where }: { where: { id: string } }) => {
    switch (where.id) {
      case existingId:
        return FIND_ONE_RESULT;
      case nonExistingId:
        return null;
    }
  },
};

const basicAuthGuard = {
  canActivate: (context: ExecutionContext) => {
    const argumentHost = context.switchToHttp();
    const request = argumentHost.getRequest();
    request.user = {
      roles: ["user"],
    };
    return true;
  },
};

const acGuard = {
  canActivate: () => {
    return true;
  },
};

describe("Member", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: MemberService,
          useValue: service,
        },
      ],
      controllers: [MemberController],
      imports: [MorganModule.forRoot(), ACLModule],
    })
      .overrideGuard(BasicAuthGuard)
      .useValue(basicAuthGuard)
      .overrideGuard(ACGuard)
      .useValue(acGuard)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  test("POST /members", async () => {
    await request(app.getHttpServer())
      .post("/members")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        dob: CREATE_RESULT.dob.toISOString(),
        doj: CREATE_RESULT.doj.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      });
  });

  test("GET /members", async () => {
    await request(app.getHttpServer())
      .get("/members")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          createdAt: FIND_MANY_RESULT[0].createdAt.toISOString(),
          dob: FIND_MANY_RESULT[0].dob.toISOString(),
          doj: FIND_MANY_RESULT[0].doj.toISOString(),
          updatedAt: FIND_MANY_RESULT[0].updatedAt.toISOString(),
        },
      ]);
  });

  test("GET /members/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/members"}/${nonExistingId}`)
      .expect(404)
      .expect({
        statusCode: 404,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /members/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/members"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        createdAt: FIND_ONE_RESULT.createdAt.toISOString(),
        dob: FIND_ONE_RESULT.dob.toISOString(),
        doj: FIND_ONE_RESULT.doj.toISOString(),
        updatedAt: FIND_ONE_RESULT.updatedAt.toISOString(),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
