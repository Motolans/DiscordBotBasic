module.exports = {
    name: 'export',
    description: 'Export episode to text file!',
    execute(message, args){
        message.channel.send(`Exporting...`)

        return "export"
    }
}