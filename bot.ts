import { Bot } from "https://deno.land/x/grammy@v1.33.0/mod.ts";
import "jsr:@std/dotenv/load";

const bot = new Bot(Deno.env.get("BOT_KEY") || "");

bot.command("start", (ctx) =>
  ctx.reply(
    "Welcome to the Sui Faucet by Suiware!\n---\n\nUse **devnet [address]** or **testnet [address]** to fund your address."
  )
);

bot.on("message", async (ctx) => {
  if (ctx.message?.text == null) {
    return ctx.reply("Invalid command.");
  }

  const command = ctx.message?.text.trim();

  if (!command.match(/^(devnet|testnet)/i)) {
    return ctx.reply("Invalid command.");
  }

  const parts = command.split(" ");
  if (parts.length === 1) {
    return ctx.reply("Missing address.");
  }
  if (parts.length !== 2) {
    return ctx.reply("Invalid command.");
  }

  const network = parts[0].trim().toLowerCase();

  const address = parts[1].trim();
  if (!address.match(/0[xX][a-fA-F0-9]{64}/)) {
    return ctx.reply("Invalid address.");
  }

  const resp = await fetch(`https://faucet.${network}.sui.io/v1/gas`, {
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

  ctx.reply(resp.statusText);
  return;
});

// bot.start();
export default bot;
