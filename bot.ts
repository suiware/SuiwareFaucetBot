import { Bot } from "https://deno.land/x/grammy@v1.33.0/mod.ts";
import "jsr:@std/dotenv/load";

const bot = new Bot(Deno.env.get("BOT_KEY") || "");

bot.command("start", (ctx) =>
  ctx.reply(
    "Welcome to the Sui Faucet by Suiware!\n\n Type `devnet [address]` or `testnet [address]` to get some test SUI."
  )
);

bot.on("message", async (ctx) => {
  if (
    !ctx.message?.text?.startsWith("devnet") &&
    !ctx.message?.text?.startsWith("testnet")
  ) {
    return ctx.reply("Invalid command.");
  }

  const parts = ctx.message?.text?.split(" ");
  if (parts.length < 2) {
    return ctx.reply("Address parameter is missing.");
  }

  const network = parts[0];
  const address = parts[1];

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

  ctx.reply("Faucet request sent.");
  ctx.reply(resp.statusText);
  return;
});

bot.start();
