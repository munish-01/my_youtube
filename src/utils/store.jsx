import { configureStore } from "@reduxjs/toolkit";
import appSLice from "./appSlice"
import searchSlice from "./searchSlice";

const store = configureStore({
    reducer: {
        app: appSLice,
        search: searchSlice,
    }
})

export default store