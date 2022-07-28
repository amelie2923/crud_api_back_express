import db from '../data/database';
/**
 *
 * @param {*} plane
 * @returns
 */
export const validate = function (plane) {
  if (!plane.company) {
    return {
      success: false,
      message: "Company is required",
    }
  };
  if (!plane.model) {
    return {
      success: false,
      message: "Model is required",
    }
  };
  if (!plane.description) {
    return {
      success: false,
      message: "Description is required",
    }
  };
  if (!plane.year) {
    return {
      success: false,
      message: "Year is required",
    }
  };
  if (!plane.seats) {
    return {
      success: false,
      message: "Seats is required",
    }
  };
  if (!plane.service) {
    return {
      success: false,
      message: "Service is required",
    }
  };
  if (!plane.interior) {
    return {
      success: false,
      message: "Interior is required",
    }
  };
  return {
    success: true,
    message: "Valid request",
  };
};

/**
 * Delete a plane in db
 * @param {*} plane
 * @returns {object}
 */

export const createPlane = function (plane) {
  const planeToSave = {
    "id": db.length + 1,
    "company": plane.company,
    "model": plane.model,
    "description": plane.description,
    "year": plane.year,
    "seats": plane.seats,
    "service": plane.service,
    "interior": plane.interior,
    "incident": plane.incident,
  };
  db.push(planeToSave);
  return planeToSave;
};

/**
 * Find a plane by its id in db
 * @param {number} id
 * @returns {object}
 */

export const findPlaneById = function (id) {
  const planeResult = db.find((plane) => {
    if (plane.id === id) {
      return plane;
    };
  });
  return planeResult;
};

/**
 * Delete a plane by its id in db
 * @param {num} id
 * @returns {object}
 */

export const deletePlaneById = function (id) {
  const planeResult = db.find((plane, index) => {
    if (plane.id === id) {
      db.splice(index, 1);
      return true
    };
  });
  return planeResult;
};

/**
 * Update a plane by its id in db
 * @param {*} id
 * @param {*} newPlane
 * @returns {object}
 */

export const updatePlaneById = function (id, newPlane) {
  let planeFoundInDb;
  let itemIndex;

  db.map((plane, index) => {
    if (plane.id === id) {
      planeFoundInDb = plane;
      itemIndex = index;
    };
  });

  if (!planeFoundInDb) {
    return false;
  };

  // Check if data are wrong
  if (!validate(newPlane).success) {
    return false;
  };

  // Merge
  const planeToSave = {
    "id": planeFoundInDb.id,
    "company": newPlane.company || planeFoundInDb.company,
    "model": newPlane.model || planeFoundInDb.model,
    "description": newPlane.description || planeFoundInDb.description,
    "year": newPlane.year || planeFoundInDb.year,
    "seats": newPlane.seats || planeFoundInDb.seats,
    "service": newPlane.service || planeFoundInDb.service,
    "interior": newPlane.interior || planeFoundInDb.interior,
    "incident": newPlane.incident || planeFoundInDb.incident,
  };

  // Update in database
  db.splice(itemIndex, 1, planeToSave)
  return updatePlaneById;
};