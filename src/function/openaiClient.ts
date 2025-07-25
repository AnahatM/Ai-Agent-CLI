import { OpenAI } from "openai";
import { API_KEY } from "../data/constants";

// Initialize the OpenAI client with the API key defined in .env
export const client = new OpenAI({ apiKey: API_KEY });
