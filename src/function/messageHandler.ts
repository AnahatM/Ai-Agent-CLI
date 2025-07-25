import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { SYSTEM_PROMPT } from "../data/constants";

/**
 * Creates the initial messages for the chat loop.
 * @param userQuery The user's initial query.
 * @returns An array of ChatCompletionMessageParam objects.
 */
export function createInitialMessages(
  userQuery: string
): ChatCompletionMessageParam[] {
  return [
    {
      role: "system",
      content: SYSTEM_PROMPT,
    },
    {
      role: "user",
      content: userQuery,
    },
  ];
}

/**
 * Handles the assistant's response by adding it to the messages array.
 * @param messagesArray The current messages in the chat.
 * @param content The content of the assistant's response.
 */
export function handleAssistantResponse(
  messagesArray: ChatCompletionMessageParam[],
  content: string
) {
  messagesArray.push({
    role: "assistant",
    content: content,
  });
}
