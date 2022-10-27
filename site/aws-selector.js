const state = {
    // selectorEls: [],
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

const attachListeners = () => {
    for (i = 0; i < state.selectorEls.length; i += 1) {
        state.selectorEls[i]
            .querySelector('input')
            .addEventListener('focus', handleSelectorFocus)
    }
}

const handleSelectorFocus = (event) => {
    console.log(event.target)
    console.log(event.target.parentElement)
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

const awsInitializeSelectors = () => {
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
    // attachListeners()

    // state.selectors.forEach((item) => {
    //     console.log(item)
    // })
}

document.addEventListener('DOMContentLoaded', awsInitializeSelectors)
