import { runChatLoop } from "./function/chatLoop";

async function main(): Promise<void> {
  const userQuery: string = "I am in Dubai, should I wear a coat today?";

  await runChatLoop(userQuery);
}

main();
