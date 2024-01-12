import { createWriteStream } from "fs";
import GraphQLUpload, { FileUpload } from "graphql-upload/GraphQLUpload.mjs";
import { container } from "tsyringe";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { getHashFilename, tmpFolder } from "../../../config/upload";
import { TextContent } from "../models/TextContent";
import { CreateTextContentUseCase } from "../useCases/CreateTextContent/CreateTextContentUseCase";
import { DeleteTextContentUseCase } from "../useCases/DeleteTextContent/DeleteTextContentUseCase";
import { EditTextContentImageUseCase } from "../useCases/EditTextContentImage/EditTextContentImageUseCase";
import { GetAllTextContentsUseCase } from "../useCases/GetAllTextContent/GetAllTextContentsUseCase";
import { GetTextContentByPageUseCase } from "../useCases/GetTextContentByPage/GetTextContentByPageUseCase";
import { GetTextContentByTypeUseCase } from "../useCases/GetTextContentByType/GetTextContentByTypeUseCase";
import { UpdateTextContentUseCase } from "../useCases/UpdateTextContent/UpdateTextContentUseCase";

@Resolver()
export class TextContentResolver {
  @Query(() => [TextContent])
  async getTextContents() {
    const getAllTextContentsUseCase = container.resolve(
      GetAllTextContentsUseCase
    );

    const textContents = await getAllTextContentsUseCase.execute();

    return textContents;
  }

  @Query(() => [TextContent])
  async getTextContentsByPage(@Arg("page") page: string) {
    const getTextContentsByPageUseCase = container.resolve(
      GetTextContentByPageUseCase
    );

    const textContents = await getTextContentsByPageUseCase.execute(page);

    return textContents;
  }

  @Query(() => [TextContent])
  async getTextContentByType(@Arg("type") type: string) {
    const getTextContentsByTypeUseCase = container.resolve(
      GetTextContentByTypeUseCase
    );

    const textContents = await getTextContentsByTypeUseCase.execute(type);

    return textContents;
  }

  @Mutation(() => TextContent)
  async createTextContent(
    @Arg("type") type: string,
    @Arg("idiom") idiom: string,
    @Arg("page") page: string,
    @Arg("text") text: string,
    @Arg("imageFormat") imageFormat: string,
    @Arg("file", () => GraphQLUpload) { createReadStream, filename }: FileUpload
  ) {
    const hashFilename = getHashFilename(filename);

    const imagePath = `${tmpFolder}/${hashFilename}`;

    await new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(imagePath))
        .on("finish", () => resolve(true))
        .on("error", () => reject(false))
    );

    const createTextContentUseCase = container.resolve(
      CreateTextContentUseCase
    );

    const textContent = await createTextContentUseCase.execute({
      idiom,
      page,
      imageUrl: hashFilename,
      text,
      type,
      imageFormat,
    });

    return textContent;
  }

  @Mutation(() => TextContent)
  async updateTextContent(
    @Arg("id") id: string,
    @Arg("text") text: string,
    @Arg("imageFormat") imageFormat: string
  ) {
    const updateTextContentUseCase = container.resolve(
      UpdateTextContentUseCase
    );

    const textContent = await updateTextContentUseCase.execute(
      id,
      text,
      imageFormat
    );

    return textContent;
  }

  @Mutation(() => TextContent)
  async updateTextContentImage(
    @Arg("id") id: string,
    @Arg("file", () => GraphQLUpload) { createReadStream, filename }: FileUpload
  ) {
    const hashFilename = getHashFilename(filename);

    const imagePath = `${tmpFolder}/${hashFilename}`;

    await new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(imagePath))
        .on("finish", () => resolve(true))
        .on("error", () => reject(false))
    );

    const editTextContentImageUseCase = container.resolve(
      EditTextContentImageUseCase
    );

    const art = await editTextContentImageUseCase.execute(id, hashFilename);

    return art;
  }

  @Query(() => Boolean)
  async deleteTextContent(@Arg("id") id: string) {
    const deleteTextContentUseCase = container.resolve(
      DeleteTextContentUseCase
    );

    await deleteTextContentUseCase.execute(id);

    return true;
  }
}
