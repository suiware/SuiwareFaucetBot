import { Bot } from "https://deno.land/x/grammy@v1.33.0/mod.ts";
import "jsr:@std/dotenv/load";
import {
  HELP_MESSAGE,
  INVALID_COMMAND_MESSAGE,
  MENU,
  WELCOME_MESSAGE,
} from "./constants.ts";
import { handleFaucetRequest, validateNetwork } from "./utils.ts";

const bot = new Bot(Deno.env.get("BOT_KEY") || "");

bot.command("start", (ctx) =>
  ctx.reply(`${WELCOME_MESSAGE}\n\n${HELP_MESSAGE}`, {
    parse_mode: "MarkdownV2",
  })
);
bot.command("help", (ctx) =>
  ctx.reply(HELP_MESSAGE, { parse_mode: "MarkdownV2" })
);

bot.command("devnet", (ctx) => {
  return handleFaucetRequest(ctx, "devnet");
});

bot.command("testnet", (ctx) => {
  return handleFaucetRequest(ctx, "testnet");
});

bot.on("message", (ctx) => {
  if (ctx.message?.text == null) {
    return ctx.reply(INVALID_COMMAND_MESSAGE, { parse_mode: "MarkdownV2" });
  }

  const command = ctx.message?.text.trim();

  const parts = command.split(" ");
  if (parts.length !== 2) {
    return ctx.reply(INVALID_COMMAND_MESSAGE, { parse_mode: "MarkdownV2" });
  }

  const network = parts[0].trim().toLowerCase();
  if (!validateNetwork(network)) {
    return ctx.reply(INVALID_COMMAND_MESSAGE, { parse_mode: "MarkdownV2" });
  }

  return ctx.reply(`This format is deprecated. ${HELP_MESSAGE}`, {
    parse_mode: "MarkdownV2",
  });
});

await bot.api.setMyCommands(MENU);

export default bot;
