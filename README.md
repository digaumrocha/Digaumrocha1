# Discord Role Bot v2

## Setup

1. Crie um bot no [Discord Developer Portal](https://discord.com/developers/applications).
2. Ative `MESSAGE CONTENT INTENT` e `SERVER MEMBERS INTENT`.
3. Copie o token e coloque em `.env`.
4. Ajuste CLIENT_ID, GUILD_ID, CHANNEL_ID, WELCOME_CHANNEL e ROLES no `.env`.

### Instalação local

```bash
npm install
npm run deploy
npm start
```

### Railway

- Faça upload do projeto no Railway.
- Configure variáveis de ambiente a partir do `.env`.
- Configure `npm run deploy` para registrar os comandos.
- Start command: `npm start`.

O bot precisa estar online 24h para responder os cliques e dar boas-vindas.
