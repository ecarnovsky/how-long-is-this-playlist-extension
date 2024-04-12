
window.onload = start

async function start(){
    console.log(await getBodyHTML())
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
