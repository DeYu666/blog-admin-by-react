import { createSlice } from '@reduxjs/toolkit'


const dataSource = [
    {
        id :"1",
        workYear: '2021年10月9日',
        enterpriseName: '西安电子科技大学',
        workName: "学士学位",
        workInfo: "从事经历123",
    },
    {
        id :"2",
        workYear: '2021年10月10日',
        enterpriseName: '西安电子科技大学',
        workName: "学士学位",
        workInfo: "从事经历456",

    },
];




export const ExperiencerSlice = createSlice({
    name: 'experiencer',
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

            return "666"

        },
    }
})



// Action creators are generated for each case reducer function
export const { increment, deleteData, updateData } = ExperiencerSlice.actions

export default ExperiencerSlice.reducer