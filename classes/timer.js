let timer
let timerActive = false
let seconds = 0
let minutes = 0
let hours = 0

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

function startTimer(){
    timerActive = true
    timer = setInterval(tick, 1000)
    module.exports.timerActive = timerActive
   
}

function pauseTimer(){
    clearInterval(timer)
    timerActive = false
    module.exports.timerActive = timerActive
    
}

function resetTimer(){
    seconds = 0
    minutes = 0
    hours = 0
}

module.exports.startTimer = startTimer
module.exports.pauseTimer = pauseTimer
module.exports.resetTimer = resetTimer
module.exports.displayTime = displayTime
module.exports.timer = timer
module.exports.seconds = seconds
module.exports.minutes = minutes
module.exports.hours = hours
module.exports.timerActive = timerActive