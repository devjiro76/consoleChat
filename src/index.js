import chromeColorLog from 'chromeColorLog'
import asciify from 'asciify-aalib'
import html2canvas from 'html2canvas'
import firebase from './firebase'

// # Firebase setting
let userId
firebase.auth().signInAnonymously()
.then(res => {
  userId = res.user.uid
})

const db = firebase.firestore()
const chatRef = db.collection('/hat')

chatRef
  .onSnapshot(snapshot => {
    snapshot.forEach(doc => {
      const data = doc.data()

      if (data.image) {
        chromeColorLog(data.image)
      } else {
        console.log(`${data.userId || 'Annony'}: "${data.content}"`)
      }
    })
  })

const send = (_content) => {
  const urlReg = /^https?:\/\/.*?/
  let content = _content

  if (urlReg.test(_content)) {
    try {
      const img = new Image()
      img.src = _content
      img.onload = () => {
        const wrapper = document.createElement('div')
        wrapper.style.cssText = `
          position: absolute;
          height: 1px;
          bottom: -50px;
          overflow: hidden;
        `
        const container = document.createElement('div')

        document.body.appendChild(wrapper)
        wrapper.appendChild(container)
        container.appendChild(img)

        html2canvas(container, {
          useCORS: false,
          allowTaint: false,
        })
        .then(cvs => {
          cvs.toBlob(blob => {
            const url = URL.createObjectURL(blob)
            console.log('url: ', url)
            handler(url)
          })
        })
      }
    } catch (e) {
  
    }
  }
}
function handler(url) {
  const newChat = chatRef.doc()
  const newChatId = newChat.id
  const asiiImage = new asciify(url)

  asiiImage.ascii()
    .then(pre => {
        newChat.set({
          id: newChatId,
          userId,
          image: pre.outerHTML
        })
    })
}

const func = {
  send,
}

window.devchat = func