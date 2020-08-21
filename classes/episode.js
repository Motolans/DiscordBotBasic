//this class represents a single episode's worth of data. 

class Episode {
    #title = ``
    #showName = 'Yang Gang Round Table'
    #date = ``
    #time = ``
    #stampIndex = -1
    #subIndex = 0
    #timeStamps = []
    #featuring = []

    setTitle(title) {
        this.#title = title
    }

    getTitle() {
        return this.#title
    }

    getShowName() {
        return this.#showName
    }

    setDate(date) {
        this.#date = date
    }

    getDate() {
        return this.#date
    }

    setTime(time) {
        this.#time = time
    }

    getTime(){
        return this.#time
    }

    iterateTimeStamp(){
        this.#stampIndex++
    }

    resetTimeStamp(){
        this.#stampIndex = 0
    }

    iterateBulletPoint(){
        this.#subIndex++
    }

    resetBulletPoint(){
        this.#subIndex = 0
    }

    getIndex(){
        return this.#stampIndex
    }
    
    getSubIndex() {
        return this.#subIndex
    }

    addTimeStamp(stamp){
        this.#timeStamps.push([stamp])
    }

    addBulletPoint(point){
        this.#timeStamps[this.#timeStamps.length - 1].push(point)
    }

    getTimeStampOrBullet(indexOne, indexTwo){
        return this.#timeStamps[indexOne][indexTwo]
    }

    showAllTimeStamps(){
        console.log(this.#timeStamps)
    }

    getCurrentTimeStamp(){
        return this.#timeStamps[this.#timeStamps.length - 1][0]
    }

    getNumberTimeStamps(){
        return this.#timeStamps.length
    }

    getNumberBulletPoints(index){
        return this.#timeStamps[index].length
    }

    isTimeStampsEmpty(){
        if (!this.#timeStamps.length){
            return true
        } else {
            return false
        }
        
    }

    addFeaturedGuest(payload){
        console.log('Me payload = ' + payload)
        this.#featuring.push(payload)
    }

    getFeaturedGuestByIndex(index){
        return this.#featuring[index]
    }

    getNumberFeaturedGuests(){
        return this.#featuring.length 
    }

    showAllFeaturedGuests(){
        return this.#featuring
    }

    constructor(title){
        this.#title = title
    }

}

module.exports.Episode = Episode