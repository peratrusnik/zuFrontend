import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    serverAddress: null
}

const ServerSlicer = createSlice({
    name: 'serverAddress',
    initialState: initialState,
    reducers: {
        setServerAddress(state, data) {
            state.serverAddress = data.payload
        },
    }
})

export const {setServerAddress} = ServerSlicer.actions
export default ServerSlicer.reducer