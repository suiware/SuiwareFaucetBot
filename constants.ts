export const MENU = [
  { command: "start", description: "Intro" },
  { command: "help", description: "Help info" },
  { command: "devnet 0x...", description: "Devnet faucet. Usage: /devnet 0x..." },
  { command: "testnet 0x...", description: "Testnet faucet. Usage: /testnet 0x..." },
];

export const WELCOME_MESSAGE = "Welcome to Sui Faucet by Suiware.io!";

export const HELP_MESSAGE =
  'Type "/devnet 0x..." or "/testnet 0x..." to get some test SUI.';

export const INVALID_COMMAND_MESSAGE = `Invalid command. ${HELP_MESSAGE}`;