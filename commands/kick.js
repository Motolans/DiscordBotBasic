module.exports = {
    name: 'kick',
    description: 'Kick!',
    execute(message, args){
        if (!message.mentions.users.size){
            return message.reply(`You didn't snitch on anyone!`)
        }
        //grab the first mentioned user in the message
        //return a user object
        const taggedUser = message.mentions.users.first()

        message.channel.send(`You snitched on: ${taggedUser.username}`)
    }
}