import {
  CommandContext,
  Context,
} from "https://deno.land/x/grammy@v1.33.0/mod.ts";
import { ADDRESS_MISSING_MESSAGE } from "./constants.ts";

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
    return ctx.reply(ADDRESS_MISSING_MESSAGE);
  }

  if (!validateAddress(address)) {
    return ctx.reply(
      "Invalid SUI address. Should be something like 0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
    );
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
