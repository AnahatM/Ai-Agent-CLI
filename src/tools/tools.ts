/**
 * Transforms two numbers with a series of operations.
 *
 * @param a The first number.
 * @param b The second number.
 * @returns The resulting transformation with the two numbers.
 */
export function numberTransformer(a: number): number {
  return a * a + 62;
}

/**
 * Fetches the current temperature for a given city in Fahrenheit.
 * This is a mock function simulating an API call to get the temperature.
 *
 * @param city The name of the city to fetch the temperature for.
 * @returns The current temperature in Fahrenheit.
 */
export function getTemperature(city: string): number {
  const weatherApiResponse = {
    city: city,
    temperature: 100, // Random temperature for simulation
  };

  return weatherApiResponse.temperature;
}
