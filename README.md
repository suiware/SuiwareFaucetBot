# SuiwareFaucetBot - Sui Faucet Telegram Bot

An experiment with [Deno](https://deno.com/), [grammY](https://grammy.dev/) and the [official Sui faucet API](https://docs.sui.io/guides/developer/getting-started/get-coins#request-test-tokens-through-curl).

## Deploy

The easiest way is to configure Github actions to deploy to [Deno Deploy](https://deno.com/deploy).

## Register Telegram web hook

```bash
curl https://api.telegram.org/bot[BOT_KEY]/setWebhook?url=[BOT_APP_URL]/[BOT_KEY]
```

## Set environment variables

```environment
BOT_KEY="[your bot key]"
```
