# Basic Agent Implementation

This project demonstrates a custom AI agent that can respond to a user prompt using tools and a thinking loop before delivering its final output.
This repository provides a barebones framework for a custom AI agent.
All code and functions are organized and documented.

[![Anahat's Website](https://img.shields.io/badge/Developer_Website-AnahatMudgal.com-navy)](https://AnahatMudgal.com)
[![App Website Page](https://img.shields.io/badge/App_Webpage-AI_Agent_CLI-seagreen)](https://AnahatMudgal.com)

## Technologies

This application is powered by NodeJS and programmed in TypeScript.

![TypeScript](https://img.shields.io/badge/-TypeScript-05122A?style=flat-square&logo=TypeScript)
![Node](https://img.shields.io/badge/-Node-05122A?style=flat-square&logo=Node.js)

## Usage

Get an OpenAI API Key, and define it in a `.env` file at the project root as:
`API_KEY=abcdefghijklmnopqrstuvwxyz`

Clone the repository and run `npm install` to get all required libraries.

1. Define tools in [tools.ts](./src/tools/tools.ts)
2. Add the new tools to the prompt in [constants.ts](./src/data/constants.ts)
3. Modify the prompt in [index.ts](./src/index.ts)

Run the app using `npm start` from the project root.

Here is what an example output looks like.

```
Prompt: I am in Dubai, should I wear a coat today?

🧠 Thinking: The user is asking if they should wear a coat in Dubai today.
🧠 Thinking: To determine if the user should wear a coat, I need to know the current temperature in Dubai.
🧠 Thinking: Dubai is typically warm, but checking today's specific temperature is necessary as it may vary.
🔧 Action: getTemperature with input: Dubai
🧠 Thinking: The output of the getTemperature tool is 100 degrees Fahrenheit for the city Dubai.
🧠 Thinking: 100 degrees Fahrenheit is very hot, so wearing a coat would be uncomfortable and unnecessary.
✅ Output: No, you should not wear a coat today because the current temperature in Dubai is 100 degrees Fahrenheit, which is very hot.
```
