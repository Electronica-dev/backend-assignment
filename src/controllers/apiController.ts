import { Request, Response } from "express";
import axios from "axios";

const BASE_URL = "https://api.publicapis.org/entries"

export const queryPublicAPI = async (req: Request, res: Response) => {
  try {
    let result = [];
    const params = req.query;

    const category = params.category
    const limit = params.limit
    console.log(params, typeof params)
    if (params && !category && !limit && Object.keys(params).length > 0) {
      return res.status(400).json({
        "message": "Invalid query parameters. Please recheck."
      });
    }

    if (!category) {
      result = (await axios.get(`${BASE_URL}`)).data.entries;
    }

    if (category && typeof category === "string") {
      result = (await axios.get(`${BASE_URL}?category=${category}`)).data.entries;
    }

    if (limit) {
      result = result.slice(0, Number(limit));
    }

    return res.status(200).json({
      "message": "Succesfully queried the public database",
      "data": result
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An unexpected error occured."
    });
  }
};
