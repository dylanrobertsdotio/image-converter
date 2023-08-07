import { existsSync, mkdirSync, readdir } from 'fs'
import { inputDirectory, outputDirectory } from './constants'
import { join } from 'path'
import { convertImageName, parseDimensions } from './utils'
import sharp from 'sharp'

if (!existsSync(outputDirectory)) {
    mkdirSync(outputDirectory)
}

readdir(inputDirectory, (err, directoryNames) => {
    if (err) {
        throw new Error(
            `Error occurred while trying to read directory '${inputDirectory}'.`,
        )
    }

    directoryNames.forEach((directoryName) => {
        const directoryPath = join(inputDirectory, directoryName)
        const dimensions = parseDimensions(directoryName)

        readdir(directoryPath, (err, imageNames) => {
            if (err) {
                throw new Error(
                    `Error occurred while trying to read subdirectory '${directoryName}'.`,
                )
            }

            imageNames.forEach((imageName) => {
                const imagePath = join(directoryPath, imageName)
                const outputPath = join(
                    outputDirectory,
                    convertImageName(imageName),
                )

                sharp(imagePath)
                    .resize(dimensions.width, dimensions.height)
                    .toFile(outputPath)
            })
        })
    })
})
