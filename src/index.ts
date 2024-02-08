import { Client, IntentsBitField } from "discord.js";
import OpenAI from "openai";
import Summariser from "./summariser";


const openai = new OpenAI({
    apiKey: ""
})

const summariser = new Summariser(openai)

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
});


client.on("messageCreate", async msg => {
    if (msg.content.length > 350 && !msg.author.bot) {
        const response = await summariser.summarise(msg.content)
        msg.reply({content: response,  allowedMentions: { repliedUser: false }});
    }

});

client.login("");