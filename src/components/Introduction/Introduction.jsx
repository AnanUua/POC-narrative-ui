import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import introductionData from '../../assets/introduction.json'
import { answerPrompt, completePrompts } from '../../features/main/introduction'
import StartButton from '../StartButton/StartButton'
import './Introduction.scss'

export default function Introduction() {
  const dispatch = useDispatch()

  // Get introduction data from JSON file
  const introduction = introductionData

  // Redux selectors
  const { currentIndex, isPromptComplete, scenario, hasExperienceStarted } = useSelector(
    (state) => state.introduction
  )

  // Local state
  const [showFollowing, setShowFollowing] = useState(false)
  const [followingToShow, setFollowingToShow] = useState(null)

  // Check if user has completed enough prompts to start the experience
  useEffect(() => {
    if (currentIndex > Object.keys(introductionData).length - 1) {
      dispatch(completePrompts())
    }
  }, [currentIndex])

  // Show the following text for a prompt and update local state
  const showFollowingText = (index) => {
    setFollowingToShow(index)
    setShowFollowing(true)
  }

  // Hide the following text for a prompt, update local state, and record user's answer
  const hideFollowingText = (data) => {
    setShowFollowing(false)
    dispatch(answerPrompt(data))
  }

  // Render introduction prompts and following text
  const renderPrompts = () => {
    return introduction.map((section, index) => {
      if (index !== currentIndex) {
        return null
      }

      const options = section.options.map((option, i) => {
        return (
          <div className="Introduction__option" key={i} onClick={() => showFollowingText(i)}>
            {option.label}
          </div>
        )
      })

      const followingText = showFollowing && (
        <p className="Introduction__baseline">
          {section.options[followingToShow].following}
          <button
            className="Introduction__nextButton"
            onClick={() => hideFollowingText(section.options[followingToShow]?.version)}
          >
            Suite...
          </button>
        </p>
      )

      return (
        <div className="Introduction__item" key={index}>
          <span className="Introduction__date">{section.date}</span>
          <p className="Introduction__baseline">{section.baseline}</p>
          <div className="Introduction__options">{options}</div>
          {followingText}
        </div>
      )
    })
  }

  // Render the start button and completion message
  const renderCompletion = () => {
    return (
      <footer className="Introduction__footer">
        <p style={{ marginTop: '2rem' }}>
          [Début de l'expérience. Variante de scénario N°{scenario}].
        </p>
        <StartButton />
      </footer>
    )
  }

  // Render the introduction section if the experience has not started
  return !hasExperienceStarted ? (
    <section className="Introduction">
      {renderPrompts()}
      {isPromptComplete && renderCompletion()}
    </section>
  ) : null
}
