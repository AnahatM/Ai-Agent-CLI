import type {
  ChatCompletion,
  ChatCompletionMessageParam,
} from "openai/resources/chat/completions";
import { DEFAULT_MODEL, TOOLS_MAP } from "../data/constants";
import { ModelResponse } from "../data/types";
import {
  createInitialMessages,
  handleAssistantResponse,
} from "./messageHandler";
import { handleConversationStep } from "./modelActions";
import { client } from "./openaiClient";

/**
 * Calls the OpenAI API to get a chat completion response.
 * @param messages The current array of chat messages.
 * @returns The content string from the assistant's response, or null if invalid.
 */
async function getAssistantResponseContent(
  messages: ChatCompletionMessageParam[]
): Promise<string | null> {
  // API call to get the assistant's response
  const response: ChatCompletion = await client.chat.completions.create({
    model: DEFAULT_MODEL,
    response_format: { type: "json_object" },
    messages: messages,
  });

  // Check if the response contains choices
  if (!response.choices || response.choices.length === 0) {
    console.error("No choices returned from the API.");
    return null;
  }

  // Extract the content from the first choice
  const content = response.choices[0].message.content;

  // Validate the content
  if (!content) {
    console.error("No content in the assistant's response.");
    return null;
  }

  return content;
}

/**
 * Parses and validates the assistant's response content as a ModelResponse object.
 * @param content The JSON string content from the assistant.
 * @returns The parsed ModelResponse object, or null if invalid.
 */
function parseAndValidateResponse(content: string): ModelResponse | null {
  let parsedResponse: ModelResponse;

  // Attempt to parse the content as JSON
  try {
    parsedResponse = JSON.parse(content);
  } catch (e) {
    console.error("Failed to parse assistant response as JSON.");
    return null;
  }

  // Validate the parsed response structure
  if (
    !parsedResponse ||
    typeof parsedResponse !== "object" ||
    !parsedResponse.step
  ) {
    console.error("Invalid response format from the assistant.");
    return null;
  }

  return parsedResponse;
}

/**
 * Runs the chat loop. Initializes the chat, processes responses, and handles conversation steps.
 * This is the main entry point for the chat interaction.
 *
 * @returns A promise that resolves when the chat loop is complete.
 */
export async function runChatLoop(userQuery: string): Promise<void> {
  // Create initial messages for the chat
  const messages: ChatCompletionMessageParam[] =
    createInitialMessages(userQuery);

  while (true) {
    const content = await getAssistantResponseContent(messages);
    if (!content) break;

    handleAssistantResponse(messages, content);

    const parsedResponse = parseAndValidateResponse(content);
    if (!parsedResponse) break;

    const shouldContinue = handleConversationStep(
      parsedResponse,
      messages,
      TOOLS_MAP
    );
    if (!shouldContinue) break;
  }
}
