require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const port = 3000;
const app = express();

// Connecting to the database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Database successfully connected');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Person Schema
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

// Person Model
const Person = mongoose.model('Person', personSchema);

// Creating a Person
const person = new Person({
  name: 'Bamba Senghor',
  age: 24,
  favoriteFoods: ['Mafe', 'Chicken', 'Yassa']
});

person
  .save()
  .then(() => {
    console.log('Person added successfully.');
  })
  .catch((err) => {
    console.error(err);
  });

// Creating an Array of Persons
const arrayOfPeople = [
  { name: 'Modou Senghor', age: 37, favoriteFoods: ['Rice and Fish', 'Chicken'] },
  { name: 'Fallou Senghor', age: 27, favoriteFoods: ['Rice and Chicken', 'Mafe'] },
  { name: 'Diarra Senghor', age: 31, favoriteFoods: ['Yassa'] }
];

Person
  .insertMany(arrayOfPeople)
  .then(() => {
    console.log('People added successfully.');
  })
  .catch((err) => {
    console.error(err);
  });

// Getting Persons
Person
  .find()
  .then((docs) => {
    console.log('People Found:', docs);
  })
  .catch((err) => {
    console.error(err);
  });

// Getting Persons by Favorite Food "Mafe"
Person
  .findOne({ favoriteFoods: { $in: ['Mafe'] } })
  .then((doc) => {
    console.log('Person found:', doc);
  })
  .catch((err) => {
    console.error(err);
  });

// Getting Person by ID
const idUser = '66fb355d60fa9c91e65b4445';

Person
  .findById(idUser)
  .then((doc) => {
    console.log('Person found:', doc);
  })
  .catch((err) => {
    console.error(err);
  });

// Search by ID and Add New Favorite Food
const id = '66fb351ab2ad49749a92ce36';

Person
  .findById(id)
  .then((doc) => {
    doc.favoriteFoods.push('Hamburger');
    doc.save();
    console.log(doc);
  })
  .catch((err) => {
    console.error(err);
  });

// Find By Name And Update Age
Person
  .findOneAndUpdate({ name: 'Khadim Senghor' }, { age: 20 }, { new: true })
  .then((doc) => {
    console.log('Age updated:', doc);
  })
  .catch((err) => {
    console.error(err);
  });

// Delete People With Name "Fallou Senghor"
Person
  .deleteMany({ name: 'Fallou Senghor' })
  .then(() => {
    console.log('Fallou Senghor successfully deleted.');
  })
  .catch((err) => {
    console.error(err);
  });

// Finding People who like Yassa
Person
  .find({ favoriteFoods: { $in: ['Yassa'] } })
  .sort('name')
  .limit(2)
  .select('-age')
  .then((docs) => {
    console.log('People who like Yassa:', docs);
  })
  .catch((err) => {
    console.error(err);
  });

// Starting the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});