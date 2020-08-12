module.exports = {
    name: 'help',
    description: 'Help tools',
    execute(message, args){
        message.channel.send(`Commands:
        *don't enter the brackets themselves, ie, !new Yang Gang Fun Times, not !new [Yang Gang Fun Times]

        **!new [Your Episode Title]** == clears data and timer and creates episode called [Your Episode Title]

        **!title [New Title]** == changes title to [New Title] without creating new episode or stopping timer
        
        **!start** == starts a timer for auto-time stamping of !topics. Maximum run time 5 hours.
        
        **!topic** == creates a topic at a) current time stamp if timer active b) at manually entered time stampe if timer not active
        
        **!bullet** == creates a bullet point under current topic for notes, seo, etc.
        
        **!stop** == stops the timer
        
        **!export** == exports episode to text file

        **Typical workflow:**
         1. !new
         2. !start
         3. !topic 1  
                3a. !bullet 1, 2, 3 ... 
         4. !topic 2
                4a. !bullet 1, 2, 3... 
         5. cont add topics and bullets as necessary
         6. !stop
         7. !export



     
        
        `)
        return undefined
    }
    
}