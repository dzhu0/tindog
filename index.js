import data from './data.js'
import Dog from './Dog.js'

const dogs = JSON.parse(localStorage.getItem('tindog-dogs')) || data

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

    rejectBtn.classList.remove('rejected')
    acceptBtn.classList.remove('accepted')

    if (dog.hasBeenLiked) {
        acceptBtn.classList.add('accepted')
        profile.innerHTML += getBadgeHtml()
    } else if (dog.hasBeenSwiped) {
        rejectBtn.classList.add('rejected')
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

    rejectBtn.disabled = true
    acceptBtn.disabled = true

    setTimeout(() => {
        rejectBtn.disabled = false
        acceptBtn.disabled = false
        dog = getNewDog()
        render()
    }, 1000);

    dogs[index++] = dog.getObject()
    localStorage.setItem('tindog-dogs', JSON.stringify(dogs))
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
    if (index === dogs.length) {
        index = 0
    }

    return new Dog(dogs[index])
}
