# How Long is This Playlist?
This browser extension allows you to see the total time it will take you to get through a YouTube playlist. It works on Edge, Chrome, and Firefox.

## How it works
It sends a query to the Chrome API to get the HTML from the DOM of the currently active tab. The HTML is then parse for elements associated with playlist videos. Assuming videos are found, the time strings are then extracted and used to calculate the total playlist length. 

![A screenshot of the extension](https://github.com/ecarnovsky/ecarnovsky/blob/main/images/playlist-extension.png)

![A screenshot of the extension in light mode](https://github.com/ecarnovsky/ecarnovsky/blob/main/images/playlist-extension-light-mode.png)
