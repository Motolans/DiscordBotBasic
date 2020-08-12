module.exports = {
    name: 'stop',
    description: 'Stops timer',
    execute(message, args){
        message.channel.send('Timer stopped')
        return "timer"
    }
}