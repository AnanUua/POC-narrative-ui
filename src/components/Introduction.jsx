import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { answerPrompt, completePrompts } from '../features/main/introduction'
import introduction from '../assets/introduction.json'
import './Introduction.scss'
import StoreData from './StoreData'
import StartButton from './StartButton'
import ExperienceCanvas from './ExperienceCanvas'

export default function Introduction() {
  // Getters and dispatch
  const currentIndex = useSelector((state) => state.introduction.currentIndex)
  const isPromptComplete = useSelector(
    (state) => state.introduction.isPromptComplete
  )
  const version = useSelector((state) => state.introduction.version)
  const hasExperienceStarted = useSelector(
    (state) => state.introduction.hasExperienceStarted
  )
  const dispatch = useDispatch()

  // States
  const [showFollowing, setShowFollowing] = useState(false)
  const [followingToShow, setFollowingToShow] = useState(null)

  // TODO: Prevent from triggering on mount
  useEffect(() => {
    if (currentIndex > 3) {
      // Get introduction prompts length minus 1
      dispatch(completePrompts())
    }
  }, [currentIndex])

  // Methods
  const progress = (index) => {
    setFollowingToShow(index)
    setShowFollowing(true)
  }
  const next = (index) => {
    setShowFollowing(false)
    dispatch(answerPrompt(index))
  }

  // Template
  return (
    <>
      {!hasExperienceStarted && (
        <section className="Introduction">
          {introduction.map(
            (section, index) =>
              index === currentIndex && (
                <div className="Introduction__item" key={index}>
                  <span className="Introduction__date">{section.date}</span>
                  <p className="Introduction__baseline">{section.baseline}</p>
                  <div className="Introduction__options">
                    {!showFollowing &&
                      section.options.map((option, index) => (
                        <div
                          className="Introduction__option"
                          key={index}
                          onClick={() => progress(index)}
                        >
                          {option.label}
                        </div>
                      ))}
                  </div>
                  {showFollowing && (
                    <p className="Introduction__baseline">
                      {section.options[followingToShow].following}
                      <button
                        className="Introduction__nextButton"
                        onClick={() => next(index)}
                      >
                        (Suite)
                      </button>
                    </p>
                  )}
                </div>
              )
          )}
          {isPromptComplete && (
            <footer>
              <p style={{ marginTop: '2rem' }}>
                Vous êtes prêt(e) à partir. Motivation de départ: {version}.
              </p>
              <StartButton />
            </footer>
          )}
        </section>
      )}
      {hasExperienceStarted && <ExperienceCanvas />}
      <StoreData />
    </>
  )
}
