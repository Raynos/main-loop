var test = require("tape")
var h = require("virtual-dom/virtual-hyperscript")
var document = require("global/document")
var raf = require("raf")

var mainLoop = require("../index")

test("mainLoop is a function", function (assert) {
    assert.equal(typeof mainLoop, "function")
    assert.end()
})

test("can set up main loop", function (assert) {
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
        document: document,
        create: require("virtual-dom/create-element"),
        diff: require("virtual-dom/diff"),
        patch: require("virtual-dom/patch")
    })
    document.body.appendChild(loop.target)

    var div = loop.target
    var span = div.childNodes[0].childNodes[1]
    var ul = div.childNodes[1]

    assert.equal(div.tagName, "DIV")
    assert.equal(span.childNodes[0].data, "Steve")
    assert.equal(ul.childNodes.length, 2)

    // update the loop with the new application state
    loop.update({
        fruits: ["apple", "banana", "cherry"],
        name: "Steve"
    })

    raf(function () {
        assert.equal(ul.childNodes.length, 3)

        loop.update({
            fruits: ["apple", "banana", "cherry"],
            name: "Stevie"
        })

        raf(function () {
            assert.equal(span.childNodes[0].data, "Stevie")

            document.body.removeChild(loop.target)
            assert.end()
        })
    })
})

test("loop.state exposed", function (assert) {
    var loop = mainLoop({ n: 0 }, render, {
        document: document,
        create: require("virtual-dom/create-element"),
        diff: require("virtual-dom/diff"),
        patch: require("virtual-dom/patch")
    })
    assert.equal(loop.state.n, 0)
    loop.update({ n: 4 })
    assert.equal(loop.state.n, 4)
    assert.end()

    function render(state) {
        return h('div', String(state.n))
    }
})

test("render called with monotonically increasing times", function(assert){
    assert.plan(2)

    var times = []
    var loop = mainLoop({ n: 0 }, render, {
        document: document,
        create: require("virtual-dom/create-element"),
        diff: require("virtual-dom/diff"),
        patch: require("virtual-dom/patch")
    })


    function render(state, time) {
        times.push(time);
        return h('div', String(state.n))
    }


    raf(function () {

        loop.update({ n: 1})

        raf(function () {
            loop.update({ n: 2})

            assert.equal(times.length, 2)
            assert.ok(times[0] < times[1], "should be increasing")
            assert.end()
        })
    })
});
