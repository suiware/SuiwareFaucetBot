import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { getFaucetUrl, validateAddress, validateNetwork } from "../utils.ts";

Deno.test("getFaucetUrl returns correct URL", () => {
  assertEquals(getFaucetUrl("testnet"), "https://faucet.testnet.sui.io/v1/gas");
  assertEquals(getFaucetUrl("devnet"), "https://faucet.devnet.sui.io/v1/gas");
});

Deno.test("validateAddress correctly validates Sui addresses", () => {
  // Valid addresses
  const validAddress =
    "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef";
  const validAddressUpper =
    "0X1234567890ABCDEF1234567890ABCDEF1234567890ABCDEF1234567890ABCDEF";

  // Invalid addresses
  const invalidAddress1 = "0x123"; // too short
  const invalidAddress2 =
    "1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"; // missing 0x
  const invalidAddress3 =
    "0xghijklmn1234567890abcdef1234567890abcdef1234567890abcdef1234567"; // invalid chars

  assertEquals(validateAddress(validAddress) !== null, true);
  assertEquals(validateAddress(validAddressUpper) !== null, true);
  assertEquals(validateAddress(invalidAddress1), null);
  assertEquals(validateAddress(invalidAddress2), null);
  assertEquals(validateAddress(invalidAddress3), null);
});

Deno.test("validateNetwork correctly validates network names", () => {
  // Valid networks
  assertEquals(validateNetwork("devnet") !== null, true);
  assertEquals(validateNetwork("testnet") !== null, true);
  assertEquals(validateNetwork("DEVNET") !== null, true);
  assertEquals(validateNetwork("TESTNET") !== null, true);

  // Invalid networks
  assertEquals(validateNetwork("mainnet"), null);
  assertEquals(validateNetwork("dev"), null);
  assertEquals(validateNetwork("test"), null);
  assertEquals(validateNetwork(""), null);
});
