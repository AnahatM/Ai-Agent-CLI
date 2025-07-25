import { config } from "dotenv";
import { getTemperature, numberTransformer } from "../tools/tools";
import { BASE_PROMPT } from "./prompt";

// Configure dotenv to load environment variables
config();

// Export environment variables
export const API_KEY = process.env.API_KEY;

// Constants
export const DEFAULT_MODEL = "gpt-4.1-mini";

export const TOOLS_MAP = {
  numberTransformer: numberTransformer,
  getTemperature: getTemperature,
};

export const AVAILABLE_TOOLS_PROMPT = `
- numberTransformer(a: number): number              Transforms a number with some operations.
- getTemperature(city: string): number              Fetches the current temperature for a given city in Fahrenheit.
`;

export const SYSTEM_PROMPT = BASE_PROMPT;
