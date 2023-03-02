import './ExperienceCanvas.scss'
import chapterOneData from '../../assets/chapterOne.json'
import { useEffect, useState } from 'react'

export const ExperienceCanvas = () => {
  const scriptData = chapterOneData
  // Local state
  const [displayUi, setDisplayUi] = useState(false)
  const [sceneIndex, setSceneIndex] = useState(0)
  const [isVoiceOver, setIsVoiceOver] = useState(false)
  const [spotIndex, setSpotIndex] = useState(0)
  const [textIndex, setTextIndex] = useState(0)

  useEffect(() => {
    if (scriptData[sceneIndex].voiceover.length > 0) {
      setIsVoiceOver(true)
      setDisplayUi(true)
    }
  }, [sceneIndex])

  // Change the current scene and reset UI state
  const changeScene = (sceneIndex) => {
    setSpotIndex(0)
    setTextIndex(0)
    setDisplayUi(false)
    setSceneIndex(sceneIndex)
  }

  // Change the current spot and reset UI state
  const goToSpot = (spotIndex) => {
    setSpotIndex(spotIndex)
    setTextIndex(0)
    setIsVoiceOver(false)
    setDisplayUi(true)
  }

  // Show the next text in the voiceover array
  const showMore = () => {
    setTextIndex(textIndex + 1)
  }

  const getTextEmitter = () =>
    !isVoiceOver
      ? scriptData[sceneIndex].spots[spotIndex].voiceoverspot[textIndex].emitter
      : scriptData[sceneIndex].voiceover[textIndex].emitter

  const hasMore = () => (isVoiceOver ? hasMoreIntroText() : hasMoreSpotText())

  const getIntroText = () =>
    scriptData[sceneIndex].voiceover && scriptData[sceneIndex].voiceover[textIndex].text
  const hasMoreIntroText = () => scriptData[sceneIndex].voiceover.length > textIndex + 1

  const getSpotText = () => scriptData[sceneIndex].spots[spotIndex].voiceoverspot[textIndex].text
  const hasMoreSpotText = () =>
    scriptData[sceneIndex].spots[spotIndex].voiceoverspot.length > textIndex + 1

  return (
    <section className="ExperienceCanvas">
      <div className="buttons">
        <h2>CHOISIR UNE SCÈNE:&nbsp;</h2>
        {scriptData.map((scene, index) => (
          <button onClick={() => changeScene(index)}>{scene.name}</button>
        ))}
      </div>
      <hr />
      <div>
        <h2>CHOISIR UN SPOT:&nbsp;</h2>
        {scriptData[sceneIndex].spots.map((spot) => (
          <button className="spot" onClick={() => goToSpot(spot.index)}>
            {spot.label}
          </button>
        ))}
      </div>
      <canvas id="webgl"></canvas>
      {displayUi && (
        <div className="dialogue">
          {getTextEmitter() === 'narrator' ? (
            <h2 className="narrator">Le narrateur</h2>
          ) : (
            <h2 className="narrator narrator--innerVoice">Une voix</h2>
          )}
          <div>
            <p>{isVoiceOver ? getIntroText() : getSpotText()}</p>
            {hasMore() ? (
              <button className="more" onClick={showMore}>
                Suite
              </button>
            ) : (
              <button className="more" onClick={() => setDisplayUi(false)}>
                Fermer
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
