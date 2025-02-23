import { Bot } from "https://deno.land/x/grammy@v1.33.0/mod.ts";
import "jsr:@std/dotenv/load";
import {
  FULL_HELP_MESSAGE,
  INVALID_COMMAND_MESSAGE,
  MENU,
  SHORT_HELP_MESSAGE,
  SUPPORT_MESSAGE,
} from "./constants.ts";
import { handleFaucetRequest, validateNetwork } from "./utils.ts";

const bot = new Bot(Deno.env.get("BOT_KEY") || "");

bot.command("start", (ctx) => ctx.reply(FULL_HELP_MESSAGE));
bot.command(
  "help",
  (ctx) => ctx.reply(`${SHORT_HELP_MESSAGE}\n\n${SUPPORT_MESSAGE}`),
);

bot.command("devnet", (ctx) => {
  return handleFaucetRequest(ctx, "devnet");
});

bot.command("testnet", (ctx) => {
  return handleFaucetRequest(ctx, "testnet");
});

bot.on("message", (ctx) => {
  if (ctx.message?.text == null) {
    return ctx.reply(INVALID_COMMAND_MESSAGE);
  }

  const command = ctx.message?.text.trim();

  const parts = command.split(" ");
  if (parts.length !== 2) {
    return ctx.reply(INVALID_COMMAND_MESSAGE);
  }

  const network = parts[0].trim().toLowerCase();
  if (!validateNetwork(network)) {
    return ctx.reply(INVALID_COMMAND_MESSAGE);
  }

  return ctx.reply(`This format is deprecated. ${SHORT_HELP_MESSAGE}`);
});

await bot.api.setMyCommands(MENU);

export default bot;
