let changeInProgress = false

const rawFontObjects = {
    // fuzzybubbles: { name: 'Fuzzy Bubbles' },
    // lato: { name: 'Lato' },
    // roboto: { name: 'Roboto' },
}

const log = (msg) => {
    console.log(msg)
}

const handleClick = (event) => {
    const parts = event.target.id.split('--')
    if (parts[0] == 'move') {
        const fromColor = document.getElementById(
            `css--${parts[1]}--string`
        ).value
        const toColor = document.getElementById(
            `css--${parts[2]}--string`
        ).value
        log(`-- ${fromColor}`)
        log(`-- ${toColor}`)
        if (fromColor.length === 7 && toColor.length === 7) {
            document.getElementById(`css--${parts[2]}--string`).value =
                fromColor
            document.getElementById(`css--${parts[1]}--string`).value = toColor
            // fake events to trigger live update
            handleColorChange({
                target: {
                    value: fromColor,
                    id: `css--${parts[2]}--string`,
                },
            })
            handleColorChange({
                target: {
                    value: toColor,
                    id: `css--${parts[1]}--string`,
                },
            })

            log(event.target.id)
        }
    }
}

const handleColorChange = (event) => {
    if (!changeInProgress) {
        changeInProgress = true
        let baseValue = event.target.value.toLowerCase()
        let updateValue = null
        const idParts = event.target.id.split('--')
        if (idParts[2] === 'picker') {
            updateValue = baseValue
            document.getElementById(`css--${idParts[1]}--string`).value =
                updateValue
        } else {
            const checkValue = baseValue
                .replace(/^#/, '')
                .replaceAll(/[^a-f0-9]/g, '')
            if (checkValue.length === 6) {
                updateValue = `#${checkValue}`
                console.log(updateValue)
                document.getElementById(`css--${idParts[1]}--picker`).value =
                    updateValue
            }
        }
        if (updateValue) {
            if (idParts[1] === 'background') {
                document.body.style.background = updateValue
            } else if (idParts[1] === 'text') {
                document.body.style.color = updateValue
            } else if (idParts[1] === 'header') {
                const headers = document.getElementsByTagName('h1')
                for (const header of headers) {
                    header.style.color = updateValue
                }
            } else if (idParts[1] === 'links') {
                const links = document.getElementsByTagName('a')
                for (const link of links) {
                    link.style.color = updateValue
                }
            }
        }
        changeInProgress = false
    }
}

const processFont = (location, font) => {
    const fontKey = font.toLowerCase().replaceAll(/ /g, '')
    if (rawFontObjects[fontKey]) {
        log(`${location} - ${font}`)
        document.body.style.fontFamily = rawFontObjects[fontKey].name
        const formField = document.getElementById(`font--${location}`)
        formField.value = ''
        formField.placeholder = font
        formField.blur()
        console.log(formField)
    }
}

const handleInput = (event) => {
    if (event.type === 'change') {
        log('Got change event')
        const parts = event.target.id.split('--')
        if (parts[0] === 'font') {
            processFont(parts[1], event.target.value)
        }
    } else if (event.type === 'input') {
        log('Got input event')
    }
}

let fontMenuList = []

const loadFonts = () => {
    fetch('/assets/jsons/fonts-popular.json')
        .then((response) => {
            if (!response.ok) {
                throw new Error('There was a problem getting the data')
            }
            return response.json()
        })
        .then((data) => {
            // let debugList = ''
            // log(data.items)
            // const fonts = []
            data.items.forEach((item) => {
                fontMenuList.push({
                    id: item.family.toLowerCase().replaceAll(/\s/g, ''),
                    name: item.family,
                })

                /*
              const fontListElements =
                document.getElementsByClassName('font-list')
              for (const fontList of fontListElements) {
                // console.log(fontList)
                // fontMenuList.push({ id:
                // const newOption = document.createElement('option')
                // newOption.value = item.family
                // fontList.appendChild(newOption)
                // debugList += `\n'${item.family}',<br />`
              }
                  */
            })

            log(fontMenuList)

            // document.getElementById('debug-list').innerHTML = debugList

            /*
        for (const item in data) {
          fonts.push(data[item].name)
        }
        fonts.sort()
        const fontListElements = document.getElementsByClassName('font-list')
        for (const fontList of fontListElements) {
          log(fontList)
          fonts.forEach((font) => {
            const newOption = document.createElement('option')
            newOption.value = font
            fontList.appendChild(newOption)
          })
        }

            */
        })
        .catch((error) => {
            console.error('Fetch Error: ', error)
        })

    /*

        for (const fontKey in rawFontObjects) {
          fonts.push(rawFontObjects[fontKey].name)
        }
        fonts.sort()
        const fontListElements = document.getElementsByClassName('font-list')
        for (const fontList of fontListElements) {
          log(fontList)
          fonts.forEach((font) => {
            const newOption = document.createElement('option')
            newOption.value = font
            fontList.appendChild(newOption)
          })
        }
        */
}

function engage() {
    document
        .getElementById('color-pickers')
        .addEventListener('input', handleColorChange)
    document
        .getElementById('color-pickers')
        .addEventListener('input', handleInput)
    document
        .getElementById('color-pickers')
        .addEventListener('change', handleInput)
    document
        .getElementById('color-pickers')
        .addEventListener('click', handleClick)
    loadFonts()
}
document.addEventListener('DOMContentLoaded', engage)
