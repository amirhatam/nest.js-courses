import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

const config: SqliteConnectionOptions = {
  type: 'sqlite',
  database: 'db',
  entities: ['dist/src/**/*.entity.js'],
  synchronize: true, //True is automatically update DataBase
  //Option false is manuel update DataBase:
  //TODO
  //Add typeorm command under scripts section in package.json:
  //"typeorm": "node --require ts-node/register ./node_modules/typeorm/cli.js"
  migrations: ['dist/src/db/migrations/*.js'],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
  //TODO:
  // - Add typeorm command under scripts section in package.json:
  //  "migration:generate":"npm run build && npm run typeorm migration:generate -- -n"
  // - npm run migration:generate -- UserMigration
  // - Add typeorm command under scripts section in package.json:
  //   "migration:run":"npm run build && npm run typeorm migration:run"
  // - npm run migration:run     //run this code after update new User Entity
};

export default config;
