export const getFaucetUrl = (network: string) => {
  return `https://faucet.${network}.sui.io/v1/gas`;
};

export const validateAddress = (address: string) => {
  return address.match(/0[xX][a-fA-F0-9]{64}/);
};
export const validateNetwork = (network: string) => {
  return network.match(/^(devnet|testnet)$/i);
};
