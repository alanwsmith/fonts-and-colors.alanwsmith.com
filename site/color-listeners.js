const handleBackgroundColorChange = (event) => {
    document.body.style.backgroundColor = event.detail.hsla
    document.getElementById('background-color-string').value = event.detail.hsla
}

const handleTextColorChange = (event) => {
    document.body.style.color = event.detail.hsla
    document.getElementById('text-color-string').value = event.detail.hsla
}

const handleHeaderColorChange = (event) => {
    const h1s = document.getElementsByTagName('h1')
    for (let i = 0; i < h1s.length; i++) {
        h1s[i].style.color = event.detail.hsla
    }
    document.getElementById('header-color-string').value = event.detail.hsla
}

const handleH2ColorChange = (event) => {
    const h2s = document.getElementsByTagName('h2')
    for (let i = 0; i < h2s.length; i++) {
        h2s[i].style.color = event.detail.hsla
    }
    document.getElementById('h2-color-string').value = event.detail.hsla
}

const handleLinksColorChange = (event) => {
    const links = document.getElementsByTagName('a')
    for (let i = 0; i < links.length; i++) {
        links[i].style.color = event.detail.hsla
    }
    document.getElementById('links-color-string').value = event.detail.hsla
}

const initialize = () => {
    document
        .getElementById('background-color-picker')
        .addEventListener('color-changed', handleBackgroundColorChange)

    document
        .getElementById('text-color-picker')
        .addEventListener('color-changed', handleTextColorChange)

    document
        .getElementById('header-color-picker')
        .addEventListener('color-changed', handleHeaderColorChange)

    document
        .getElementById('h2-color-picker')
        .addEventListener('color-changed', handleH2ColorChange)

    document
        .getElementById('links-color-picker')
        .addEventListener('color-changed', handleLinksColorChange)
}

document.addEventListener('DOMContentLoaded', initialize)
