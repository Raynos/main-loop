import { VElem, VPatch } from "vtree"
import { DOMElement } from "jsig.dom"

type MainLoop<T> : (
    initialState: T,
    view: (T) => VElem,
    opts?: {
        create?: (VElem, opts: Object) => DOMElement,
        diff?: (prev: VElem, curr: VElem, opts: Object) => Array<VPatch>,
        patch?: (
            target: DOMElement,
            patches: Array<VPatch>,
            opts: Object
        ) => void,
        initialTree?: VElem,
        target?: DOMElement,
        createOnly?: Boolean
    }
) => {
    target: DOMElement,
    update: (T) => void
}

main-loop : MainLoop<T>
