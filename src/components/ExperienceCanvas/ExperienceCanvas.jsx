import './ExperienceCanvas.scss'
import chapterOneData from '../../assets/chapterOne.json'
import { useEffect, useState } from 'react'

export const ExperienceCanvas = () => {
  const scriptData = chapterOneData

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

  // Change the current scene and reset UI state
  const changeScene = (data) => {
    setSceneIndex(data)
    setSpotIndex(0)
    setTextIndex(0)
    setDisplayUi(false)
    setDisplayOptions(false)
  }

  // Change the current spot and reset UI state
  const goToSpot = (data) => {
    setSpotIndex(data)
    setTextIndex(0)
    setIsVoiceOver(false)
    setDisplayUi(true)
    setDisplayOptions(true)
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
      <div className="buttons">
        <h2>CHOISIR UNE SCÈNE:&nbsp;</h2>
        {scriptData.map((scene, index) => (
          <button key={index} onClick={() => changeScene(index)}>
            {scene.name}
          </button>
        ))}
      </div>
      <hr />
      <div>
        <h2>CHOISIR UN SPOT:&nbsp;</h2>
        {scriptData[sceneIndex].spots.map((spot, index) => (
          <button key={index} className="spot" onClick={() => goToSpot(spot.index)}>
            {spot.label}
          </button>
        ))}
      </div>
      <canvas id="webgl"></canvas>
      {displayUi && (
        <div className="dialogue">
          <span>SHOW OPTIONS? </span>
          {displayOptions.toString()}
          <p>//////</p>
          <div className="emitter">
            {getTextEmitter() === 'narrator' && <h2 className="narrator">Le narrateur</h2>}
            {getTextEmitter() === 'innerVoice' && (
              <h2 className="narrator narrator--innerVoice">Une voix</h2>
            )}
            {getTextEmitter() === 'npc' && <h2 className="narrator">{getTextLabel()}</h2>}
          </div>

          <div className="content">
            {isVoiceOver && <p>{getIntroText()}</p>}
            {!isVoiceOver && displayOptions && <p>{getSpotText()}</p>}
            {hasOptions() && !isVoiceOver && !displayOptions && (
              <p style={{ color: 'red' }}>{getOptionResponse()}</p>
            )}

            {hasOptions() && hasMore() && !displayOptions && (
              <button className="more" onClick={showMoreNPC}>
                Suite
              </button>
            )}

            {!hasOptions() && hasMore() && (
              <button className="more" onClick={showMore}>
                Suite
              </button>
            )}

            {!hasMore() && (
              <button className="more" onClick={() => setDisplayUi(false)}>
                Fermer
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
