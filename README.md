# Basic Agent Implementation

This project demonstrates a custom AI agent that can respond to a user prompt using tools and a thinking loop before delivering its final output.
This repository provides a barebones framework for a custom AI agent.
All code and functions are organized and documented.

## Usage

Get an OpenAI API Key, and define it in a `.env` file at the project root as:
`API_KEY=abcdefghijklmnopqrstuvwxyz`

Clone the repository and run `npm install` to get all required libraries.

1. Define tools in [tools.ts](./src/tools/tools.ts)
2. Add the new tools to the prompt in [constants.ts](./src/data/constants.ts)
3. Modify the prompt in [index.ts](./src/index.ts)
