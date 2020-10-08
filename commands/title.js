const episode = require('../index')

module.exports = {
    name: 'title',
    description: 'Change Title!',
    execute(message, args){
        let output = args.join(' ')
        episode.currentEpisode.setTitle(output)
        console.log(`Changed title to: ${episode.currentEpisode.getTitle()}`)
        message.channel.send(`Changed episode title: ${episode.currentEpisode.getTitle()}`)
        return "output"
    }
}