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

    // Correctly resolve the file path from the project root's 'public' directory
    const relativeSrc = src.startsWith('/') ? src.substring(1) : src
    const filePath = path.join(process.cwd(), 'public', relativeSrc)
    
    const fileName = path.basename(filePath)
    const contentType = mime.lookup(filePath)

    if (!fs.existsSync(filePath)) {
      throw new Error(`Asset file not found at ${filePath}`)
    }

    // Use the correct structure for uploading a local file
    let asset = await environment.createAssetFromFiles({
      fields: {
        title: { en: alt || fileName },
        description: { en: alt || '' },
        file: {
          en: {
            contentType,
            fileName,
            file: fs.readFileSync(filePath), // Use fs.readFileSync to provide the file buffer
          },
        },
      },
    })

    asset = await asset.processForLocale('en', { processingCheckWait: 2000 })
    await asset.publish()
    console.log(`Published asset ${fileName}.`)
    return asset
  },
}

module.exports = { run, asset }
