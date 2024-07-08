import { createSlice } from "@reduxjs/toolkit";

export const languageSlice = createSlice({
    name: "language",
    initialState: {
        topics: {},
        activeTopic: null,
        activeTopicLessons: null
    },
    reducers: {
        setTopics: (state, action) => {
            state.topics = action.payload
        },
        setActiveTopic: (state, action) => {
            state.activeTopic = action.payload
        },
        setActiveTopicLessons: (state, action) => {
            state.activeTopicLessons = action.payload
        }
    }
})

export const {setTopics, setActiveTopic, setActiveTopicLessons} = languageSlice.actions
export default languageSlice.reducer