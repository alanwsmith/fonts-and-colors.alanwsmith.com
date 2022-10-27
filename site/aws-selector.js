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
        selector.filterEl = selector.element.querySelector('input')
    }
}

const attachListeners = () => {
    for (selectorId of Object.keys(state.selectors)) {
        const selectorEl = state.selectors[selectorId].element
        selectorEl
            .querySelector('input')
            .addEventListener('focus', handleSelectorFocus)
    }
}

const handleSelectKeyup = (event) => {
    console.log('select keyup')
}

const handleSelectorFocus = (event) => {
    const selector = state.selectors[event.target.parentElement.id]

    // remove existing drop down
    if (selector.querySelector('select')) {
        selector.querySelector('select').blur()
        selector.querySelector('select').remove()
    }

    // make new drop down
    selector.selectEl = document.createElement('select')
    selector.selectEl.size = 5
    selector.element.querySelector('div').appendChild(selector.selectEl)
    selector.optionsEl.addEventListener('keyup', handleSelectKeyup)
}

// Pull in the initail options list to work off of
const loadOptions = () => {
    console.log('-- loadOptions')
    for (selectorId of Object.keys(state.selectors)) {
        const selector = state.selectors[selectorId]
        const options = selector.element.querySelectorAll('option')
        for (x = 0; x < options.length; x += 1) {
            selector.defaultOptions.push({
                value: options[x].value,
                text: options[x].innerText,
            })
        }
    }
}

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
            element: selectorEls[selectorIndex],
            defaultOptions: [],
        }
    }
    loadOptions()
    associateInputs()
    attachListeners()
}

document.addEventListener('DOMContentLoaded', initializeAwsSelectors)
