import axios from "axios";
import { COUNT_LIMIT } from "../config";
const RANDOMORG_API_URL = "https://api.random.org/json-rpc/4/invoke";

export const getRandom = () => {
  return axios.post(`${RANDOMORG_API_URL}`, {
    "jsonrpc": "2.0",
    "method": "generateIntegers",
    "params": {
      "apiKey": process.env.REACT_APP_RANDOM_ORG_API_KEY,
      "n": 10000,
      "min": 1,
      // "max": 10,
      "max": 100000,
      "replacement": true,
      "base": 10,
      "pregeneratedRandomization": null
    }, "id": 21530
  })
}

/**
 * @description you can use this function to get random numbers without `random.org`
 * @returns 
 */
export const testRandom = () => {
  return new Promise((resolve, rejected) => {
    return setTimeout(() => {
      resolve({
        data: {
          result: {
            random: {
              data: new Array(10000).fill(0).map((value) => parseInt(Math.random() * COUNT_LIMIT))
            }
          }
        }
      });
    }, 10);
  })
}

