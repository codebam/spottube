"use strict";

/*global chrome:false */

browser.browserAction.setBadgeText({ text: "(ツ)" });
browser.browserAction.setBadgeBackgroundColor({ color: "#eae" });

function copyToClipboard(text) {
  const isFirefox = !chrome.app;
  if (isFirefox) {
    navigator.clipboard.writeText(text);
  } else {
    const input = document.createElement("textarea");
    input.style.position = "fixed";
    input.style.opacity = 0;
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand("Copy");
    document.body.removeChild(input);
  }
}

browser.browserAction.onClicked.addListener(() => {
  browser.tabs.query({ active: true }).then((tab) => {
    const key = "AIzaSyA0_xhHQX9BY9DINdzKoFpV0vJgAlj9rAw";
    const request = new Request(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${encodeURIComponent(
        tab[0].title
      )}&key=${key}`
    );
    fetch(request)
      .then((response) => response.json())
      .then((json) => "https://youtu.be/" + json.items[0].id.videoId)
      .then(copyToClipboard)
      .catch(console.log);
  });
});
