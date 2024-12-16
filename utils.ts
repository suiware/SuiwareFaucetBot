import {
  CommandContext,
  Context,
} from "https://deno.land/x/grammy@v1.33.0/mod.ts";
import { INVALID_COMMAND_MESSAGE } from "./constants.ts";

export const getFaucetUrl = (network: string) => {
  return `https://faucet.${network}.sui.io/v1/gas`;
};

export const validateAddress = (address: string) => {
  return address.match(/0[xX][a-fA-F0-9]{64}/);
};
export const validateNetwork = (network: string) => {
  return network.match(/^(devnet|testnet)$/i);
};

export const handleFaucetRequest = async (
  ctx: CommandContext<Context>,
  network: string
) => {
  const address = ctx.match;
  if (address == null || address.trim() === "") {
    return ctx.reply('Now enter your SUI address...');
    // return ctx.reply(INVALID_COMMAND_MESSAGE);
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
