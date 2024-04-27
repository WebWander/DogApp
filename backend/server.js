/* eslint-disable no-undef */
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import Dog from "./schema/model.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Get all dogs
app.get("/dogs", async (req, res) => {
  const dogs = await Dog.find();
  res.status(200).json(dogs);
});

// Get one dog by Id
app.get("/dogs/:id", async (req, res) => {
  const { id } = req.params;
  const dog = await Dog.findOne({ _id: id });
  res.status(200).json(dog);
});

// Create a new dog
app.post("/dogs", async (req, res) => {
  const dog = new Dog(req.body);
  const savedDog = await dog.save();
  res.status(201).json(savedDog);
});

// Update a dog by Id
app.put("/dogs/:id", async (req, res) => {
  const { id } = req.params;
  await Dog.updateMany({ _id: id }, req.body);
  const updatedDog = await Dog.findById(id);
  res.status(200).json(updatedDog);
});

// Delete a dog by Id
app.delete("/dogs/:id", async (req, res) => {
  const { id } = req.params;
  const deletedDog = await Dog.findByIdAndDelete(id);
  await Dog.updateMany({}, { $pull: { friends: { fId: id } } });
  res.status(200).json(deletedDog);
});

//connect to db
mongoose.connect("mongodb+srv://malala:halalan123@cluster0.17q3fiw.mongodb.net/Dog?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log('Connected to db')
        app.listen(process.env.PORT, () => {
            console.log('App is listening on port', process.env.PORT);
          });
        
    })
    .catch((err) => {
        console.log(err)
    })

