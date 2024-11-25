// Instantiate Express and the application - DO NOT MODIFY
const express = require('express');
const app = express();

// Error handling, env variables, and json middleware - DO NOT MODIFY
require('express-async-errors');
require('dotenv').config();
app.use(express.json());

// Import the models used in these routes - DO NOT MODIFY
const { Puppy } = require('./db/models');

// Index of all puppies - DO NOT MODIFY
app.get('/puppies', async (req, res, next) => {
    const allPuppies = await Puppy.findAll({ order: [['name', 'ASC']] });

    res.json(allPuppies);
});


// STEP 1
// Capture the name, ageYrs, breed, weightLbs, and microchipped attributes
// from the body of the request.
// Use these values to BUILD a new Puppy in the database.
// Respond to the request by sending a success message
app.post('/puppies/build', async (req, res, next) => {
    const { name, ageYrs, breed, weightLbs, microchipped } = req.body;
    const newPuppy = Puppy.build({
        name: name,
        ageYrs: ageYrs,
        weightLbs: weightLbs,
        breed: breed,
        microchipped: microchipped
    });
    await newPuppy.save(); // only need if using Puppy.build({})

    await Puppy.findOne({
        where: { name: name }
    });

    res.json({
        message: 'Record successfully saved',
        data: newPuppy
    });
    // Your code here
})

// STEP 2
// Capture the name, ageYrs, breed, weightLbs, and microchipped attributes
// from the body of the request.
// Use these values to CREATE a new Puppy in the database.
// Respond to the request by sending a success message
app.post('/puppies/create', async (req, res, next) => {
    const { name, ageYrs, breed, weightLbs, microchipped } = req.body;
    const newPuppy = await Puppy.create({
        name: name,
        ageYrs: ageYrs,
        weightLbs: weightLbs,
        breed: breed,
        microchipped: microchipped
    });

    // await Puppy.findOne({
    //     where: { name: name }
    // });  // not needed since create() already returns the created instance

    res.json({
        message: 'Record successfully created',
        data: newPuppy
        // data: newPuppy was not showing up in response json, like w build -
        // Looking at the code, I can identify the issue in the /puppies/create route. The problem is that
        // Puppy.create() returns a Promise, but we're not awaiting it. Here's how to fix the route in app.js:
        // 1. Added await before Puppy.create()
        // 2. Removed the unnecessary findOne query since create() already returns the created instance
        // 3. The response now correctly includes the newly created puppy data
    });
    // Your code here
})


// Root route - DO NOT MODIFY
app.get('/', (req, res) => {
    res.json({
        message: "API server is running"
    });
});

// Set port and listen for incoming requests - DO NOT MODIFY
if (require.main === module) {
    const port = 8000;
    app.listen(port, () => console.log('Server is listening on port', port));
} else {
    module.exports = app;
}
