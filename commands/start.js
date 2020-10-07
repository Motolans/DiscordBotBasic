const timer = require('../classes/timer')

module.exports = {
    name: 'start',
    description: 'Starts timer',
    execute(message, args){
        console.log('timer started')
        timer.startTimer()
        message.channel.send('Timer started')
        return "timer"
    }
}