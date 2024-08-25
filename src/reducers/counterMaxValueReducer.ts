type saveCounterMaxValueAT = ReturnType<typeof saveCounterMaxValueAC>

const defaultValue = 5

export const counterMaxValueReducer = (state = defaultValue, action: saveCounterMaxValueAT): number => {
    switch (action.type)
    {
        case 'SAVEMAXVALUE':
            return action.payload.value
        default:
            return state
    }
}

export const saveCounterMaxValueAC = (value: number) => ({
    type: 'SAVEMAXVALUE',
    payload: {
        value
    }
} as const)