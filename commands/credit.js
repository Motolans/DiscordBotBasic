const episode = require('../index')

module.exports = {
    name: 'credit',
    description: 'Creates a credited guest entry.',
    execute(message, args){
        if (!args.length){
            message.channel.send(`You didn't provide any details, ${message.author}`)
            return undefined
        }

        let output = args.join(' ')

        console.log(output)
        episode.currentEpisode.addFeaturedGuest(output)
        message.channel.send(`${episode.currentEpisode.getTitle()} is now featuring ${episode.currentEpisode.getFeaturedGuestByIndex(episode.currentEpisode.getNumberFeaturedGuests() - 1)}`)

        return "credit"

    }
}