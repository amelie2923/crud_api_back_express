import express from "express";
import bodyParser from 'body-parser';
import db from './data/database';
import { validate, createPlane, findPlaneById, deletePlaneById, updatePlaneById } from './services/PlanesService';
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const PORT = 3000;

// endpoints CRUD API:
// GET /api/v1/planes
// POST /api/v1/planes
// GET /api/v1/planes/1
// DELETE /api/v1/planes/1
// PUT /api/v1/planes/1

// GET ALL PLANES DATA
// Define endpoint /api/v1/planes
// Request processing: nothing
// Return : -return data with HTTP Code : 200
// -return HTTP Code : 400 if error

app.get('/api/v1/planes', (req, res) => {
  res.status(200).send({
    success: true,
    message: "Planes was get successfully",
    planes: db,
  })
});

// CREATE A PLANE
// Create the endpoint
// Return : -return HTTP Code : 200 if ok
// -return HTTP Code: 400 if error
// Retrieve query data
// Validate data
// Insert plane into database

app.post('/api/v1/planes', (req, res) => {
  console.log('req', req.body.company);
  const plane = req.body;
  const checkValidation = validate(plane);
  // Validation
  if (!checkValidation.success) {
    // return HTTP Code: 400 error
    res.status(400).send(checkValidation);
  }
  // Insert in database
  const planeToSave = createPlane(plane);
  // Return
  res.status(200).send({
    success: true,
    message: "Plane was send successfully",
    plane: planeToSave,
  });
});

// GET BY ID
// Create the endpoint with path param
// Create function findPlaneById(id)

app.get('/api/v1/planes/:id', (req, res) => {
  // parseInt base 10 (decimal base)
  const id = parseInt(req.params.id, 10);
  const plane = findPlaneById(id);
  if (plane) {
    res.status(200).send({
      success: true,
      message: "Plane was get successfully",
      plane,
    });
  } else {
    res.status(404).send({
      success: false,
      message: "Plane not found",
    });
  };
});

// DELETE BY ID
// Create function deletePlaneById(id)

app.delete('/api/v1/planes/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const plane = deletePlaneById(id);
  if (plane) {
    res.status(200).send({
      success: true,
      message: "Plane was delete successfully",
    });
  } else {
    res.status(404).send({
      success: false,
      message: "Plane not found",
    });
  };
});

// UPDATE BY ID
// Get the plane object from request
// Validate data
// Create function updatePlaneById(id, plane)
// Error management

app.put('/api/v1/planes/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const newPlane = req.body;
  // Create updatePlaneById function
  const plane = updatePlaneById(id, newPlane);
  if (plane) {
    res.status(200).send({
      success: true,
      message: "Plane was update successfully",
      plane,
    });
  } else {
    res.status(404).send({
      success: false,
      message: "Plane not found",
    });
  };
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
  console.log(`http://localhost:${PORT}`)
});