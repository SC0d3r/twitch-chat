// config variables
let _config = {
  allMessages: 1, // 1 means show all the chat messages
  deletedMessages: 1,
  sound: 0,
  clear: 1
}

// this try checks if user has allready defined his own
// config
try{
  // so user can use his own config
  // before running this program in console
  _config = {..._config, ...config}
}catch(e){}

 const beep = new Audio(
'https://media.geeksforgeeks.org/wp-content/uploads/20190531135120/beep.mp3');
beep.volume = 0.1;

const data_test_selector="chat-scrollable-area__message-container"
const messageTextDataAttr = "[data-test-selector=chat-line-message-body]"

const parent = document.querySelector("[data-test-selector=chat-scrollable-area__message-container]")
const withoutMentionMessageTextDataAttr = "[data-a-target=chat-message-text]"

if(_config.allMessages)
  parent.addEventListener("DOMNodeInserted",(e) => {
    const p = e.target
    if(p.getAttribute("data-a-target") === "chat-line-message"){
      const username = p.querySelector("[data-a-target=chat-message-username]").innerText

      //replaceAllImagesWithAlt(p)
      const message = p.querySelector(messageTextDataAttr).innerText.trim()
      console.log("[" + `%c${username}` + "%c] -> " + message,`color: ${rndColor()}; font-weight: bold;`, "color: #000000;")
    }
  })

if(_config.deletedMessages)
  parent.addEventListener("DOMNodeRemoved",(e) => {
    if(e.target.getAttribute("data-test-selector") === "chat-line-message-body"){
      if(_config.sound)
        beep.play()

      const messageEl = e.target
      const commonParent = messageEl.parentElement
      const username =commonParent.querySelector("[data-a-target=chat-message-username]").innerText
      const message = messageEl.innerText.trim()

      console.log(`%c ::DELETED:: [${username}] -> ${message}`, 'background: #222; color: #bada55');
    
    }
  })

function rndColor(){
  const colors = ["#c0392b","#8e44ad","#d63031", "#2d3436" , "#130f40", "#4834d4",
  "#009432", "#1B1464", "#6F1E51", "#EE5A24", "#ffa801"]
  const rndIndex = Math.floor(Math.random() * colors.length)
  //return "#" + Math.round(Math.random() * 16777215).toString(16)
  return colors[rndIndex]
}

if(_config.clear) console.clear()
/*
# the main parent of each chat message
data-a-target=chat-line-message
# actual message text
data-a-target=chat-message-text
#actual username of user
data-a-target=chat-message-username
*/
