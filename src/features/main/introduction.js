import { createSlice } from '@reduxjs/toolkit'
import introductionData from '../../assets/introduction.json'

const TIPPING_POINT = Object.keys(introductionData).length

const initialState = {
  currentIndex: 0,
  score: 0,
  scenario: '',
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

      if (state.score <= TIPPING_POINT) {
        state.scenario = 'Haine'
      } else {
        state.scenario = 'Nostalgie'
      }
    },
    startExperience: (state) => {
      state.hasExperienceStarted = true
    },
  },
})

export const { answerPrompt, completePrompts, startExperience } = introduction.actions

export default introduction.reducer
