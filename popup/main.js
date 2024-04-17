
window.onload = start

async function start(){

    let bodyHTML = await getBodyHTML()

    let parser = new DOMParser()
    let doc = parser.parseFromString(bodyHTML, "text/html")
    let videos = doc.querySelectorAll('ytd-playlist-panel-video-renderer')

    if(videos.length === 0){
        
        document.querySelector('main').innerHTML = 
        `<div>
            <span>
                No playlist detected
            </span>
        </div`

        return
    }


   let totalVideoSeconds = 0

    videos.forEach((element) => {
        let timeStr = element.querySelector('ytd-thumbnail-overlay-time-status-renderer').innerText

        let timeArr = timeStr.split('\n')[0].split(':')

        for(let i = 0; i < timeArr.length; i++){

            if(i === 0){
                totalVideoSeconds += Number(timeArr[timeArr.length - 1 - i])
            } else if (i === 1){
                totalVideoSeconds += Number(timeArr[timeArr.length - 1 - i]) * 60
            } else {
                totalVideoSeconds += Number(timeArr[timeArr.length - 1 - i]) * 3600
            }
        }
    })


    let playlistTime = new PlaylistTime(totalVideoSeconds)
    let playlistTimeInfo = playlistTime.getDetailedTimeInfo()

    document.querySelector('main').innerHTML = 
        `<div>
            <span>
                Total Time:
            </span>
            <span>
                ${playlistTime.getEstimatedHours()} hours
            </span>
        </div>
        <div>
            <span>
                That is exactly
            </span>
            <span>
                ${playlistTimeInfo._days} days, ${playlistTimeInfo._hours} hours, ${playlistTimeInfo._minutes} minutes, and ${playlistTimeInfo._seconds} seconds
            </span>
        </div>
        `
    
    
}



function getBodyHTML(){

    return chrome.tabs.query({ active: true, currentWindow: true }).then(function(tabs){
        return chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: ( () => {
                return document.querySelector("body").innerHTML
            } ),
        })
    }).then(function (results) {
        let bodyHTML = results[0].result
       return bodyHTML
    }).catch(function (error) {
        console.log('And error has occurred: ' + error.message)
    })
}
