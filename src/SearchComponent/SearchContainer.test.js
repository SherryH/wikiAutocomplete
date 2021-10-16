const SearchContainer = require("./SearchContainer")

// @ponicode
describe("getStateAndHelpers", () => {
    let object
    let inst

    beforeEach(() => {
        object = [["Edmond", "Anas", "George"], ["Pierre Edouard", "Michael", "Jean-Philippe"], ["Jean-Philippe", "Pierre Edouard", "George"]]
        inst = new SearchContainer.default(object)
    })

    test("0", () => {
        let callFunction = () => {
            inst.getStateAndHelpers()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("render", () => {
    let object
    let inst

    beforeEach(() => {
        object = [["Jean-Philippe", "Jean-Philippe", "Edmond"], ["Michael", "George", "George"], ["George", "Edmond", "George"]]
        inst = new SearchContainer.default(object)
    })

    test("0", () => {
        let callFunction = () => {
            inst.render()
        }
    
        expect(callFunction).not.toThrow()
    })
})
