import { configureStore } from '@reduxjs/toolkit'
import counterReducer from "./features/counter/counterSlice";
import skillerReducer from "./features/cver/skillerSlice";
import experiencerReducer from "./features/cver/experiencerSlice";

export default configureStore({
    reducer: {
        counter: counterReducer,
        skiller: skillerReducer,
        experiencer: experiencerReducer,
    },
})