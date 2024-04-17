/**
 * This class stores variables related to the total time of the playlist.
 */
class PlaylistTime{

    /**
     * Constructor
     * @param {Number} seconds - The total number of seconds in the playlist.
     */
    constructor(seconds){

        const SECONDS_IN_DAY = 86400
        const SECONDS_IN_HOUR = 3600
        const SECONDS_IN_MINUTE = 60


        /**
         * Total number of hours in the playlist, rounded to one decimal place.
         */
        this._estimatedHours = (seconds / SECONDS_IN_HOUR).toFixed(1)



        /**
         * This object stores a days, hours, minutes, and seconds field that can be used to 
         * show the user a detailed overview of how much time it will take 
         * to watch the playlist.
         */
        this._detailedTimeInfo = {}

        this._detailedTimeInfo._days = Math.trunc(seconds / SECONDS_IN_DAY) 
        seconds -= this._detailedTimeInfo._days * SECONDS_IN_DAY

        this._detailedTimeInfo._hours = Math.trunc(seconds / SECONDS_IN_HOUR) 
        seconds -= this._detailedTimeInfo._hours * SECONDS_IN_HOUR

        this._detailedTimeInfo._minutes = Math.trunc(seconds / SECONDS_IN_MINUTE) 
        seconds -= this._detailedTimeInfo._minutes * SECONDS_IN_MINUTE

        this._detailedTimeInfo._seconds = seconds

    }

    /**
     * @returns {Number} - Total number of hours in the playlist, rounded to one decimal place.
     */
    getEstimatedHours(){

        return this._estimatedHours

    }

    /**
     * Makes a copy of the _detailedTimeInfo field and returns it.
     * @returns {Object} - An object with a days, hours, minutes, and seconds
     * fields that can be used to inform users.
     */
    getDetailedTimeInfo(){

        let timeInfoCopy = {}

        for (let property in this._detailedTimeInfo) {

            timeInfoCopy[property] = this._detailedTimeInfo[property]

        }

        return timeInfoCopy

    }

}