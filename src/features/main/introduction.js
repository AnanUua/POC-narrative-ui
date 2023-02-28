import { createSlice } from '@reduxjs/toolkit'

const TIPPING_POINT = 4 // TODO: Get introduction prompts length

const initialState = {
  currentIndex: 0,
  score: 0,
  version: '',
  isPromptComplete: false,
  hasExperienceStarted: false,
}

export const introduction = createSlice({
  name: 'introduction',
  initialState,
  reducers: {
    answerPrompt: (state, action) => {
      state.score += action.payload
      state.currentIndex++
    },
    completePrompts: (state) => {
      state.isPromptComplete = true

      if (state.score >= TIPPING_POINT) {
        state.version = 'Haine'
      } else {
        state.version = 'Nostalgie'
      }
    },
    startExperience: (state) => {
      state.hasExperienceStarted = true
    },
  },
})

export const { answerPrompt, completePrompts, startExperience } =
  introduction.actions

export default introduction.reducer
