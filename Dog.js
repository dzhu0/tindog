class Dog {
    constructor(data) {
        Object.assign(this, data)
    }

    getProfileHtml() {
        const {name, avatar, age, bio} = this

        return `
            <img
                class="avatar"
                src="${avatar}"
                alt="User's avatar picture">
            <div class="info">
                <h1 class="name-age">${name}, ${age}</h1>
                <p class="bio">${bio}</p>
            </div>`
    }

    reject() {
        this.hasBeenSwiped = true
        this.hasBeenLiked = false
    }

    accept() {
        this.hasBeenSwiped = true
        this.hasBeenLiked = true
    }

    getObject() {
        return this
    }
}

export default Dog
