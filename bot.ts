import { Bot } from "https://deno.land/x/grammy@v1.33.0/mod.ts";
import "jsr:@std/dotenv/load";
import { HELP_MESSAGE, MENU } from "./constants.ts";
import {
  getFaucetUrl,
  handleFaucetRequest,
  validateAddress,
  validateNetwork,
} from "./utils.ts";

const bot = new Bot(Deno.env.get("BOT_KEY") || "");

bot.command("start", (ctx) =>
  ctx.reply(`Welcome to Sui Faucet by Suiware.io!\n\n${HELP_MESSAGE}`)
);
bot.command("help", (ctx) => ctx.reply(HELP_MESSAGE));

bot.command("devnet", (ctx) => {
  return handleFaucetRequest(ctx, "devnet");
});

bot.command("testnet", (ctx) => {
  return handleFaucetRequest(ctx, "testnet");
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

  ctx.reply(`_This format is deprecated. ${HELP_MESSAGE}_`);

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

await bot.api.setMyCommands(MENU);

export default bot;
