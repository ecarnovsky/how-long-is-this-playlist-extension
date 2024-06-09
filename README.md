# How Long is This Playlist?
This browser extension allows you to see the total time it will take you to get through a YouTube playlist. It works on Edge, Chrome, and Firefox. I also made a webpage version that can be accessed [here](https://playlistlengthcalculator.netlify.app/).

## Download
Get it from the Firefox add-on store [here](https://addons.mozilla.org/en-US/firefox/addon/how-long-is-this-playlist/). 
Alternatively, clone this repo and follow browser-specific instructions to uploading.

## How it works
The extension sends a query to the Chrome API to get the HTML from the DOM of the currently active tab. The HTML is then parsed for elements associated with playlist videos. Assuming videos are found, the time strings are then extracted and used to calculate the total playlist length. 

## Features
- Light and dark mode.
- Displays a loading circle and re-queries the page if videos are not immediately found.
  
![A screenshot of the extension](https://github.com/ecarnovsky/ecarnovsky/blob/main/images/playlist-extension.png)

![A screenshot of the extension in light mode](https://github.com/ecarnovsky/ecarnovsky/blob/main/images/playlist-extension-light-mode.png)
