export const MENU = [
  { command: "start", description: "Intro" },
  { command: "help", description: "Help info" },
  // { command: "devnet", description: "Devnet faucet. Usage: /devnet 0x..." },
  // { command: "testnet", description: "Testnet faucet. Usage: /testnet 0x..." },
];

export const WELCOME_MESSAGE = "Welcome to Sui Faucet Bot by [Suiware](https://suiware.io)!";

export const HELP_MESSAGE =
  "Type *\\/devnet 0x\\.\\.\\.* or *\\/testnet 0x\\.\\.\\.* to get some test SUI\\.";

export const INVALID_COMMAND_MESSAGE = `Invalid command\\. ${HELP_MESSAGE}`;
