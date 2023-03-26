import { Action, ActionKind, State } from "../types/Context"

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case ActionKind.SET_HAND:
            return { hand: action.payload }
        default:
            return state
    }
}

export default reducer