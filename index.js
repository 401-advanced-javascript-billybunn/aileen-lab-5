'use strict';

const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

// Require your model
const Categories = require('./models-singular/categories');

// Mongoose Server URI
const MONGOOSE_URI = 'mongodb://localhost:27017/lab05aileen';

// Connect
mongoose.connect(MONGOOSE_URI, { useNewUrlParser: true });

// Do some work
let category = new Categories();

async function doStuff() {
  // Some dummy data to add to our DB
  let sampleData = [
    {
      name: 'one',
      description: 'foo'
    },
    {
      name: 'two',
      description: 'bar'
    },
    {
      name: 'three',
      description: 'baz'
    }
  ];

  // CREATE ----------
  // Call the 'create' method on our category model with the data to write a new record to the DB. It should return the new record so we can log it to the console.
  let newCategory = await category.create(sampleData[0]);
  console.log('Created a new category', newCategory);

  // GET ----------
  // Call the 'get' method with no parameters. This should return an array of results we can log out.
  await category.create(sampleData[1]);
  await category.create(sampleData[2]);
  let allCategories = await category.get();
  console.log('All categories', allCategories);

  // Call the 'get' method with an id. This should return just one result to us (first ID returned from our last request)
  let someId = allCategories[0]._id;
  let oneCategory = await category.get(someId);
  console.log('One category', oneCategory);

  // UPDATE ----------
  // Some new data to update an existing category with
  let updatedData = {
    name: 'updated',
    description: 'buz'
  };
  // Call the 'update' method with an id and some data (to update it with). This should return that updated record.
  let anotherId = allCategories[1]._id;
  let updatedCategory = await category.update(anotherId, updatedData);
  console.log('Updated a category', updatedCategory);

  // DELETE ----------
  // Call the 'delete' method with an id. This should return the record we've deleted
  let yetAnotherId = allCategories[1]._id;
  let deletedCategory = await category.delete(yetAnotherId);
  console.log('Deleted a category', deletedCategory);

  // Look at all the categories again for good measure
  let categories = await category.get();
  console.log('All categories - END', categories);

  // Disconnect
  mongoose.disconnect();
}

doStuff();
