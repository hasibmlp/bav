module.exports = function (migration) {
  // Get the whyUs content type
  const whyUs = migration.editContentType('whyUs');

  // Add a new 'description' field of type Text
  whyUs.createField('description', {
    name: 'Description',
    type: 'Text',
    localized: true,
    required: false,
  });

  console.log("Updated 'whyUs' content type to include a 'description' field.");
};
