import {
  Bot,
  CommandContext,
  Context,
} from "https://deno.land/x/grammy@v1.33.0/mod.ts";
import "jsr:@std/dotenv/load";
import { getFaucetUrl, validateAddress, validateNetwork } from "./utils.ts";

const bot = new Bot(Deno.env.get("BOT_KEY") || "");

const helpMessage =
  'Type "/devnet 0x..." or "/testnet 0x..." to get some test SUI.';

bot.command("start", (ctx) =>
  ctx.reply(`Welcome to Sui Faucet by Suiware.io!\n\n${helpMessage}`)
);
bot.command("help", (ctx) => ctx.reply(helpMessage));

const handleFaucetRequest = async (
  ctx: CommandContext<Context>,
  network: string
) => {
  const address = ctx.match;
  if (address == null) {
    return ctx.reply("Invalid command");
  }

  if (!validateAddress(address)) {
    return ctx.reply("Invalid address");
  }

  const resp = await fetch(getFaucetUrl(network), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      FixedAmountRequest: {
        recipient: address,
      },
    }),
  });

  return ctx.reply(resp.statusText);
};

bot.command("devnet", (ctx) => {
  return handleFaucetRequest(ctx, "devnet");
});

bot.command("testnet", (ctx) => {
  return handleFaucetRequest(ctx, "devnet");
});

bot.on("message", async (ctx) => {
  if (ctx.message?.text == null) {
    return ctx.reply("Invalid command");
  }

  const command = ctx.message?.text.trim();

  const parts = command.split(" ");
  if (parts.length === 1) {
    return ctx.reply("Missing address");
  }
  if (parts.length !== 2) {
    return ctx.reply("Invalid command");
  }

  const network = parts[0].trim().toLowerCase();
  if (!validateNetwork(network)) {
    return ctx.reply("Invalid command");
  }

  const address = parts[1].trim();
  if (!validateAddress(address)) {
    return ctx.reply("Invalid address");
  }

  const resp = await fetch(getFaucetUrl(network), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      FixedAmountRequest: {
        recipient: address,
      },
    }),
  });

  return ctx.reply(resp.statusText);
});

// bot.start();
export default bot;
