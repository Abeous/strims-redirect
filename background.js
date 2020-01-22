var current_tab;
const setGlobalTab = (tabs) => {
  current_tab = tabs[0];
}


browser.tabs.query({currentWindow: true, active: true}).then(result => { setGlobalTab(result) }, console.error);

const main = () => {
  browser.tabs.query({currentWindow: true, active: true}).then(result => { setGlobalTab(result) }, console.error);

  function redirect(current_tab) {
    var URL = current_tab.url;
    
    if (URL.includes('twitch.tv')) {
      var username = URL.split('.twitch.tv/')
      username.shift()[0]
      browser.tabs.update(current_tab.id, {url: `https://strims.gg/twitch/${username}`})
    } else if (URL.includes('youtube.com') === true  && URL.includes('&list=') !== true) {
      var id = URL.substr(URL.indexOf('watch?v=') + 8)
      browser.tabs.update(current_tab.id, {url: `https://strims.gg/youtube/${id}`})

    }
  }

  
  // had to add delay because it would break if not
  setTimeout(() => {
    redirect(current_tab)
  }, 150);
}

browser.browserAction.onClicked.addListener(main);