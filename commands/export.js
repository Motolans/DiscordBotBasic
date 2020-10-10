const fs = require('fs')
const path = require('path')
const timer = require('../classes/timer')
const episode = require('../index')
const Discord = require('discord.js')

async function writeToFile(file, payload, newFile){
    if (newFile){
        fs.writeFile(file, payload, err =>{
            
            if (err) {
                console.log("I am error new.")
                throw err
            }
        })
    } else {
        fs.appendFile(file, payload, err =>{
            
            if (err) { 
                console.log("I am error append.")
                throw err
            }
        })
    }

}



module.exports = {
    name: 'export',
    description: 'Export episode to text file!',
    execute(message, args){
        //require Node's native file system
        message.channel.send(`Exporting...`)
        timer.pauseTimer()
        let fileLocation = path.join(__dirname, '../Episode.txt')
        console.log(__dirname)
        let subHeading
        let bulletPoint
        let guest
        let fileString = episode.currentEpisode.getShowName() + ' recorded ' + episode.currentEpisode.getDate() + ' at ' + episode.currentEpisode.getTime() + ' : ' + episode.currentEpisode.getTitle() + '\n\n'
        console.log(fileString)
        fileString = fileString + 'With discussion of the following:\n'
        console.log(episode.currentEpisode.getNumberTimeStamps())
        for (let i = 0; i < episode.currentEpisode.getNumberTimeStamps(); i++){
            subHeading = episode.currentEpisode.getTimeStampOrBullet(i, 0)
            console.log("subheading = " + subHeading)
            fileString = fileString + '\n' + subHeading + '\n'
            
            for (let j = 1; j < episode.currentEpisode.getNumberBulletPoints(i); j++){
            
                bulletPoint = '\t\u2022 ' + episode.currentEpisode.getTimeStampOrBullet(i, j)
                fileString = fileString + bulletPoint + '\n'
                
            }
        }
        fileString = fileString + '\n' + 'Featuring:\n'
        for (let i = 0; i < episode.currentEpisode.getNumberFeaturedGuests(); i++){
            guest = episode.currentEpisode.getFeaturedGuestByIndex(i)
            fileString = fileString + guest + '\n'
        }
        writeToFile(fileLocation, fileString, true).then(
            message.channel.send(new Discord.MessageAttachment(fileLocation, 'Episode.txt'))
        )
        return "export"
    
    }

}        
