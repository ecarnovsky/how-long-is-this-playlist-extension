
class PlaylistTime{

    /**
     * Constructor
     * @param {Number} secondsInPlaylist - The total number of seconds in the playlist.
     */
    constructor(secondsInPlaylist){

        this._secondsInPlaylist = secondsInPlaylist

    }

    /**
     * @returns {String} - A formatted string containing the number of hours and minutes in the playlist.
     */
    getTimeString(){

        const SECONDS_IN_HOUR = 3600
        const SECONDS_IN_MINUTE = 60

        let numberOfHours = Math.trunc(this._secondsInPlaylist / SECONDS_IN_HOUR) 

        let numberOfMinutes = Math.round((this._secondsInPlaylist  - (numberOfHours * SECONDS_IN_HOUR)) / SECONDS_IN_MINUTE)

        return `${numberOfHours} h ${numberOfMinutes} m`
    }
}