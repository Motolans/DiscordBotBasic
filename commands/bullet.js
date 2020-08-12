module.exports = {
    name: 'bullet',
    description: 'Creates a bullet point!',
    execute(message, args){
        if (!args.length){
            message.channel.send(`You didn't provide any details, ${message.author}`)
            return undefined
        } 

        
        let output = args.join(' ')   
        return output
    }
}