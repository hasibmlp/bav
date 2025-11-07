module.exports = function (migration) {
  // --- Update 'page' content type ---
  const page = migration.editContentType('page');
  page.createField('heroImage', {
    name: 'Hero Image',
    type: 'Link',
    linkType: 'Asset',
    localized: false,
    required: false,
  });
  console.log("Updated 'page' content type to include a 'heroImage' field.");

  // --- Update 'partnerItem' content type ---
  const partnerItem = migration.editContentType('partnerItem');
  partnerItem.createField('url', {
    name: 'URL',
    type: 'Symbol',
    localized: false,
    required: false,
  });
  partnerItem.createField('ctaLabel', {
    name: 'CTA Label',
    type: 'Symbol',
    localized: true,
    required: false,
  });
  console.log("Updated 'partnerItem' content type to include 'url' and 'ctaLabel' fields.");

  // --- Update 'hero' content type ---
  const hero = migration.editContentType('hero');
  hero.createField('secondaryCtaLabel', {
    name: 'Secondary CTA Label',
    type: 'Symbol',
    localized: true,
    required: false,
  });
  hero.createField('secondaryCtaHref', {
    name: 'Secondary CTA Href',
    type: 'Symbol',
    localized: false,
    required: false,
  });
  console.log("Updated 'hero' content type to include secondary CTA fields.");

  // --- Update 'coverage' content type ---
  const coverage = migration.editContentType('coverage');
  coverage.createField('subtitle', {
    name: 'Subtitle',
    type: 'Text',
    localized: true,
    required: false,
  });
  console.log("Updated 'coverage' content type to include a 'subtitle' field.");

  // --- Create 'themeSettings' content type ---
  const themeSettings = migration
    .createContentType('themeSettings')
    .name('Theme Settings')
    .description('Global settings for the website theme, like navigation and colors.');

  themeSettings.createField('internalTitle', {
    name: 'Internal Title',
    type: 'Symbol',
    required: true,
  });

  themeSettings.createField('navigation', {
    name: 'Navigation Links',
    type: 'Object',
    localized: true,
  });

  themeSettings.createField('primaryColor', {
    name: 'Primary Color',
    type: 'Symbol',
    required: false,
    validations: [
      {
        regexp: {
          pattern: '^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$',
          flags: null
        },
        message: 'Please enter a valid hex color code (e.g., #FF5733).'
      }
    ]
  });

  themeSettings.createField('primaryColorRgb', { name: 'Primary Color (RGB)', type: 'Symbol' });
  themeSettings.createField('primaryColorTint', { name: 'Primary Color (Tint)', type: 'Symbol' });
  themeSettings.createField('secondaryColor', { name: 'Secondary Color', type: 'Symbol' });
  themeSettings.createField('darkColor', { name: 'Dark Color', type: 'Symbol' });
  themeSettings.createField('lightBgColor', { name: 'Light BG Color', type: 'Symbol' });

  themeSettings.displayField('internalTitle');
};
