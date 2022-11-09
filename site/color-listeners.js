const handleBackgroundColorChange = (event) => {
    document.body.style.backgroundColor = event.detail.hsla
    document.getElementById('bg-color-string').value = event.detail.hsla
}

const handleTextColorChange = (event) => {
    document.body.style.color = event.detail.hsla
    document.getElementById('p-color-string').value = event.detail.hsla
}

const handleHeaderColorChange = (event) => {
    const h1s = document.getElementsByTagName('h1')
    for (let i = 0; i < h1s.length; i++) {
        h1s[i].style.color = event.detail.hsla
    }
    document.getElementById('h1-color-string').value = event.detail.hsla
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
    document.getElementById('a-color-string').value = event.detail.hsla
}

const handleBQColorChange = (event) => {
    const links = document.getElementsByTagName('blockquote')
    for (let i = 0; i < links.length; i++) {
        links[i].style.color = event.detail.hsla
    }
    document.getElementById('bq-color-string').value = event.detail.hsla
}

const initialize = () => {
    document
        .getElementById('bg-color')
        .addEventListener('color-changed', handleBackgroundColorChange)

    document
        .getElementById('p-color')
        .addEventListener('color-changed', handleTextColorChange)

    document
        .getElementById('h1-color')
        .addEventListener('color-changed', handleHeaderColorChange)

    document
        .getElementById('h2-color')
        .addEventListener('color-changed', handleH2ColorChange)

    document
        .getElementById('a-color')
        .addEventListener('color-changed', handleLinksColorChange)

    document
        .getElementById('bq-color')
        .addEventListener('color-changed', handleBQColorChange)
}

document.addEventListener('DOMContentLoaded', initialize)
