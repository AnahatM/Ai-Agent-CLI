import { ChatCompletionMessageParam } from "openai/resources/index.js";
import { ModelResponse } from "../data/types";

/**
 * Handles a single step in the conversation based on the assistant's response.
 * @param parsedResponse The parsed ModelResponse from the assistant.
 * @param messages The current array of chat messages (may be mutated).
 * @returns Whether to continue the chat loop (true) or exit (false).
 */
export function handleConversationStep(
  parsedResponse: ModelResponse,
  messages: ChatCompletionMessageParam[],
  TOOLS_MAP: any
): boolean {
  switch (parsedResponse.step.toUpperCase()) {
    case "THINK":
      return handleThinkStep(parsedResponse);
    case "OUTPUT":
      return handleOutputStep(parsedResponse);
    case "ACTION": {
      return handleActionStep(parsedResponse, messages, TOOLS_MAP);
    }
    default:
      return handleUnknownStep(parsedResponse);
  }
}

/**
 * Handles the assistant's response content, adding it to the chat messages.
 * @param messages The current array of chat messages.
 * @param content The content from the assistant's response.
 */
export function handleThinkStep(parsedResponse: ModelResponse): boolean {
  console.log(`🧠 Thinking: ${parsedResponse.content}`);
  return true; // Continue the chat loop for further steps
}

/**
 * Handles the output step, printing the content to the console.
 * @param parsedResponse The parsed ModelResponse from the assistant.
 * @returns Whether to continue the chat loop (true) or exit (false).
 * Always returns false to exit the chat loop after final output.
 */
export function handleOutputStep(parsedResponse: ModelResponse): boolean {
  console.log(`✅ Output: ${parsedResponse.content}`);
  return false; // Exit the chat loop after output
}

/**
 * Handles unknown steps in the conversation.
 * @param parsedResponse The parsed ModelResponse from the assistant.
 * @returns false to exit the chat loop, since this is an unknown step.
 */
export function handleUnknownStep(parsedResponse: ModelResponse): boolean {
  console.log(`❓Unknown step: ${parsedResponse.step}`);
  return false; // Exit the chat loop on error
}

/**
 * Handles the action step, executing the specified tool with the provided input.
 * @param parsedResponse The parsed ModelResponse from the assistant.
 * @param messages The current array of chat messages (may be mutated).
 * @param toolsMap The map of available tools to execute.
 * @returns true to continue the chat loop after action execution.
 */
export function handleActionStep(
  parsedResponse: ModelResponse,
  messages: ChatCompletionMessageParam[],
  toolsMap: any
): boolean {
  // Extract tool name and input from the response
  const toolName = parsedResponse.tool;
  const toolInput = parsedResponse.input;

  // Validate the tool name
  if (!toolName || !toolsMap[toolName]) {
    console.error(`Unknown tool: ${toolName}`);
    return true; // Continue the chat loop to handle the error
  }

  console.log(`🔧 Action: ${toolName} with input: ${toolInput}`);

  // Execute the tool with the provided input
  const value = toolsMap[toolName](toolInput);

  // Add the tool's output as a new message in the chat
  // Make the assistant observe the result
  messages.push({
    role: "assistant",
    content: JSON.stringify({
      step: "OBSERVE",
      content: value,
    }),
  });

  return true; // Continue the chat loop after action
}
