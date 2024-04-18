
getVideos(0, 3)

/**
 * This is a recursive function. It takes in a counter and the limit it counts to. 
 * If it cannot parse the page and find a playlist, it will wait 1 second, them call
 * itself again, increasing the count by one. If the limit is 
 * reached as no playlist is found, a error message is displayed to the
 * user.
 * @param {Number} count - starts at 0
 * @param {Number} limit - if count goes over this number, the function will stop calling itself
 */
async function getVideos(count, limit){

    let bodyHTML = await getBodyHTML()

    let parser = new DOMParser()
    let doc = parser.parseFromString(bodyHTML, "text/html")
    let videos = doc.querySelectorAll('ytd-playlist-panel-video-renderer')
    if(videos.length === 0){
        videos = doc.querySelectorAll('ytd-playlist-video-renderer')
    }

    if(videos.length >= 1 && videos[videos.length - 1].querySelector('ytd-thumbnail-overlay-time-status-renderer') !== null && videos[videos.length - 1].querySelector('ytd-thumbnail-overlay-time-status-renderer').innerText !== null ){
        if(count > 0){
            document.querySelector('.loader').remove()
        }
        main(videos)
    } else {
        count === 0 ? document.querySelector('body').innerHTML += `<div class="loader"></div>` : null
        if ( count <= limit){
            await setTimeout(() => getVideos(count + 1, limit), 1000)
        } else {
        
            document.querySelector('.loader').remove()
            document.querySelector('main').innerHTML = 
            `<div>
                <span class="color-background">
                    No playlist detected
                </span>
            </div`

            return 
        }
    }
}


/**
 * Main function
 * @param {NodeList} videos - a NodeList of the video element in the playlist taken from the DOM
 */
async function main(videos){


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

    document.querySelector('main').innerHTML = 
        `<div>
            <span>
                Total Time:
            </span>
            <span class="color-background">
                ${playlistTime.getTimeString()}
            </span>
        </div>
        `
    
    
}


/**
 * @returns The HTML inside the body of the currenly active page.
 */
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


