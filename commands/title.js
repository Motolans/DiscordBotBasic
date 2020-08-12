module.exports = {
    name: 'title',
    description: 'Change Title!',
    execute(message, args){
        let output = args.join(' ')
        message.channel.send(`Changed episode title: ${output}`)
        return output
    }
}