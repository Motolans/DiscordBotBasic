module.exports = {
    name: 'mother',
    description: 'Mother!',
    execute(message, args){
        console.log(args)
        message.channel.send('Hello, sweet boys!')
    }
}