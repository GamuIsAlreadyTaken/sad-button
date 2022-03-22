
const $ = e => document.querySelector(e)
registerServiceWorker()


const configButton = $('.config')
const configPanel = $('.config-panel')
const cover = $('.cover')
console.log(configButton, configPanel, cover)

cover.addEventListener('click', () => {
  hideModal(configPanel, cover)
})
configButton.addEventListener('click', () => {
  showModal(configPanel, cover)
})
const saveButton = $('#saveButton')
const phoneInput = $('#phone')
const messageInput = $('#message')
saveButton.addEventListener('click', () => {
  saveData(messageInput, phoneInput)
  hideModal(configPanel, cover)
})



async function registerServiceWorker() {
  if (!'serviceWorker' in navigator) return;
  if (await navigator.serviceWorker.getRegistration('/')) {
    console.log('Already registered')
    return
  }
  const registration = await navigator.serviceWorker.register('sw.js')
  console.log("Registrado correctamente", registration.scope)
}



function showModal(modal, cover) {
  modal.style = 'transform: scale(1)'
  cover.style = 'display: block'
}
function hideModal(modal, cover) {
  modal.style = ''
  cover.style = ''
}

function parsePhone(phone) {
  if (phone == null)
    return ''
  return phone.replace(/[^0-9]/g, '').replace(/$0+/g, '')
}

const storage = window.localStorage
function getMessage() {
  return storage.getItem('message')
}
function getPhoneNumber() {
  return storage.getItem('phone')
}
function setPhoneNumber(phone) {
  storage.setItem('phone', phone)
}
function setMessage(message) {
  storage.setItem('message', message)
}

function saveData(messageInput, phoneInput) {

  const message = messageInput.value ?? getMessage()
  const phone = phoneInput.value ?? getPhoneNumber()

  setMessage(message)
  setPhoneNumber(phone)
}
function loadData(messageInput, phoneInput) {
  messageInput.value = getMessage()
  phoneInput.value = getPhoneNumber()
}loadData(messageInput, phoneInput)

function sendMessage() {
  const number = parsePhone(getPhoneNumber())
  const url_encoded_text = encodeURI(getMessage())

  if (number == '' || url_encoded_text == '') {
    showModal(configPanel, cover)
    return;
  }
  const url = `https://wa.me/${number}?text=${url_encoded_text}`
  window.open(url, 'whatsapp');
}