import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0,
    },
    reducers: {
        increment: (state) => {
            // Redux 工具包允许我们在减缩器中编写“变异”逻辑。它实际上并没有改变状态，
            // 因为它使用Immer库，该库检测到对“草稿状态”的更改，并根据这些更改生成
            // 一个全新的不可变状态
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer