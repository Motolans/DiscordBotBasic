

module.exports = {
    name: 'credit',
    description: 'Creates a credited guest entry.',
    execute(message, args){
        if (!args.length){
            message.channel.send(`You didn't provide any details, ${message.author}`)
            return undefined
        } 

        return args.join(' ')

    }
}