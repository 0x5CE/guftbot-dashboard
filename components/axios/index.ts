import axios from "axios";

const NextApiClient = axios.create({
  baseURL: "../api/",
  headers: {
    "Content-Type": "application/json",
  },
});

export { NextApiClient };
