type saveCounterInitValueAT = ReturnType<typeof saveCounterInitValueAC>

const defaultValue = 0

export const counterInitValueReducer = (state = defaultValue, action: saveCounterInitValueAT): number => {
    switch (action.type) {
        case 'SAVECOUNTERINITVALUE':
            return action.payload.value
        default:
            return state
    }
}

export const saveCounterInitValueAC = (value: number) => ({
    type: 'SAVECOUNTERINITVALUE',
    payload: {
        value
    }
} as const)