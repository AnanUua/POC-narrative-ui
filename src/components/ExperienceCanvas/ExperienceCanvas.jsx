import './ExperienceCanvas.scss'
import scriptData from '../../assets/chapterOne.json'
import { useEffect, useState } from 'react'

export const ExperienceCanvas = () => {
  // Local state
  const [displayUi, setDisplayUi] = useState(false)
  const [sceneIndex, setSceneIndex] = useState(0)
  const [isVoiceOver, setIsVoiceOver] = useState(false)
  const [displayOptions, setDisplayOptions] = useState(false)
  const [spotIndex, setSpotIndex] = useState(0)
  const [textIndex, setTextIndex] = useState(0)
  const [optionIndex, setOptionIndex] = useState(0)

  useEffect(() => {
    if (scriptData[sceneIndex].voiceover.length > 0) {
      setIsVoiceOver(true)
      setDisplayUi(true)
    }
  }, [sceneIndex])

  useEffect(() => {
    // add class active to the first button of buttons and spots
    const buttons = document.querySelectorAll('.buttons button')
    buttons[0].classList.add('active')
  }, [])

  // Change the current scene and reset UI state
  const changeScene = (event, data) => {
    setSceneIndex(data)
    setSpotIndex(0)
    setTextIndex(0)
    setDisplayUi(false)
    setDisplayOptions(false)

    event.target.classList.add('active')

    const buttons = document.querySelectorAll('.buttons button')
    buttons.forEach((button) => {
      if (button !== event.target) {
        button.classList.remove('active')
      }
    })

    const spotButtons = document.querySelectorAll('.spots button')
    spotButtons.forEach((button) => {
      if (button !== event.target) {
        button.classList.remove('active')
      }
    })
  }

  // Change the current spot and reset UI state
  const goToSpot = (event, data) => {
    setSpotIndex(data)
    setTextIndex(0)
    setIsVoiceOver(false)
    setDisplayUi(true)
    setDisplayOptions(true)

    event.target.classList.add('active')

    const buttons = document.querySelectorAll('.spots button')
    buttons.forEach((button) => {
      if (button !== event.target) {
        button.classList.remove('active')
      }
    })
  }

  // Show the next text in the voiceover array
  const showMore = () => {
    setTextIndex(textIndex + 1)
  }

  const showMoreNPC = () => {
    setTextIndex(textIndex + 1)
    setDisplayOptions(true)
  }

  const getTextEmitter = () =>
    !isVoiceOver
      ? scriptData[sceneIndex].spots[spotIndex].spotVoiceover[textIndex].emitter
      : scriptData[sceneIndex].voiceover[textIndex].emitter

  const getTextLabel = () => (!isVoiceOver ? scriptData[sceneIndex].spots[spotIndex].label : null)

  const hasMore = () => (isVoiceOver ? hasMoreIntroText() : hasMoreSpotText())

  const getIntroText = () =>
    scriptData[sceneIndex].voiceover && scriptData[sceneIndex].voiceover[textIndex].text

  const hasMoreIntroText = () => scriptData[sceneIndex].voiceover.length > textIndex + 1

  const getSpotText = () => scriptData[sceneIndex].spots[spotIndex].spotVoiceover[textIndex].text

  const getOptionResponse = () => {
    const option =
      scriptData[sceneIndex].spots[spotIndex].spotVoiceover[textIndex].options[optionIndex]
    return option.response
  }

  const hasMoreSpotText = () =>
    scriptData[sceneIndex].spots[spotIndex].spotVoiceover.length > textIndex + 1

  const hasOptions = () =>
    scriptData[sceneIndex]?.spots[spotIndex]?.spotVoiceover[textIndex]?.options?.length > 0

  const chooseResponse = (data) => {
    setOptionIndex(data)
    setDisplayOptions(false)
  }

  return (
    <section className="ExperienceCanvas">
      <div className="meta">
        <div className="buttons">
          {scriptData.map((scene, index) => (
            <button key={index} onClick={(event) => changeScene(event, index)}>
              {scene.name}
            </button>
          ))}
        </div>
        <hr />
        <div className="spots">
          {scriptData[sceneIndex].spots.map((spot, index) => (
            <button key={index} className="spot" onClick={() => goToSpot(event, spot.index)}>
              {spot.label}
            </button>
          ))}
        </div>
      </div>
      {displayUi && (
        <div className="dialogue">
          <div className="emitter">
            {getTextEmitter() === 'narrator' && <h2 className="narrator">Le narrateur</h2>}
            {getTextEmitter() === 'innerVoice' && (
              <h2 className="narrator narrator--innerVoice">Une voix</h2>
            )}
            {getTextEmitter() === 'npc' && (
              <h2 className="narrator narrator--npc">{getTextLabel()}</h2>
            )}
          </div>

          <div className="content">
            {isVoiceOver && <p>{getIntroText()}</p>}
            {!isVoiceOver && displayOptions && <p>{getSpotText()}</p>}
            {hasOptions() && !isVoiceOver && !displayOptions && <p>{getOptionResponse()}</p>}

            {hasOptions() && hasMore() && !displayOptions && (
              <button className="more" onClick={showMoreNPC}>
                Suite...
              </button>
            )}

            {!hasOptions() && hasMore() && (
              <button className="more" onClick={showMore}>
                Suite...
              </button>
            )}

            {!hasMore() && (
              <button className="more" onClick={() => setDisplayUi(false)}>
                Fermer.
              </button>
            )}

            {hasOptions() && displayOptions && (
              <div className="options">
                {scriptData[sceneIndex].spots[spotIndex].spotVoiceover[textIndex].options.map(
                  (option, index) => (
                    <button key={index} onClick={() => chooseResponse(index)}>
                      {option.text}
                    </button>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
