import { createSlice } from '@reduxjs/toolkit'



const dataSource = [
    {
        id :"2",
        skillName: 'Golang',
        skillMastery: 60,
        skillIntro: "go 熟悉基本数据结构的底层实现，了解 并发模 ....",
    },
    {
        id :"1",
        skillName: 'Golang',
        skillMastery: 60,
        skillIntro: "go 熟悉基本数据结构的底层实现，了解 并发模 ....",
    }
];

export const SkillerSlice = createSlice({
    name: 'skiller',
    initialState: {
        value: dataSource,
    },
    reducers: {
        refresh:(state) => {

        },
        increment: (state, action) => {
            let data = action.payload

            data.id = state.value[0] + 1

            state.value.splice(0,0,data)
        },
        updateData: (state, action) => {
            let data = action.payload

            for (let i = 0; i < state.value.length; i++) {
                if (data.id === state.value[i].id) {
                    state.value[i] = data
                }
            }

        },
        deleteData: (state, action) => {
            for (let i = 0; i < state.value.length; i++) {
                if (action.payload === state.value[i].id) {
                    state.value.splice(i, 1)
                }
            }

        },
    }
})



// Action creators are generated for each case reducer function
export const { increment, deleteData, updateData } = SkillerSlice.actions

export default SkillerSlice.reducer