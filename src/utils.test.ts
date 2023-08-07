import { convertImageName, parseDimensions } from './utils'

describe('parsing dimensions from a directory name', () => {
    it('should correctly parse a valid directory name', () => {
        expect(parseDimensions('1024x1024')).toEqual({
            width: 1024,
            height: 1024,
        })
    })

    it('should throw an error if directory name is missing the delimeter', () => {
        expect(() => parseDimensions('10241024')).toThrow()
    })

    it('should throw an error if the directory name does not have two dimensions', () => {
        expect(() => parseDimensions('1024x')).toThrow()
    })

    it('should throw an error if directory name contain invalid dimension', () => {
        expect(() => parseDimensions('abcxabc')).toThrow()
    })
})

describe('converting the input image file name and extension into the output name and extension', () => {
    it('should correctly convert the file name', () => {
        expect(convertImageName('test.jpg')).toEqual('test.webp')
    })

    it('should throw error if the extension is not allowed', () => {
        expect(() => convertImageName('bad-extension.bad')).toThrow()
    })

    it('should throw an error if the file does not have an extension', () => {
        expect(() => convertImageName('no-extension')).toThrow()
        expect(() => convertImageName('no-extension.')).toThrow()
    })
})
