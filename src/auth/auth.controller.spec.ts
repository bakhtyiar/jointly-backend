import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connect, Connection, Model } from 'mongoose';
import { User, UserSchema } from '@src/user/schemas/user.schema';
import { getModelToken } from '@nestjs/mongoose';

describe('AuthController', () => {
  let controller: any;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let userModel: Model<User>;

  beforeEach(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    userModel = mongoConnection.model(User.name, UserSchema);
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        { provide: getModelToken(User.name), useValue: userModel },
      ],
    }).compile();

    afterAll(async () => {
      await mongoConnection.dropDatabase();
      await mongoConnection.close();
      await mongod.stop();
    });

    afterEach(async () => {
      const collections = mongoConnection.collections;
      for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
      }
    });

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  // Example
  // it("should return ArticleAlreadyExists (Bad Request - 400) exception", async () => {
  //   await (new articleModel(ArticleDTOStub()).save());
  //   await expect(appController.postArticle(ArticleDTOStub()))
  //       .rejects
  //       .toThrow(ArticleAlreadyExists);
  // });
});
