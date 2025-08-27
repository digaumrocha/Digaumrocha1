import "dotenv/config";
import {
  Client,
  GatewayIntentBits,
  Partials,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  Events
} from "discord.js";

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
  partials: [Partials.Channel]
});

// Roles fixas
const roles = [
  process.env.ROLE1,
  process.env.ROLE2,
  process.env.ROLE3,
  process.env.ROLE4,
  process.env.ROLE5
];

// Role temporária (7 dias)
const tempRoleId = "1402122531879653416";

client.once("ready", () => {
  console.log(`Bot online como ${client.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isChatInputCommand()) {
    if (interaction.commandName === "setup") {
      const embed = new EmbedBuilder()
        .setColor(0x6a0dad)
        .setTitle("🚀 Auto Roles")
        .setDescription(
          "Select the Rocket from the buttons below to access the server and interact roles.\n\n" +
          "*Interact roles can be managed in the #manage-auto-roles channel.*"
        );

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId("alien").setEmoji("👽").setStyle(ButtonStyle.Secondary),
        new ButtonBuilder().setCustomId("bride").setEmoji("👰‍♀️").setStyle(ButtonStyle.Secondary),
        new ButtonBuilder().setCustomId("rocket").setEmoji("🚀").setStyle(ButtonStyle.Success),
        new ButtonBuilder().setCustomId("hero").setEmoji("🦸‍♂️").setStyle(ButtonStyle.Secondary),
        new ButtonBuilder().setCustomId("mage").setEmoji("🧙").setStyle(ButtonStyle.Secondary)
      );

      await interaction.reply({ embeds: [embed], components: [row] });
    }
  }

  if (interaction.isButton()) {
    if (interaction.customId === "rocket") {
      const member = interaction.member;
      try {
        // Adiciona roles fixas
        await member.roles.add(roles);

        // Adiciona role temporária
        await member.roles.add(tempRoleId);

        const embed = new EmbedBuilder()
          .setColor(0x00ff99)
          .setTitle("✅ Roles Granted")
          .setDescription(
            "AstroNAD, Raidoor, Gamer, Active Tasks, and Giveaways roles have been granted.\n\n" +
            "Additionally, you received a temporary role valid for 7 days.\n\n" +
            "Pre-registering your wallet address for WL ensures that any WL and other earned benefits are delivered quickly and securely (no authentication required).\n" +
            "Want to do this now?"
          );

        const row = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setLabel("💎 Register Wallet")
            .setStyle(ButtonStyle.Link)
            .setURL("https://discord.com/channels/1346896831409295460/1356802660027863130/1358581592636915835"),
          new ButtonBuilder()
            .setLabel("Don't register wallet now")
            .setStyle(ButtonStyle.Link)
            .setURL(process.env.DONT_REGISTER_URL)
        );

        await interaction.reply({
          embeds: [embed],
          components: [row],
          ephemeral: true
        });

        // ✅ Agenda a remoção da role temporária em 7 dias
        setTimeout(async () => {
          try {
            await member.roles.remove(tempRoleId);
            console.log(`⏳ Role temporária removida de ${member.user.tag}`);
          } catch (err) {
            console.error("Erro ao remover role temporária:", err);
          }
        }, 168 * 60 * 60 * 1000); // 168h = 7 dias

        // ✅ Mensagem de boas-vindas após 1 min
        setTimeout(async () => {
          const channel = await client.channels.fetch(process.env.WELCOME_CHANNEL);
          if (channel) {
            channel.send(
              `Welcome ${member}, we hope you're excited about our Mission.  
We recommend reading the 📖 <#1352724871410618398> to learn more about AstroNADS and a brief summary of what we have here to take advantage of the benefits within our Community.`
            );
          }
        }, 60000);
      } catch (err) {
        console.error(err);
      }
    } else {
      await interaction.reply({ content: "This button has no action.", ephemeral: true });
    }
  }
});

client.login(process.env.TOKEN);
