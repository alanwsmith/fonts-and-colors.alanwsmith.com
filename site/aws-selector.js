const state = {
    selectors: {},
}

/*
          <div class="aws-selector--wrapper" id="text-font-selector">
            <input class="aws-selector--input" type="text" size="20" />
            <div class="aws-selector--options-wrapper">
              <select style="display: none" class="aws-selector--options-list">
                <option value="a">A</option>
              </select>
            </div>
          </div>
*/

const associateInputs = () => {
    for (selectorId of Object.keys(state.selectors)) {
        const selector = state.selectors[selectorId]
        selector.inputEl = selector.selectorEl.querySelector('input')
    }
}

const attachListeners = () => {
    console.log('### attachListeners')
    for (selectorId of Object.keys(state.selectors)) {
        console.log(`-- ${selectorId}`)
        const selectorEl = state.selectors[selectorId].selectorEl
        selectorEl
            .querySelector('input')
            .addEventListener('focus', handleInputFocus)
    }
}

const handlePageClick = (event) => {
    // if (!event.target.id) {
    //     deactivateSelector()
    // } else {
    // if (!event.target.id) {
    //     deactivateSelector()
    // } else {
    //     const idParts = event.target.id.split('--')
    //     if (idParts[0] !== 'awsselect') {
    //         deactivateSelector()
    //     } else {
    //         if (idParts[1] === 'selection') {
    //             const theValue = event.target.value
    //             pickSelection(theValue)
    //         }
    //     }
    // }
}

const handleSelectKeyup = (event) => {
    console.log('### handleSelectKeyup')
}

const buildSelectEl = (selector) => {
    console.log('### buildSelectEl')
    // remove prior instance if it exists
    if (selector.selectorEl.querySelector('select')) {
        // selector.selectorEl.querySelector('select').blur()
        selector.selectorEl.querySelector('select').remove()
    }

    // make new drop down
    selector.selectEl = document.createElement('select')
    selector.selectEl.size = 5
    selector.selectEl.addEventListener('keyup', handleSelectKeyup)
    // selector.selectorEl.querySelector('div').appendChild(selector.selectEl)
}

const handleInputFocus = (event) => {
    console.log('### handleInputFocus')
    const selectorId = event.target.parentElement.id
    const selector = state.selectors[selectorId]
    buildSelectEl(selector)
    loadOptions(selector)
    selector.selectorEl.querySelector('div').appendChild(selector.selectEl)
    setPlaceholder(selector, '')

    // // remove existing drop down
    // if (selector.selectorEl.querySelector('select')) {
    //     selector.selectorEl.querySelector('select').blur()
    //     selector.selectorEl.querySelector('select').remove()
    // }
    // // make new drop down
    // selector.selectEl = document.createElement('select')
    // selector.selectEl.size = 6
    // selector.selectEl.addEventListener('keyup', handleSelectKeyup)
    // selector.selectorEl.querySelector('div').appendChild(selector.selectEl)

    // prototype

    // if (state.optionsEl) {
    //     state.optionsEl.blur()
    //     state.optionsEl.remove()
    // }

    // state.optionsEl = document.createElement('select')
    // state.optionsEl.size = 5
    //
    //////// skipping and just using selector
    // state.optionsEl.id = 'awsselect--options'
    ////////
    //
    // state.wrapperEl.appendChild(state.optionsEl)
    // state.optionsEl.addEventListener('keyup', handleOptionsKeyup)
    // state.filterEl.placeholder = ''
    //
    //////// skipping. already done with  loadOptions
    // setOptions()
    /////////
}

// Pull in the initail options list to work off of
const loadDefaultOptions = () => {
    console.log('### loadDefaultOptions')
    for (selectorId of Object.keys(state.selectors)) {
        console.log(`-- ${selectorId}`)
        const selector = state.selectors[selectorId]
        const options = selector.selectorEl.querySelectorAll('option')
        for (x = 0; x < options.length; x += 1) {
            selector.defaultOptions.push({
                value: options[x].value,
                text: options[x].innerText,
            })
        }
    }
}

const loadOptions = (selector) => {
    console.log('### loadOptions')
    console.log(`-- ${selector.id}`)
    selector.defaultOptions.forEach((defaultOption) => {
        if (defaultOption.value.includes(selector.inputEl.value)) {
            // this looks like it'll work for no value in iput
            // but need to check if input gets added then removed
            const optionEl = document.createElement('option')
            optionEl.innerText = defaultOption.text
            selector.selectEl.appendChild(optionEl)
        }
    })
}

const setPlaceholder = (selector, value) => {
    console.log('### setPlaceholder')
    selector.placeholder = value
    selector.inputEl.placeholder = ''
}

const initializeAwsSelectors = () => {
    console.log('### initializeAwsSelectors')
    // Load the selectors and key them off their ID
    const selectorEls = document.getElementsByClassName('aws-selector--wrapper')
    for (
        selectorIndex = 0;
        selectorIndex < selectorEls.length;
        selectorIndex += 1
    ) {
        console.log(`-- ${selectorEls[selectorIndex].id}`)
        state.selectors[selectorEls[selectorIndex].id] = {
            selectorEl: selectorEls[selectorIndex],
            defaultOptions: [],
            placeholder: '',
            id: selectorEls[selectorIndex].id,
        }
    }
    loadDefaultOptions()
    associateInputs()
    attachListeners()
    document.addEventListener('mousedown', handlePageClick)
}

document.addEventListener('DOMContentLoaded', initializeAwsSelectors)
