const episode = require('../index')

module.exports = {
    name: 'bullet',
    description: 'Creates a bullet point!',
    execute(message, args){
        if (!args.length){
            message.channel.send(`You didn't provide any details, ${message.author}`)
            return undefined
        } 

        
        let output = args.join(' ')   
        
        if (episode.currentEpisode.isTimeStampsEmpty()){
            message.channel.send(`You must add at least one topic before you can add a bullet point.`)
        } else {
            episode.currentEpisode.addBulletPoint(output)
            message.channel.send(`New bullet point:" ${output} " created under " ${episode.currentEpisode.getCurrentTimeStamp()} "`)
            episode.currentEpisode.showAllTimeStamps()
        }
        return "bullet"
    }
}