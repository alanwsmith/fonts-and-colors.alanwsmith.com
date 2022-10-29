const handleBackgroundColorChange = (event) => {
    document.body.style.backgroundColor = event.detail.hsla
    document.getElementById('background-color-string').value = event.detail.hsla
}

const handleTextColorChange = (event) => {
    document.body.style.color = event.detail.hsla
    document.getElementById('text-color-string').value = event.detail.hsla
}

const initialize = () => {
    document
        .getElementById('background-color-picker')
        .addEventListener('color-changed', handleBackgroundColorChange)

    document
        .getElementById('text-color-picker')
        .addEventListener('color-changed', handleTextColorChange)
}

document.addEventListener('DOMContentLoaded', initialize)
