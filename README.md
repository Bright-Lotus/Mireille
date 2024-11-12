# Mireille
![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/Zelda-Zamora/Fakeri?style=flat-square) ![Website](https://img.shields.io/website?style=flat-square&url=https%3A%2F%2Ffakeri.vercel.app%2F) ![GitHub commit activity](https://img.shields.io/github/commit-activity/m/Zelda-Zamora/Fakeri?style=flat-square) [![CC BY-NC-ND 4.0][cc-by-nc-nd-shield]][cc-by-nc-nd]


This project uses a [Firebase Firestore Database](https://firebase.google.com/docs/firestore), which you need to have up and running in order for the bot to work.

Set the neccesary keys in a .env file for the bot to connect to the DB:

```
FIREBASE_API_KEY=
FIREBASE_CONFIG_AUTH_DOMAIN=
FIREBASE_CONFIG_PROJECT_ID=
FIREBASE_CONFIG_STORAGE_BUCKET=
FIREBASE_CONFIG_MESSAGING_SENDER_ID=
FIREBASE_CONFIG_APP_ID=
```

Also set the bot token and bot client ID on the .env

```
DISCORD_TOKEN=
CLIENT_ID=
```

If you also want, you can set a testing bot discord token and client ID in the .env and use `node . test` to login to that bot

```
DISCORD_TEST_BOT_TOKEN=
TEST_BOT_CLIENT_ID=
```

You can also set the bot version in the .env for display in the /credits command
```
BOT_VERSION=1.0.0
```

## Yarn Zero Install

The Discord Bot uses Yarn's [Yarn PnP](https://yarnpkg.com/features/pnp) and [offline mirror](https://yarnpkg.com/features/caching#offline-mirror) technology to offer a zero install cloning. Just clone the repo and all the deps will be available.

Due to GitHub storage limits, this functionality is only enabled in the Discord Bot (Mireille/mireille).

Remember to download the required SDKs for your IDE: https://yarnpkg.com/getting-started/editor-sdks.

## Licensing

This work is licensed under a
[Creative Commons Attribution-NonCommercial-NoDerivs 4.0 International License][cc-by-nc-nd].

[![CC BY-NC-ND 4.0][cc-by-nc-nd-image]][cc-by-nc-nd]

[cc-by-nc-nd]: http://creativecommons.org/licenses/by-nc-nd/4.0/
[cc-by-nc-nd-image]: https://licensebuttons.net/l/by-nc-nd/4.0/88x31.png
[cc-by-nc-nd-shield]: https://img.shields.io/badge/License-CC%20BY--NC--ND%204.0-lightgrey.svg
