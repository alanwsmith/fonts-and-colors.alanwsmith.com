////////////////////////////////////////////////////
// This is the component itself

class hslaPicker extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: 'open' })

        console.log(this.getAttribute('h'))
        this.hueValue = 180
        this.saturationValue = 50
        this.lightnessValue = 50
        this.alphaValue = 1

        const styles = document.createElement('style')
        styles.innerText = `
input[type="range"] {
   -webkit-appearance: none;
    appearance: none;
    background: transparent;
    cursor: pointer;
    width: 180px;
}
`

        const sendColorChanged = () => {
            this.dispatchEvent(
                new CustomEvent('color-changed', {
                    detail: {
                        hsla: `hsla(${this.hueValue}, ${this.saturationValue}%, ${this.lightnessValue}%, ${this.alphaValue})`,
                    },
                    composed: true,
                    bubbles: true,
                })
            )
        }

        this.updateHSL = () => {
            const hslValue = `hsla(${this.hueValue}, ${this.saturationValue}%, ${this.lightnessValue}%, ${this.alphaValue})`
            updateHueDisplay()
            updateSaturationDisplay()
            updateLightnessDisplay()
            sendColorChanged()
        }

        const updateHueDisplay = () => {
            this.hueDisplay.style.background = `linear-gradient(
            0.25turn,
            hsl(0, ${this.saturationValue}%, ${this.lightnessValue}%),
            hsl(45, ${this.saturationValue}%, ${this.lightnessValue}%),
            hsl(90, ${this.saturationValue}%, ${this.lightnessValue}%),
            hsl(135, ${this.saturationValue}%, ${this.lightnessValue}%),
            hsl(180, ${this.saturationValue}%, ${this.lightnessValue}%),
            hsl(225, ${this.saturationValue}%, ${this.lightnessValue}%),
            hsl(270, ${this.saturationValue}%, ${this.lightnessValue}%),
            hsl(315, ${this.saturationValue}%, ${this.lightnessValue}%),
            hsl(360, ${this.saturationValue}%, ${this.lightnessValue}%))`
        }

        const updateSaturationDisplay = () => {
            this.saturationDisplay.style.background = `linear-gradient(
            0.25turn,
            hsl(${this.hueValue}, 0%, ${this.lightnessValue}%),
            hsl(${this.hueValue}, 100%, ${this.lightnessValue}%))`
        }

        const updateLightnessDisplay = () => {
            this.lightnessDisplay.style.background = `linear-gradient(
            0.25turn,
            hsl(${this.hueValue}, ${this.saturationValue}%, 0%),
            hsl(${this.hueValue}, ${this.saturationValue}%, 50%),
            hsl(${this.hueValue}, ${this.saturationValue}%, 100%)`
        }

        const handleHueInput = (event) => {
            this.hueValue = event.target.value
            this.updateHSL()
        }

        const handleSaturationInput = (event) => {
            this.saturationValue = event.target.value
            this.updateHSL()
        }

        const handleLightnessInput = (event) => {
            this.lightnessValue = event.target.value
            this.updateHSL()
        }

        this.lightnessDiv = document.createElement('div')
        this.lightnessDiv.style.position = 'relative'
        this.lightnessDiv.style.width = '180px'
        this.lightnessDiv.style.height = '20px'
        this.lightnessDisplay = document.createElement('div')
        this.lightnessDisplay.style.width = '180px'
        this.lightnessDisplay.style.height = '15px'
        this.lightnessDisplay.style.padding = '0'
        this.lightnessDisplay.style.margin = '0'
        this.lightnessDisplay.style.border = '1px solid white'
        this.lightnessDisplay.style.borderRadius = '30px'
        this.lightnessDisplay.style.position = 'absolute'
        this.lightnessSlider = document.createElement('input')
        this.lightnessSlider.setAttribute('id', 'lightness-slider')
        this.lightnessSlider.setAttribute('name', 'lightness-slider')
        this.lightnessSlider.setAttribute('type', 'range')
        this.lightnessSlider.setAttribute('min', '0')
        this.lightnessSlider.setAttribute('max', '100')
        this.lightnessSlider.setAttribute('value', this.lightnessValue)
        this.lightnessSlider.style.position = 'absolute'
        this.lightnessSlider.style.padding = '0'
        this.lightnessSlider.style.margin = '0'
        this.lightnessSlider.addEventListener('input', handleLightnessInput)
        this.lightnessDiv.appendChild(this.lightnessDisplay)
        this.lightnessDiv.appendChild(this.lightnessSlider)

        this.saturationDiv = document.createElement('div')
        this.saturationDiv.style.position = 'relative'
        this.saturationDiv.style.width = '180px'
        this.saturationDiv.style.height = '20px'
        this.saturationDisplay = document.createElement('div')
        this.saturationDisplay.style.width = '180px'
        this.saturationDisplay.style.height = '15px'
        this.saturationDisplay.style.padding = '0'
        this.saturationDisplay.style.margin = '0'
        this.saturationDisplay.style.border = '1px solid white'
        this.saturationDisplay.style.borderRadius = '30px'
        this.saturationDisplay.style.position = 'absolute'
        this.saturationSlider = document.createElement('input')
        this.saturationSlider.setAttribute('id', 'saturation-slider')
        this.saturationSlider.setAttribute('name', 'saturation-slider')
        this.saturationSlider.setAttribute('type', 'range')
        this.saturationSlider.setAttribute('min', '0')
        this.saturationSlider.setAttribute('max', '100')
        this.saturationSlider.setAttribute('value', this.saturationValue)
        this.saturationSlider.addEventListener('input', handleSaturationInput)
        this.saturationSlider.style.padding = '0'
        this.saturationSlider.style.margin = '0'
        this.saturationSlider.style.position = 'absolute'
        this.saturationDiv.appendChild(this.saturationDisplay)
        this.saturationDiv.appendChild(this.saturationSlider)

        this.hueDiv = document.createElement('div')
        this.hueDiv.style.position = 'relative'
        this.hueDiv.style.width = '180px'
        this.hueDiv.style.height = '20px'
        this.hueDisplay = document.createElement('div')
        this.hueDisplay.style.width = '180px'
        this.hueDisplay.style.height = '15px'
        this.hueDisplay.style.padding = '0'
        this.hueDisplay.style.margin = '0'
        this.hueDisplay.style.border = '1px solid white'
        this.hueDisplay.style.borderRadius = '30px'
        this.hueDisplay.style.position = 'absolute'
        this.hueSlider = document.createElement('input')
        this.hueSlider.setAttribute('id', 'hue-slider')
        this.hueSlider.setAttribute('name', 'hue-slider')
        this.hueSlider.setAttribute('type', 'range')
        this.hueSlider.setAttribute('min', '0')
        this.hueSlider.setAttribute('max', '360')
        this.hueSlider.setAttribute('value', this.hueValue)
        this.hueSlider.style.position = 'absolute'
        this.hueSlider.style.padding = '0'
        this.hueSlider.style.margin = '0'
        this.hueSlider.addEventListener('input', handleHueInput)
        this.hueDiv.appendChild(this.hueDisplay)
        this.hueDiv.appendChild(this.hueSlider)

        this.updateHSL()
        // this.shadowRoot.append(display)
        this.shadowRoot.append(styles)
        this.shadowRoot.append(this.lightnessDiv)
        this.shadowRoot.append(this.saturationDiv)
        this.shadowRoot.append(this.hueDiv)

        // Send the initial color update
        document.addEventListener('DOMContentLoaded', sendColorChanged)
    }

    connectedCallback() {
        if (this.hasAttribute('h')) {
            this.hueValue = parseInt(this.getAttribute('h'), 10)
        } else {
            this.hueValue = 140
        }
        if (this.hasAttribute('s')) {
            this.saturationValue = parseInt(this.getAttribute('s'), 10)
        } else {
            this.saturationValue = 60
        }
        if (this.hasAttribute('l')) {
            this.lightnessValue = parseInt(this.getAttribute('l'), 10)
        } else {
            this.lightnessValue = 30
        }

        this.updateHSL()
        this.hueSlider.setAttribute('value', this.hueValue)
        this.saturationSlider.setAttribute('value', this.saturationValue)
        this.lightnessSlider.setAttribute('value', this.lightnessValue)
    }
}

customElements.define('hsla-picker', hslaPicker)
