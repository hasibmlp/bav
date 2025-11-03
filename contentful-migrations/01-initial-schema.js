module.exports = function (migration) {
  // Asset (Image) Helper
  const image = {
    name: 'Image',
    type: 'Link',
    linkType: 'Asset',
    required: true,
  }

  // Content Models

  // Section: Hero
  const hero = migration.createContentType('hero').name('Section: Hero')
  hero.createField('headline').name('Headline').type('Symbol').required(true)
  hero.createField('subheadline').name('Subheadline').type('Text')
  hero.createField('eyebrow').name('Eyebrow').type('Symbol')
  hero.createField('image').name('Image').type('Link').linkType('Asset')
  hero.createField('ctaLabel').name('CTA Label').type('Symbol')
  hero.createField('ctaHref').name('CTA Link').type('Symbol')
  hero.displayField = 'headline'

  // Section: Who We Are
  const whoWeAre = migration.createContentType('whoWeAre').name('Section: Who We Are')
  whoWeAre.createField('headline').name('Headline').type('Symbol').required(true)
  whoWeAre.createField('subheadline').name('Subheadline').type('Text').required(true)
  whoWeAre.createField('image').name('Image').type('Link').linkType('Asset')
  whoWeAre.displayField = 'headline'

  // Section: Solutions (for Home Page)
  const solutions = migration.createContentType('solutions').name('Section: Solutions (Home)')
  solutions.createField('title').name('Title').type('Symbol')
  solutions.createField('description').name('Description').type('Text')
  solutions.createField('items').name('Items').type('Array').items({
    type: 'Link',
    linkType: 'Entry',
    validations: [{ linkContentType: ['solutionItem'] }],
  })
  solutions.displayField = 'title'

  // Reusable: Solution Item
  const solutionItem = migration.createContentType('solutionItem').name('Reusable: Solution Item')
  solutionItem.createField('title').name('Title').type('Symbol').required(true)
  solutionItem.createField('description').name('Description').type('Text').required(true)
  solutionItem.createField('image').name('Image').type('Link').linkType('Asset').required(true)
  solutionItem.displayField = 'title'

  // Section: Brands Wall
  const brandsWall = migration.createContentType('brandsWall').name('Section: Brands Wall')
  brandsWall.createField('title').name('Title').type('Symbol')
  brandsWall.createField('items').name('Items').type('Array').items({
    type: 'Link',
    linkType: 'Entry',
    validations: [{ linkContentType: ['brandItem'] }],
  })
  brandsWall.displayField = 'title'

  // Reusable: Brand Item
  const brandItem = migration.createContentType('brandItem').name('Reusable: Brand Item')
  brandItem.createField('name').name('Name').type('Symbol').required(true)
  brandItem.createField('logo').name('Logo').type('Link').linkType('Asset').required(true)
  brandItem.displayField = 'name'

  // Section: Services (Grid for Home Page)
  const servicesGrid = migration.createContentType('servicesGrid').name('Section: Services Grid')
  servicesGrid.createField('title').name('Title').type('Symbol')
  servicesGrid.createField('items').name('Items').type('Array').items({
    type: 'Link',
    linkType: 'Entry',
    validations: [{ linkContentType: ['serviceItem'] }],
  })
  servicesGrid.displayField = 'title'

  // Reusable: Service Item
  const serviceItem = migration.createContentType('serviceItem').name('Reusable: Service Item')
  serviceItem.createField('title').name('Title').type('Symbol').required(true)
  serviceItem.createField('description').name('Description').type('Text').required(true)
  serviceItem.createField('image').name('Image').type('Link').linkType('Asset').required(true)
  serviceItem.displayField = 'title'

  // Section: Coverage Map
  const coverage = migration.createContentType('coverage').name('Section: Coverage')
  coverage.createField('title').name('Title').type('Symbol')
  coverage.createField('regions').name('Regions').type('Array').items({ type: 'Symbol' })
  coverage.displayField = 'title'

  // Section: Why Us
  const whyUs = migration.createContentType('whyUs').name('Section: Why Us')
  whyUs.createField('title').name('Title').type('Symbol')
  whyUs.createField('bullets').name('Bullets').type('Array').items({ type: 'Symbol' })
  whyUs.displayField = 'title'

  // Section: Snapshot (Metrics)
  const snapshot = migration.createContentType('snapshot').name('Section: Snapshot')
  snapshot.createField('title').name('Title').type('Symbol')
  snapshot.createField('metrics').name('Metrics').type('Array').items({
    type: 'Link',
    linkType: 'Entry',
    validations: [{ linkContentType: ['metricItem'] }],
  })
  snapshot.displayField = 'title'

  // Reusable: Metric Item
  const metricItem = migration.createContentType('metricItem').name('Reusable: Metric Item')
  metricItem.createField('value').name('Value').type('Symbol').required(true)
  metricItem.createField('label').name('Label').type('Symbol').required(true)
  metricItem.displayField = 'label'

  // Section: Values (Icon Grid)
  const valuesGrid = migration.createContentType('valuesGrid').name('Section: Values Grid')
  valuesGrid.createField('title').name('Title').type('Symbol')
  valuesGrid.createField('items').name('Items').type('Array').items({
    type: 'Link',
    linkType: 'Entry',
    validations: [{ linkContentType: ['valueItem'] }],
  })
  valuesGrid.displayField = 'title'

  // Reusable: Value Item
  const valueItem = migration.createContentType('valueItem').name('Reusable: Value Item')
  valueItem.createField('title').name('Title').type('Symbol').required(true)
  valueItem.createField('description').name('Description').type('Text').required(true)
  valueItem.createField('icon').name('Icon (Feather icon name)').type('Symbol')
  valueItem.displayField = 'title'

  // Section: Call to Action (CTA)
  const cta = migration.createContentType('cta').name('Section: CTA')
  cta.createField('headline').name('Headline').type('Symbol')
  cta.createField('subheadline').name('Subheadline').type('Text')
  cta.createField('ctaLabel').name('CTA Label').type('Symbol')
  cta.createField('ctaHref').name('CTA Link').type('Symbol')
  cta.displayField = 'headline'

  // Section: Contact Form Placeholder
  const contactForm = migration.createContentType('contactForm').name('Section: Contact Form')
  contactForm.createField('internalTitle').name('Internal Title').type('Symbol')
  contactForm.displayField = 'internalTitle'

  // Section: Solutions Showcase (Accordion for Solutions Page)
  const solutionsShowcase = migration
    .createContentType('solutionsShowcase')
    .name('Section: Solutions Showcase')
  solutionsShowcase.createField('items').name('Items').type('Array').items({
    type: 'Link',
    linkType: 'Entry',
    validations: [{ linkContentType: ['solutionShowcaseItem'] }],
  })
  solutionsShowcase.displayField = 'items'

  // Reusable: Solution Showcase Item
  const solutionShowcaseItem = migration
    .createContentType('solutionShowcaseItem')
    .name('Reusable: Solution Showcase Item')
  solutionShowcaseItem.createField('title').name('Title').type('Symbol').required(true)
  solutionShowcaseItem.createField('description').name('Description').type('Text').required(true)
  solutionShowcaseItem.createField('extended_description').name('Extended Description').type('Text')
  solutionShowcaseItem.createField('image').name('Image').type('Link').linkType('Asset').required(true)
  solutionShowcaseItem.createField('features').name('Features').type('Array').items({ type: 'Symbol' })
  solutionShowcaseItem.displayField = 'title'

  // Section: Sectors Grid
  const sectorsGrid = migration.createContentType('sectorsGrid').name('Section: Sectors Grid')
  sectorsGrid.createField('items').name('Items').type('Array').items({
    type: 'Link',
    linkType: 'Entry',
    validations: [{ linkContentType: ['sectorItem'] }],
  })
  sectorsGrid.displayField = 'items'

  // Reusable: Sector Item
  const sectorItem = migration.createContentType('sectorItem').name('Reusable: Sector Item')
  sectorItem.createField('title').name('Title').type('Symbol').required(true)
  sectorItem.createField('description').name('Description').type('Text')
  sectorItem.createField('image').name('Image').type('Link').linkType('Asset').required(true)
  sectorItem.displayField = 'title'

  // Section: Partners Showcase
  const partnersShowcase = migration.createContentType('partnersShowcase').name('Section: Partners Showcase')
  partnersShowcase.createField('items').name('Items').type('Array').items({
    type: 'Link',
    linkType: 'Entry',
    validations: [{ linkContentType: ['partnerItem'] }],
  })
  partnersShowcase.displayField = 'items'

  // Reusable: Partner Item
  const partnerItem = migration.createContentType('partnerItem').name('Reusable: Partner Item')
  partnerItem.createField('name').name('Name').type('Symbol').required(true)
  partnerItem.createField('logo').name('Logo').type('Link').linkType('Asset').required(true)
  partnerItem.createField('description').name('Description').type('Text')
  partnerItem.createField('features').name('Features').type('Array').items({ type: 'Symbol' })
  partnerItem.createField('fit').name('Why They Fit').type('Text')
  partnerItem.displayField = 'name'
  
    // Section: Services Grid Page
    const servicesGridPage = migration.createContentType('servicesGridPage').name('Section: Services Grid (Page)')
    servicesGridPage.createField('items').name('Items').type('Array').items({
      type: 'Link',
      linkType: 'Entry',
      validations: [{ linkContentType: ['serviceItem'] }],
    })
    servicesGridPage.displayField = 'items'

  // Page Content Type
  const page = migration
    .createContentType('page')
    .name('Page')
    .description('A top-level page on the website.')

  page.createField('title').name('Title').type('Symbol').required(true)
  
  const slugField = page.createField('slug').name('Slug').type('Symbol').required(true)
  slugField.validations = [{ unique: true }]

  page.changeFieldControl('slug', 'builtin', 'slugEditor')

  page
    .createField('sections')
    .name('Sections')
    .type('Array')
    .items({
      type: 'Link',
      linkType: 'Entry',
      validations: [
        {
          linkContentType: [
            'hero',
            'whoWeAre',
            'solutions',
            'brandsWall',
            'servicesGrid',
            'coverage',
            'whyUs',
            'snapshot',
            'valuesGrid',
            'cta',
            'contactForm',
            'solutionsShowcase',
            'sectorsGrid',
            'partnersShowcase',
            'servicesGridPage',
          ],
        },
      ],
    })
  page.displayField = 'title'
}
