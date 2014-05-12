var raf = require("raf/polyfill")
var vdomCreate = require("virtual-dom/create-element")
var vdomDiff = require("virtual-dom/diff")
var vdomPatch = require("virtual-dom/patch")

module.exports = main

function main(initialState, view, opts) {
    opts = opts || {}

    var currentState = initialState
    var create = opts.create || vdomCreate
    var diff = opts.diff || vdomDiff
    var patch = opts.patch || vdomPatch
    var redrawScheduled = false

    var tree = view(currentState)
    var target = create(tree, opts)

    currentState = null

    return {
        target: target,
        update: update
    }

    function update(state) {
        if (currentState === null && !redrawScheduled) {
            redrawScheduled = true
            raf(redraw)
        }

        currentState = state
    }

    function redraw() {
        redrawScheduled = false;
        if (currentState === null) {
            return
        }

        var newTree = view(currentState)

        if (opts.createOnly) {
            create(newTree, opts)
        } else {
            var patches = diff(tree, newTree, opts)
            patch(target, patches, opts)
        }

        tree = newTree
        currentState = null
    }
}
