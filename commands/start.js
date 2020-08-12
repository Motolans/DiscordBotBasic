module.exports = {
    name: 'start',
    description: 'Starts timer',
    execute(message, args){
        message.channel.send('Timer started')
        return "timer"
    }
}