import { allowedExtensions, outputExtension } from './constants'

interface Dimensions {
    width: number
    height: number
}

export const parseDimensions = (directoryName: string): Dimensions => {
    const delimeter = 'x'

    if (!directoryName.includes(delimeter)) {
        throw new Error(
            `Invalid directory name '${delimeter}'. Missing size delimeter '${delimeter}'.`,
        )
    }

    const dimensions = directoryName.split(delimeter)

    if (dimensions.length !== 2) {
        throw new Error(
            `Invalid quantity of dimensions '${dimensions.length}'. Expected 2.`,
        )
    }

    const width = parseInt(dimensions[0])
    const height = parseInt(dimensions[1])

    if (isNaN(width) || isNaN(height)) {
        throw new Error(`Invalid width or height. Expected number.`)
    }

    return {
        width,
        height,
    }
}

export const convertImageName = (fileName: string) => {
    const delimeter = '.'

    if (!fileName.includes(delimeter)) {
        throw new Error(
            `Invalid file name. Must include delimeter '${delimeter}'.`,
        )
    }

    const segments = fileName.split(delimeter)

    if (segments.length !== 2) {
        throw new Error(
            `Invalid file name format. Must include file extension.`,
        )
    }

    const name = segments[0]
    const extension = segments[1]

    if (!allowedExtensions.includes(extension)) {
        throw new Error(`Invalid extension '${extension}' for '${fileName}'.`)
    }

    return `${name}.${outputExtension}`
}
