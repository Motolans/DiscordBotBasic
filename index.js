

//require Node's native file system
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

for (const file of commandFiles){
    const command = require(`./commands/${file}`)

    //set a new item in the Collection
    //with the key as the command name and the value as the exported module
    client.commands.set(command.name, command)
}

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
        client.commands.get(command).execute(message,args)
    } catch (error) {
        console.error(error)
        message.reply(`there was an error trying to execute that command!`)
    }

})



/*

client.on('message', message => {
    //exit early if there's no prefix, or it's from a bot.
    if(!message.content.startsWith(prefix) || message.author.bot) return

    //break message into an array by word, remove the prefix
    const args = message.content.slice(prefix.length).split(/ +/)

    //snip position 0 and return it.
    const command = args.shift().toLowerCase()

	if(command === `mother`){
        // when condition met, send message
        message.channel.send('Hello, sweet boys!')
    } else if (command === `father`){
        message.channel.send(`What is this ... FATH-OR?`)
    } else if (command === `server`){
        message.channel.send(`This server is: ${message.guild.name}\n
        Number of Boys: ${message.guild.memberCount}
        
        `)
    } else if (command === 'kick'){
        if (!message.mentions.users.size){
            return message.reply(`You didn't snitch on anyone!`)
        }
        //grab the first mentioned user in the message
        //return a user object
        const taggedUser = message.mentions.users.first()

        message.channel.send(`You snitched on: ${taggedUser.username}`)

    } else if (command === 'avatar'){
        if (!message.mentions.users.size){
            return message.channel.send(`Your avatar: <${message.author.displayAvatarURL({format: "png", dynamic: true})}>`)
        }

        const avatarList = message.mentions.users.map(user => {
            return `${user.username}'s avatar: <${user.displayAvatarURL({ format: "png", dynamic: true})}>`
        })

        message.channel.send(avatarList)
    
    } else if (command === 'prune'){
        const amount = parseInt(args[0] + 1)
        console.log(amount)
        
        if (isNaN(amount)){
            return message.reply(`that doesn\'t seem to be a valid number.`)
        } else if (amount <= 1 || amount > 100) {
            return message.reply('you need to input a number between 1 and 99.');
        }

        message.channel.bulkDelete(amount, true).catch(err=> {
            console.log(err)
            message.channel.send(`there was an error trying to prune messages in this channel.`)
        })

    } else if (message.content === `user-info`){
        message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`)
    } else if (command === 'args-info'){
        if (!args.length){
            return message.channel.send(`You didn't provide any arguments, ${message.author}`)
        } else if (args[0]==='foo'){
            return message.channel.send('bar')
        }

        message.channel.send(`Command name: ${command}\nArguments: ${args}`)
    }

});
*/

//login to server using token
client.login(token)