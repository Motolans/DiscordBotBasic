
 const timer = require('../classes/timer')
 const currentEpisode = require('../index')
 const Episode = require('../classes/episode')
 let timeSet
 let date
 let title 

 

module.exports = {
    name: 'new',
    description: 'New Episode!',
    execute(message, args){
        timer.resetTimer()
        let outMessage = args.join(' ')
        console.log(outMessage)
        let output = [...args]
        let today = new Date()
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        let time = today.toLocaleTimeString()
        today = mm + '/' + dd + '/' + yyyy;
        output.push(today)
        output.push(time)
        message.channel.send(`Logged new episode title: ${outMessage} on ${today} at ${time}.`)
        timeSet = output.pop()
        date = output.pop()
        title = output.join(' ')
        currentEpisode.currentEpisode = new Episode.Episode(title)
        currentEpisode.currentEpisode.setDate(date)
        currentEpisode.currentEpisode.setTime(timeSet)
        currentEpisode.currentEpisode.resetTimeStamp()
        console.log(`Successfully set Title: ${currentEpisode.currentEpisode.getTitle()} and Date: ${currentEpisode.currentEpisode.getDate()} at Time:${currentEpisode.currentEpisode.getTime()}`)
        //return output
        return "new"
    }
}