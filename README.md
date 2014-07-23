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
var loop = mainLoop(initState, render)
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

## Docs

See [docs.mli][docs] for type definitions

### `var loop = mainLoop(initialState, render, opts)`

`mainLoop` manages a requestAnimationFrame rendering loop for
  you. Interally it will call your `render` function with the
  most recent state and then apply a diff and patch cycle.

When you call `mainLoop` with the `initialState` it will call
  `render` with the `initialState` as an argument and then
  creates a DOM element from the result of `render`.

`mainLoop` returns a `loop` object that has a `target` property
  and an `update` method.

#### `loop.target`

The DOM element created on the initial call of `mainLoop` is
  returned as the `target` property of `loop`.

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

  [docs]: https://github.com/Raynos/main-loop/tree/master/docs.mli
