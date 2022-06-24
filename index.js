const data_test_selector="chat-scrollable-area__message-container"
const messageTextDataAttr = "[data-test-selector=chat-line-message-body]"

const parent = document.querySelector("[data-test-selector=chat-scrollable-area__message-container]")
const withoutMentionMessageTextDataAttr = "[data-a-target=chat-message-text]"

parent.addEventListener("DOMNodeInserted",(e) => {
  const p = e.target
  if(p.getAttribute("data-a-target") === "chat-line-message"){
    const username = p.querySelector("[data-a-target=chat-message-username]").innerText

    //replaceAllImagesWithAlt(p)
    const message = p.querySelector(messageTextDataAttr).innerText.trim()
    console.log("[" + `%c${username}` + "%c] -> " + message,`color: ${rndColor()};`, "color: #000000;")
  }
})

parent.addEventListener("DOMNodeRemoved",(e) => {
  if(e.target.getAttribute("data-test-selector") === "chat-line-message-body"){
  //if(e.target.getAttribute("data-a-target") === "chat-message-text"){
    const messageEl = e.target
    const commonParent = messageEl.parentElement
    const username =commonParent.querySelector("[data-a-target=chat-message-username]").innerText
    const message = messageEl.innerText.trim()

    console.log(`%c ::DELETED:: [${username}] -> ${message}`, 'background: #222; color: #bada55');
  
  }
})

function rndColor(){
  return "#" + Math.round(Math.random() * 16777215).toString(16)
}

function replaceAllImagesWithAlt(parent){
  const allNodes= parent.querySelectorAll("img")
  const all  = [...allNodes]
  all.forEach(el => {
    const alt = el.alt
    const newChild = document.createElement("div")
    newChild.innerText = alt
    parent.replaceChild(newChild, el)
  })
}
  



/*
# the main parent of each chat message
data-a-target=chat-line-message
# actual message text
data-a-target=chat-message-text
#actual username of user
data-a-target=chat-message-username
*/
