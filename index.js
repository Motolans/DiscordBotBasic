


const fs = require('fs')

//require the discord.js module
const Discord = require('discord.js')

//require config file
const { prefix, token } = require('./config.json')

//create a new discord client
const client = new Discord.Client()

//extends JS's native Map class, adds functionality
client.commands = new Discord.Collection()

//returns an array of all file names ending with js
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

const Episode = require('./classes/episode.js')

for (const file of commandFiles){
    const command = require(`./commands/${file}`)

    //set a new item in the Collection
    //with the key as the command name and the value as the exported module
    client.commands.set(command.name, command)
}

let commandOutput
let currentEpisode = new Episode.Episode('Untitled')
//console.log(currentEpisode.getTitle)
//when the client is ready, run the attached callback function
client.once('ready', () => {
    console.log('Ready!')
})

client.on('message', message => {
    //console.log("on message")
    if (!message.content.startsWith(prefix) || message.author.bot) return
   
    const args = message.content.slice(prefix.length).trim().split(/ +/)
   
    const command = args.shift().toLowerCase()

    //search command list for a match, bail if none found.
    if(!client.commands.has(command)) return

    try {
        //get command and execute it.
        commandOutput = client.commands.get(command).execute(message,args)
 
        console.log(commandOutput)
    } catch (error) {
        console.error("Bottom loop error " + error)
        console.log(error.stack)
       
        message.reply(`there was an error trying to execute that command!`)
    }

})
//console.log(currentEpisode.getTimeStampOrBullet(0,0))
module.exports.currentEpisode = currentEpisode

//login to server using token
client.login('NzI4MDUzNjE5NDAzOTE1MjY1.Xv0yxQ.0VquJ952nHSauPrhT4zaFuUwbLU')
//client.login(process.env.TOKEN)