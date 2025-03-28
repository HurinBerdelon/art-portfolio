import "reflect-metadata";
import path from "path";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.mjs";
import express from "express";
import cors from "cors";
import { ArtResolver } from "./modules/Arts/resolvers/ArtResolver";

import "dotenv/config";
import "./shared";
import { tmpFolder } from "./config/upload";
import { CategoryResolver } from "./modules/Categories/resolvers/CategoryResolver";
import { UserResolver } from "./modules/Users/resolvers/UserResolver";
import { TranslationResolver } from "./modules/Translations/resolvers/TranslationResolver";
import { TextContentResolver } from "./modules/TextContent/resolvers/TextContentResolver";

export async function app() {
  const schema = await buildSchema({
    resolvers: [
      ArtResolver,
      CategoryResolver,
      TranslationResolver,
      UserResolver,
      TextContentResolver,
    ],
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
  });

  const server = new ApolloServer({
    schema,
  });

  // Starts Apollo and Express servers
  await server.start();

  const app = express();

  // Using cors in Express to allow frontend connection
  app.use(cors());

  // Using static middleware to be able to show static files
  app.use("/images", express.static(`${tmpFolder}`));

  // Using GraphQL middleware in Express server
  app.use(graphqlUploadExpress());

  // Using Express middleware in Apollo server
  server.applyMiddleware({ app });

  app.listen(process.env.PORT, () =>
    console.log(`server running on localhost:${process.env.PORT}/graphql`)
  );
}
