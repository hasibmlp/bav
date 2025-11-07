module.exports = function (migration) {
  const themeSettings = migration.editContentType('themeSettings');

  themeSettings.createField('footerBackgroundColor', {
    name: 'Footer Background Color',
    type: 'Symbol',
    localized: false,
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

  console.log("Updated 'themeSettings' content type to include a 'footerBackgroundColor' field.");
};
