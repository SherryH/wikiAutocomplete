# Wikiautocomplete

This is a simple autocomplete component that gives Wikipedia search suggestions based on user input and opens the selected search page.

This autocomplete widget design was taken from inspiration of [this codepen](https://codepen.io/himalayasingh/pen/NLmeyJ)

# Technology

- React
- Webpack 4
- Material-UI
- RxJS
- Eslint

This project was done with the aim to practice React render props pattern, Observables and JSS.

# To Figure out

- How to create background animation like [this codepen](https://codepen.io/himalayasingh/pen/NLmeyJ)
- Where to refactor searchInput\$ out of searchBox.js to?
- Why Observable got fired more times during search
- How to convert promise into Observable using `from(promise)` or `or(promise)` in SearchContainer.js?
