import axios from "axios";
import type { ApiResponse } from "../models/ApiResponse";

export const createAuction = async (apiRes: ApiResponse) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/auctions",
      {
        title: apiRes.title,
        description: apiRes.description,
        startPrice: apiRes.startPrice,
        endTime: apiRes.endTime,
      },
      { withCredentials: true },
    );

    if (response.status === 201) {
      console.log(response.status);
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};
