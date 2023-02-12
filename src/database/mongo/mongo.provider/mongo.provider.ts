import * as mongoose from 'mongoose';

export const databaseProviders = [
    {
        provide: 'MongoDBConnection',
        useFactory: async () => {
            (mongoose as any).Promise = global.Promise;
            mongoose.set('strictQuery', false);
            return await mongoose.connect('mongodb://localhost:27017/');
        }
    },
];