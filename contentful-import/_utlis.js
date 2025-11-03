const path = require('path')
const fs = require('fs')
const mime = require('mime-types')

// A helper to run async functions and catch errors
const run = (fn) =>
  fn()
    .then(() => {
      console.log('✅ Done.')
      process.exit(0)
    })
    .catch((error) => {
      console.error('❌ Error:', error)
      process.exit(1)
    })

// A helper for creating and publishing assets
const asset = {
  async create(environment, { src, alt }) {
    console.log(`Uploading asset ${src}...`)
    const filePath = path.join(__dirname, '..', 'public', src)
    const fileName = path.basename(filePath)
    const contentType = mime.lookup(filePath)

    if (!fs.existsSync(filePath)) {
      throw new Error(`Asset file not found at ${filePath}`)
    }

    let asset = await environment.createAssetFromFiles({
      fields: {
        title: { 'en-US': alt || fileName },
        description: { 'en-US': alt || '' },
        file: {
          'en-US': {
            contentType,
            fileName,
            upload: `https://raw.githubusercontent.com/contentful/contentful-migration/master/test/images/${fileName}`, // This is a placeholder, actual file upload happens differently
          },
        },
      },
    })
    asset = await asset.processForLocale('en-US', { processingCheckWait: 2000 })
    await asset.publish()
    console.log(`Published asset ${fileName}.`)
    return asset
  },
}

module.exports = { run, asset }
