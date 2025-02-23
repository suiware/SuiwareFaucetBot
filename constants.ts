export const MENU = [
  { command: "start", description: "Intro" },
  { command: "help", description: "Help info" },
  { command: "devnet", description: "Devnet faucet. Usage: /devnet 0x..." },
  { command: "testnet", description: "Testnet faucet. Usage: /testnet 0x..." },
];

export const WELCOME_MESSAGE = "Sui Faucet Bot by Suiware.io";
export const SHORT_HELP_MESSAGE =
  `Type "/devnet 0x..." or "/testnet 0x..." to get some test SUI.`;
export const SOURCES_MESSAGE =
  `Sources: https://github.com/suiware/SuiwareFaucetBot`;
export const SUPPORT_MESSAGE = `Support: https://x.com/suiware_`;
export const FULL_HELP_MESSAGE =
  `${WELCOME_MESSAGE}\n\n${SHORT_HELP_MESSAGE}\n\n${SOURCES_MESSAGE}\n${SUPPORT_MESSAGE}`;

export const INVALID_COMMAND_MESSAGE = `Invalid command. ${SHORT_HELP_MESSAGE}`;
export const ADDRESS_MISSING_MESSAGE =
  `Address is missing. ${SHORT_HELP_MESSAGE}`;
