//require Node's native file system
const fs = require('fs')

module.exports = {
    name: 'father',
    description: 'Father!',
    execute(message, args){
        message.channel.send(`What is ... FATH-OR?`)
        fs.appendFile('output.txt', `I made output`, err =>{
            if (err) throw err
        })
    }
}