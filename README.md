# main-loop

<!--
    [![build status][1]][2]
    [![NPM version][3]][4]
    [![Coverage Status][5]][6]
    [![gemnasium Dependency Status][7]][8]
    [![Davis Dependency status][9]][10]
-->

<!-- [![browser support][11]][12] -->

A rendering loop for diffable UIs

`main-loop` is an optimization module for a virtual DOM system. Normally you would re-create the virtual tree every time your state changes. This is not optimum, with main-loop you will only update your virtual tree at most once per request animation frame.

`main-loop` basically gives you batching of your virtual DOM changes, which means if you change your model multiple times it will be rendered once asynchronously on the next request animation frame.

## Example

```js
var mainLoop = require("main-loop")
var h = require("virtual-dom/h")

var initState = { fruits: ["apple", "banana"], name: "Steve" }

function render(state) {
    return h("div", [
        h("div", [
            h("span", "hello "),
            h("span.name", state.name)
        ]),
        h("ul", state.fruits.map(renderFruit))
    ])

    function renderFruit(fruitName) {
        return h("li", [
            h("span", fruitName)
        ])
    }
}

// set up a loop
var loop = mainLoop(initState, render, {
    create: require("virtual-dom/create-element"),
    diff: require("virtual-dom/diff"),
    patch: require("virtual-dom/patch")
})
document.body.appendChild(loop.target)

// update the loop with the new application state
loop.update({
    fruits: ["apple", "banana", "cherry"],
    name: "Steve"
})
loop.update({
    fruits: ["apple", "banana", "cherry"],
    name: "Stevie"
})
```

## var loop = mainLoop(initState, render, opts)

Create a loop object with some initial state, a render function, and some
options. Your `function render (state) {}` receives the current state as its
argument and must return a virtual-dom object.

You must supply: `opts.diff`, `opts.patch`, and `opts.create`. These can be
obtained directly from `require("virtual-dom")`.

Optionally supply an `opts.target` and `opts.initialTree`.

You may supply an implementation of [`requestAnimationFrame`][mdn-raf] as
`opts.raf`.

## loop.target

The main-loop root DOM element. Insert this element to the page.

## loop.update(newState)

Update the page state, automatically re-rendering the page as necessary.

## loop.state

Read the current main-loop state. To modify the loop state, use `loop.update()`.

## Installation

`npm install main-loop`

## Contributors

 - Raynos

## MIT Licenced

  [1]: https://secure.travis-ci.org/Raynos/main-loop.png
  [2]: https://travis-ci.org/Raynos/main-loop
  [3]: https://badge.fury.io/js/main-loop.png
  [4]: https://badge.fury.io/js/main-loop
  [5]: https://coveralls.io/repos/Raynos/main-loop/badge.png
  [6]: https://coveralls.io/r/Raynos/main-loop
  [7]: https://gemnasium.com/Raynos/main-loop.png
  [8]: https://gemnasium.com/Raynos/main-loop
  [9]: https://david-dm.org/Raynos/main-loop.png
  [10]: https://david-dm.org/Raynos/main-loop
  [11]: https://ci.testling.com/Raynos/main-loop.png
  [12]: https://ci.testling.com/Raynos/main-loop
  [mdn-raf]: https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
