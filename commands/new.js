

module.exports = {
    name: 'new',
    description: 'New Episode!',
    execute(message, args){
        let outMessage = args.join(' ')
        console.log(outMessage)
        let output = [...args]
        let today = new Date()
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
        output.push(today)
        message.channel.send(`Logged new episode title: ${outMessage} on ${today}`)
        return output
    }
}