/**
 * Represents a step of the model's response process.
 *
 * @property step - The step of the conversation, which can be "START", "THINK", "ACTION", or "OUTPUT".
 * @property content - The content of the message.
 * @property tool - The name of the tool used in the message, if applicable.
 * @property input - The input to the tool, if applicable.
 */
export interface ModelResponse {
  /** The step of the conversation, which can be "START", "THINK", "ACTION", "OUTPUT", or "OBSERVE". */
  step: string;
  /** The content of the message. */
  content?: string;
  /** The name of the tool used in the message, if applicable. */
  tool?: string | null;
  /** The input to the tool, if applicable. */
  input?: any | null;
}
