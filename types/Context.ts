type State = {
    hand: any
}

export enum ActionKind {
    SET_HAND = "SET_HAND",
}

type Action = {
    type: ActionKind
    payload: any
}

export type { State, Action }
