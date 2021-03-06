const timer = require('../classes/timer.js')
const episode = require('../index')



//what if we put all the timer components here? Are they actually needed anywhere else?

module.exports = {
    name: 'topic',
    description: 'Create a topic time stamp!',
    execute(message, args){
        if (!args.length){
            message.channel.send(`You didn't provide any details, ${message.author}`)
            return undefined
        } 
        
        let timeStamp = [...args]
        let time
        console.log(timer.minutes)
        if (!timer.timerActive){
            time = timeStamp.shift()
            let pattern = /^\d{2}:\d{2}:\d{2}/
            let pass = pattern.test(time)
            if (!pass){
            
                message.channel.send(`Timer is not active. Use '--:--:--' time stamp as first argument to manually enter time stamp.`)
                return undefined
            }
        } else {
            time = timer.displayTime(timer.hours, timer.minutes, timer.seconds)
            args.unshift(time)
        }
        
        let output = args.join(' ')
        episode.currentEpisode.addTimeStamp(output)
        episode.currentEpisode.resetBulletPoint()
        episode.currentEpisode.showAllTimeStamps()
        message.channel.send(`New topic created at: ${episode.currentEpisode.getCurrentTimeStamp()}`)
        return output
    }
}