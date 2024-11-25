const build = async () => {
  const { Puppy } = require('./db/models');
  try {
    // build/generate a new puppy with the model
    const newPup = Puppy.build({
      name: 'Trudy',
      ageYrs: 2,
      weightLbs: 38,
      breed: 'Brittany Spaniel',
      microchipped: false
    })
    // check if new pup is in the db - returns null until you save it
    await Puppy.findOne({
      where: { name: 'Trudy' }
    })
    // save/insert new entry in the db
    await newPup.save();
    // check if new pup is in the db - should return the puppy after saving to db
    await Puppy.findOne({
      where: { name: 'Trudy' }
    })
    /* ====================== STEP 1 ====================== */
    // Using `build` and `save`, insert a record into the Puppies table with the
    // following attributes:
    // name: Trudy
    // ageYrs: 2
    // weightLbs: 38
    // breed: Brittany Spaniel
    // microchipped: false
    // Your code here
  } catch (err) {
    throw err;
  }

};

const create = async () => {
  const { Puppy } = require('./db/models');
  try {
    const newPup = await Puppy.create({
      name: 'Beans',
      ageYrs: 1.6,
      weightLbs: 42,
      breed: 'Bulldog',
      microchipped: true
    })
    await Puppy.findOne({
      where: { name: 'Beans' }
    })
    /* ====================== STEP 2 ====================== */
    // Using `create`, insert a record into the Puppies table with the following
    // attributes:
    // name: Beans
    // ageYrs: 1.6
    // weightLbs: 42
    // breed: Bulldog
    // microchipped: true
    // Your code here
  } catch (err) {
    throw err;
  }
};

if (require.main === module) {
  require('dotenv').config();
  const { resetDB, seedAllDB } = require('./test/utils/test-utils');
  (async () => {
    await resetDB("db/dev.db");
    await seedAllDB("db/dev.db");
    try {
      await build();
    } catch(err) {
      console.error('There was an error thrown while building:');
      console.error(err);
    }
    try {
      await create();
    } catch(err) {
      console.error('There was an error thrown while creating:');
      console.error(err);
    }
  })();
} else {
  module.exports = { build, create };
}
