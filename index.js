import dogData from './data.js'
import Dog from './Dog.js'

const data = JSON.parse(localStorage.getItem('dogData')) || dogData

const profile = document.getElementById('profile')
const rejectBtn = document.getElementById('reject-btn')
const acceptBtn = document.getElementById('accept-btn')

let index = 0
let dog = getNewDog()

rejectBtn.addEventListener('click', reject)
acceptBtn.addEventListener('click', accept)

render()

function render() {
    profile.innerHTML = dog.getProfileHtml()

    if (dog.hasBeenLiked) {
        rejectBtn.classList.remove('rejected')
        acceptBtn.classList.add('accepted')
        profile.innerHTML += getBadgeHtml()
    } else if (dog.hasBeenSwiped) {
        rejectBtn.classList.add('rejected')
        acceptBtn.classList.remove('accepted')
        profile.innerHTML += getBadgeHtml()
    }
}

function reject() {
    dog.reject()
    handleBtnClick()
}

function accept() {
    dog.accept()
    handleBtnClick()
}

function handleBtnClick() {
    render()
    
    rejectBtn.classList.add('disabled')
    acceptBtn.classList.add('disabled')

    setTimeout(() => {
        rejectBtn.classList.remove('disabled')
        acceptBtn.classList.remove('disabled')
        dog = getNewDog()
        render()
    }, 1000);

    data[index++] = dog.getObject()
    localStorage.setItem('dogData', JSON.stringify(data))
}

function getBadgeHtml() {
    const badge = dog.hasBeenLiked ?
        "./images/badge-like.png" :
        "./images/badge-nope.png"

    return `
        <img
            class="badge"
            src="${badge}"
            alt="A badge of accept or reject">`
}

function getNewDog() {
    if (index === data.length) {
        index = 0
    }

    return new Dog(data[index])
}
