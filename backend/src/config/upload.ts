import { resolve } from "path";
import crypto from 'crypto'

export const tmpFolder = resolve(__dirname, '..', '..', 'tmp')

export function getHashFilename(filename: string): string {
    return crypto.randomBytes(24).toString('hex')
}