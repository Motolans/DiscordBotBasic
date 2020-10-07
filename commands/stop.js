const timer = require('../classes/timer')

module.exports = {
    name: 'stop',
    description: 'Stops timer',
    execute(message, args){
        console.log('timer paused')
        timer.pauseTimer()
        message.channel.send(`Timer stopped`)
        return "timer"
    }
}