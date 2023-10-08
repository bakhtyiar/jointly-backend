// import { Test, TestingModule } from '@nestjs/testing';
// import { UserService } from './user.service';
// import { MongoMemoryServer } from 'mongodb-memory-server';
// import { connect, Connection, Model } from 'mongoose';
// import { User, UserSchema } from '@src/user/schemas/user.schema';
// import { AuthController } from '@src/auth/auth.controller';
// import { AuthService } from '@src/auth/auth.service';
// import { getModelToken } from '@nestjs/mongoose';
//
// describe('UserService', () => {
//   let service: any;
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
//       providers: [
//         UserService,
//         { provide: getModelToken(User.name), useValue: userModel },
//       ],
//     }).compile();
//     service = module.get<UserService>(UserService);
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
//     expect(service).toBeDefined();
//   });
// });
