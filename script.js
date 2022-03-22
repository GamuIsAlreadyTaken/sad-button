
const $ = e => document.querySelector(e)


const configButton = $('.config')
const configPanel = $('.config-panel')
const cover = $('.cover')

cover.addEventListener('click', ()=>{
  hideModal(configPanel, cover)
})
configButton.addEventListener('click', ()=>{
  showModal(configPanel, cover)
})
const saveButton = $('#saveButton')
const phoneInput = $('#phone')
const messageInput = $('#message')
saveButton.addEventListener('click',()=>{
  saveData(messageInput, phoneInput)
})



function showModal(modal, cover) {
  modal.style = 'transform: scale(1)'
  cover.style = 'display: block'
}
function hideModal(modal, cover) {
  modal.style = ''
  cover.style = ''
}

function parsePhone(phone){
  return phone.replace(/[^0-9]/g, '').replace(/$0+/g, '')
}

const storage = window.localStorage
function getMessage(){
  return storage.getItem('message')
}
function getPhoneNumber(){
  return storage.getItem('phone')
}
function setPhoneNumber(phone){
  storage.setItem('phone', phone)
}
function setMessage(message){
  storage.setItem('message', message)
}

function saveData(messageInput, phoneInput){

  const message = messageInput.value ?? getMessage()
  const phone = phoneInput.value ?? getPhoneNumber()

  setMessage(message)
  setPhoneNumber(phone)
}
function loadData(messageInput, phoneInput){
  messageInput.value = getMessage()
  phoneInput.value = getPhoneNumber()
}

function sendMessage() {
  const number = parsePhone(getPhoneNumber())
  const url_encoded_text = encodeURI(getMessage())

  if(number == '' || url_encoded_text == ''){
    showModal(configPanel, cover)
    return;
  }
  const url = `https://wa.me/${number}?text=${url_encoded_text}`
  alert(url)
  window.open(url,'whatsapp');
}