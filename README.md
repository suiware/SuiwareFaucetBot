# SuiwareFaucetBot - Sui Faucet Telegram Bot (experimental)

An experiment with [Deno](https://deno.com/), [grammY](https://grammy.dev/) and the [official Sui faucet API](https://docs.sui.io/guides/developer/getting-started/get-coins#request-test-tokens-through-curl).

## Deploy

The easiest way is to configure Github actions to deploy to [Deno Deploy](https://deno.com/deploy).

## Register Telegram Web Hook

```bash
curl https://api.telegram.org/bot[BOT_KEY]/setWebhook?url=[BOT_APP_URL]/[BOT_KEY]
```
