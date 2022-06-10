import { container } from 'tsyringe'
import { IArtsRepository } from '../modules/Arts/repositories/IArtsRepository'
import { PrismaArtRepository } from '../modules/Arts/repositories/Implementations/PrismaArtRepository'
import { S3StorageProvider } from './providers/storageProvider/implementations/S3StorageProvider'
import { IStorageProvider } from './providers/storageProvider/IStorageProvider'

container.registerSingleton<IArtsRepository>(
    'ArtsRepository',
    PrismaArtRepository
)

const diskStorage = {
    // local: LocalStorageProvider,
    AWS_S3: S3StorageProvider
}

container.registerSingleton<IStorageProvider>(
    'StorageProvider',
    diskStorage[process.env.STORAGE_DISK]
)