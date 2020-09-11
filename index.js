


//require Node's native file system
const fs = require('fs')

//require the discord.js module
const Discord = require('discord.js')

//require config file
const { prefix, token } = require('./config.json')

//create a new discord client
const client = new Discord.Client()

//extends JS's native Map class, adds functionality
client.commands = new Discord.Collection()

//returns an array of all file names ending with js
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

const Episode = require('./classes/episode.js')

for (const file of commandFiles){
    const command = require(`./commands/${file}`)

    //set a new item in the Collection
    //with the key as the command name and the value as the exported module
    client.commands.set(command.name, command)
}



let commandOutput
let timer
let timerActive = false
let seconds = 0
let minutes = 0
let hours = 0

let currentEpisode = new Episode.Episode('Untitled')
//console.log(currentEpisode.getTitle)

function tick() {
    seconds++
    module.exports.seconds = seconds
    console.log(seconds)
    if (seconds === 60){
        seconds = 0
        minutes++
        module.exports.seconds = seconds
        module.exports.minutes = minutes
        console.log(displayTime(hours, minutes, seconds))
        if (minutes === 60){
            minutes = 0
            hours++
            module.exports.minutes = minutes
            module.exports.hours = hours
            if (hours >= 5){
                clearInterval(timer)
                timerActive = false
                seconds = 0
                minutes = 0
                hours = 0
                module.exports.seconds = seconds
                module.exports.minutes = minutes
                module.exports.hours = hours
                module.exports.timerActive = timerActive
            }
        } 
    }
}

function displayTime(hours, minutes, seconds){
    let formattedMinutes
    let formattedSeconds
    if (seconds < 10){
        formattedSeconds = `0${seconds.toString()}`
    } else {
        formattedSeconds = seconds.toString()
    }
    if (minutes < 10){
        formattedMinutes = `0${minutes.toString()}`
    } else {
        formattedMinutes = minutes.toString()
    }
    return `0${hours.toString()}:${formattedMinutes}:${formattedSeconds}`
} 

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

//when the client is ready, run the attached callback function
client.once('ready', () => {
    console.log('Ready!')
})

client.on('message', message => {
    //console.log("on message")
    if (!message.content.startsWith(prefix) || message.author.bot) return
   
    const args = message.content.slice(prefix.length).trim().split(/ +/)
   
    const command = args.shift().toLowerCase()

    //search command list for a match, bail if none found.
    if(!client.commands.has(command)) return

    try {
        //get command and execute it.
        commandOutput = client.commands.get(command).execute(message,args)
        if (commandOutput !== undefined){
            if (command==="new"){
                console.log(commandOutput)
                let time = commandOutput.pop()
                let date = commandOutput.pop()
                let title = commandOutput.join(' ')
                seconds = 0
                minutes = 0
                hours = 0
                module.exports.seconds = seconds
                module.exports.minutes = minutes
                module.exports.hours = hours
                currentEpisode = new Episode.Episode(title)
                currentEpisode.setDate(date)
                currentEpisode.setTime(time)
                currentEpisode.resetTimeStamp()
                console.log(`Successfully set Title: ${currentEpisode.getTitle()} and Date: ${currentEpisode.getDate()} at Time:${currentEpisode.getTime()}`)
            } else if (command==="title"){
                currentEpisode.setTitle(commandOutput)
                console.log(`Changed title to: ${currentEpisode.getTitle()}`)
            } else if (command==="topic") {
                currentEpisode.addTimeStamp(commandOutput)
                currentEpisode.resetBulletPoint()
                currentEpisode.showAllTimeStamps()
            } else if (command==="bullet") {
                if (currentEpisode.isTimeStampsEmpty()){
                    message.channel.send(`You must add at least one topic before you can add a bullet point.`)
                } else {
                    currentEpisode.addBulletPoint(commandOutput)
                    message.channel.send(`New bullet point:" ${commandOutput} " created under " ${currentEpisode.getCurrentTimeStamp()} "`)
                    currentEpisode.showAllTimeStamps()
                }
                
            } else if (command==="start"){
                console.log("timer")
                timerActive = true
                timer = setInterval(tick, 1000)
                module.exports.timerActive = timerActive
            } else if (command==="stop"){
                clearInterval(timer)
                timerActive = false
                module.exports.minutes = minutes
                module.exports.hours = hours
                module.exports.timerActive = timerActive
            } else if (command==="credit") {
                console.log(commandOutput)
                currentEpisode.addFeaturedGuest(commandOutput)
                message.channel.send(`${currentEpisode.getTitle()} is now featuring ${currentEpisode.getFeaturedGuestByIndex(currentEpisode.getNumberFeaturedGuests() - 1)}`)

            } else if (command==="export"){
                let fileLocation = __dirname + '/Episode.txt'
                let subHeading
                let bulletPoint
                let guest
                clearInterval(timer)
                timerActive = false
                let fileString = currentEpisode.getShowName() + ' recorded ' + currentEpisode.getDate() + ' at ' + currentEpisode.getTime() + ' : ' + currentEpisode.getTitle() + '\n\n'
                console.log(fileString)
                fileString = fileString + 'With discussion of the following:\n'
                console.log(currentEpisode.getNumberTimeStamps())
                for (let i = 0; i < currentEpisode.getNumberTimeStamps(); i++){
                    subHeading = currentEpisode.getTimeStampOrBullet(i, 0)
                    console.log("subheading = " + subHeading)
                    fileString = fileString + '\n' + subHeading + '\n'
                    
                    for (let j = 1; j < currentEpisode.getNumberBulletPoints(i); j++){
                    
                        bulletPoint = '\t\u2022 ' + currentEpisode.getTimeStampOrBullet(i, j)
                        fileString = fileString + bulletPoint + '\n'
                        
                    }
                }
                fileString = fileString + '\n' + 'Featuring:\n'
                for (let i = 0; i < currentEpisode.getNumberFeaturedGuests(); i++){
                    guest = currentEpisode.getFeaturedGuestByIndex(i)
                    fileString = fileString + guest + '\n'
                }
                writeToFile(fileLocation, fileString, true).then(
                    message.channel.send(new Discord.MessageAttachment('./Episode.txt', 'Episode.txt'))
                )
            }
        }
        //console.log(commandOutput)
    } catch (error) {
        console.error("Bottom loop error " + error)
        console.log(error.stack)
       
        message.reply(`there was an error trying to execute that command!`)
    }

})
//console.log(currentEpisode.getTimeStampOrBullet(0,0))

module.exports.minutes = minutes
module.exports.hours = hours
module.exports.seconds = seconds
module.exports.timerActive = timerActive
module.exports.displayTime = displayTime
module.exports.currentEpisode = currentEpisode

//login to server using token
client.login(token)