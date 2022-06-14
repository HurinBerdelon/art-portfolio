import { container } from 'tsyringe'
import { IArtsRepository } from '../modules/Arts/repositories/IArtsRepository'
import { PrismaArtRepository } from '../modules/Arts/repositories/Implementations/PrismaArtRepository'
import { ICategoryRepository } from '../modules/Categories/repositories/ICategoryRepository'
import { PrismaCategoryRepository } from '../modules/Categories/repositories/Implementations/PrismaCategoryRepository'
import { PrismaTranslationRepository } from '../modules/Translations/repositories/Implementations/PrismaTranslationsRepository'
import { ITranslationRepository } from '../modules/Translations/repositories/ITranslationRepository'
import { PrismaUserRepository } from '../modules/Users/repositories/Implementations/PrismaUserRepository'
import { IUserRepository } from '../modules/Users/repositories/IUserRepository'
import { S3StorageProvider } from './providers/storageProvider/implementations/S3StorageProvider'
import { IStorageProvider } from './providers/storageProvider/IStorageProvider'

container.registerSingleton<IArtsRepository>(
    'ArtsRepository',
    PrismaArtRepository
)

container.registerSingleton<ICategoryRepository>(
    'CategoriesRepository',
    PrismaCategoryRepository
)

container.registerSingleton<ITranslationRepository>(
    'TranslationsRepository',
    PrismaTranslationRepository
)

container.registerSingleton<IUserRepository>(
    'UsersRepository',
    PrismaUserRepository
)

const diskStorage = {
    // local: LocalStorageProvider,
    AWS_S3: S3StorageProvider
}

container.registerSingleton<IStorageProvider>(
    'StorageProvider',
    diskStorage[process.env.STORAGE_DISK]
)