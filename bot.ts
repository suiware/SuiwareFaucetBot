import { Bot } from "https://deno.land/x/grammy@v1.33.0/mod.ts";
import "jsr:@std/dotenv/load";

const bot = new Bot(Deno.env.get("BOT_KEY") || "");

bot.command("start", (ctx) =>
  ctx.reply(
    "Welcome to the Sui Faucet by Suiware!\n\n Type `devnet [address]` or `testnet [address]` to get some test SUI."
  )
);

bot.on("message", (ctx) => {
  ctx.reply("Echo: " + ctx.message?.text)
  
  if (ctx.message?.text?.startsWith("devnet")) {
    ctx.reply("Devnet faucet is not available yet.");
    return;
  }

  if (ctx.message?.text?.startsWith("testnet")) {
    ctx.reply("Testnet faucet is not available yet.");
    return;
  }

  return ctx.reply("Echo: " + ctx.message?.text);
});

bot.start();
