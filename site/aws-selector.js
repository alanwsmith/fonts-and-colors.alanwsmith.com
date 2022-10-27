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
        selector.filterEl = selector.selectorEl.querySelector('input')
    }
}

const attachListeners = () => {
    for (selectorId of Object.keys(state.selectors)) {
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
    console.log('select keyup')
}

const handleInputFocus = (event) => {
    const selectorId = event.target.parentElement.id
    const selector = state.selectors[selectorEl]

    // remove existing drop down
    if (selector.selectorEl.querySelector('select')) {
        selector.selectorEl.querySelector('select').blur()
        selector.selectorEl.querySelector('select').remove()
    }

    // make new drop down
    selector.selectEl = document.createElement('select')
    selector.selectEl.size = 5
    selector.selectEl.addEventListener('keyup', handleSelectKeyup)
    selector.selectorEl.querySelector('div').appendChild(selector.selectEl)
    selector.placeholderString = ''
    setOptions(selectorId)

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
const loadOptions = () => {
    console.log('-- loadOptions')
    for (selectorId of Object.keys(state.selectors)) {
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


const 


const initializeAwsSelectors = () => {
    console.log('Initializing Selectors')
    // Load the selectors and key them off their ID
    const selectorEls = document.getElementsByClassName('aws-selector--wrapper')
    for (
        selectorIndex = 0;
        selectorIndex < selectorEls.length;
        selectorIndex += 1
    ) {
        state.selectors[selectorEls[selectorIndex].id] = {
            selectorEl: selectorEls[selectorIndex],
            defaultOptions: [],
        }
    }
    loadOptions()
    associateInputs()
    attachListeners()

    document.addEventListener('mousedown', handlePageClick)
}

document.addEventListener('DOMContentLoaded', initializeAwsSelectors)
