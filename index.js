import sharp from 'sharp'
import { existsSync, mkdirSync, readdir } from 'fs'
import { join } from 'path'

const inputDir = 'input'
const outDir = 'output'
const extension = 'webp'

/**
 * @param {string} fileName
 * TODO: add a bunch of tests
 * TODO: add some error handling (e.g. directoryName doesn't contain delimeter)
 * TODO: add TypeScript support
 */
const getDimensions = (directoryName) => {
    const delimeter = 'x'
    const dimensions = directoryName.split(delimeter)
    return {
        width: parseInt(dimensions[0]),
        height: parseInt(dimensions[1]),
    }
}

/**
 * TODO: handle all errors
 * TODO: add TypeScript support
 * TODO: add some tests
 * TODO: add some validation
 */
const process = () => {
    // Create the output directory if it doesn't already exist.
    if (!existsSync(inputDir)) mkdirSync(inputDir)

    readdir(inputDir, (err, directories) => {
        directories.forEach((directoryName) => {
            const childDirectoryPath = join(inputDir, directoryName)

            readdir(childDirectoryPath, (err, images) => {
                images.forEach((imageName) => {
                    const imagePath = join(childDirectoryPath, imageName)
                    const dimensions = getDimensions(directoryName)
                    const outputPath = join(
                        outDir,
                        `${imageName.split('.')[0]}.${extension}`
                    )

                    sharp(imagePath)
                        .resize(dimensions.width, dimensions.height)
                        .toFile(outputPath)
                })
            })
        })
    })
}

process()
