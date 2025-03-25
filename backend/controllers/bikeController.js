import Bike from "../models/Bike.js";

export const getBikes = async (req, res) => {
  try {
    const bikes = await Bike.find({ available: true });
    res.json(bikes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bikes" });
  }
};


export const getBikeById = async (req, res) => {
    try {
      const bike = await Bike.findById(req.params.id);
      if (!bike) return res.status(404).json({ message: "Bike not found" });
  
      res.json(bike);
    } catch (error) {
      res.status(500).json({ message: "Error fetching bike details" });
    }
  };
  