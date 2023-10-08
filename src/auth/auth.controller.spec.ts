// import { Test, TestingModule } from '@nestjs/testing';
// import { AuthController } from './auth.controller';
// import { MongoMemoryServer } from 'mongodb-memory-server';
// import { connect, Connection, Model } from 'mongoose';
// import { User, UserSchema } from '@src/user/schemas/user.schema';
// import { getModelToken } from '@nestjs/mongoose';
// import { VerifyUserDtoStub } from '@root/test/stubs/verify-user.dto.stub';
// import { CreateUserDtoStub } from '@root/test/stubs/create-user.dto.stub';
// import { UserModule } from '@src/user/user.module';
// import { JwtModule } from '@nestjs/jwt';
//
// describe('AuthController', () => {
//   let controller: any;
//   let mongod: MongoMemoryServer;
//   let mongoConnection: Connection;
//   let userModel: Model<User>;
//
//   beforeEach(async () => {
//     mongod = await MongoMemoryServer.create();
//     const uri = mongod.getUri();
//     mongoConnection = (await connect(uri)).connection;
//     userModel = mongoConnection.model(User.name, UserSchema);
//     const module: TestingModule = await Test.createTestingModule({
//       imports: [JwtModule],
//       controllers: [AuthController],
//       providers: [{ provide: getModelToken(User.name), useValue: userModel }],
//     }).compile();
//     controller = module.get<AuthController>(AuthController);
//   });
//
//   afterAll(async () => {
//     await mongoConnection.dropDatabase();
//     await mongoConnection.close();
//     await mongod.stop();
//   });
//
//   afterEach(async () => {
//     const collections = mongoConnection.collections;
//     for (const key in collections) {
//       const collection = collections[key];
//       await collection.deleteMany({});
//     }
//   });
//
//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });
//   it('return "Bearer <some_token>"', async () => {
//     await new userModel(CreateUserDtoStub()).save();
//     const x = controller.authenticate(VerifyUserDtoStub());
//     console.log(x);
//     // await expect();
//   });
//   // it('throw not found user', async () => {
//   //   await new userModel(VerifyUserDtoStub()).save();
//   //   await expect(controller.authenticate(VerifyUserDtoStub())).rejects.toThrow(
//   //     ArticleAlreadyExists,
//   //   );
//   // });
// });
