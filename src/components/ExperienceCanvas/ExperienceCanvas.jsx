import './ExperienceCanvas.scss'
import chapterOneData from '../../assets/chapterOne.json'
import { useEffect, useState } from 'react'

export default function ExperienceCanvas() {
  // Local state
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0)
  const [displayUi, setDisplayUi] = useState(false)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentSpeaker, setCurrentSpeaker] = useState('')

  const [currentSpot, setCurrentSpot] = useState(chapterOneData[currentSceneIndex])
  const [voiceover, setVoiceover] = useState(currentSpot.voiceover)
  const hasMore = currentTextIndex < voiceover.length - 1

  const initScene = () => {
    setDisplayUi(true)
    setCurrentSpeaker(voiceover[0].emitter)
  }

  useEffect(() => {
    initScene()
  }, [])

  // Change the current scene and reset UI state
  const changeScene = (sceneIndex) => {
    setCurrentSceneIndex(sceneIndex)
    resetUiState()
  }

  // Change the current spot and reset UI state
  const goToSpot = (spotIndex) => {
    setDisplayUi(true)
    setCurrentSpot(chapterOneData[currentSceneIndex].spots[spotIndex])
    setVoiceover(chapterOneData[currentSceneIndex].spots[spotIndex].voiceover)
    setCurrentSpeaker(voiceover[0].emitter)
    setCurrentTextIndex(0)
  }

  // Show the next text in the voiceover array
  const showMore = () => {
    setCurrentTextIndex(currentTextIndex + 1)
    setCurrentSpeaker(voiceover[currentTextIndex + 1].emitter)
  }

  // Reset UI state
  const resetUiState = () => {
    setDisplayUi(false)
    setCurrentTextIndex(0)
  }

  return (
    <section className="ExperienceCanvas">
      <div className="buttons">
        <h2>CHOISIR UNE SCÈNE:&nbsp;</h2>
        <button onClick={() => changeScene(0)}>Cercles mégalithiques</button>
        <button onClick={() => changeScene(1)}>Ancienne mine de phosphate</button>
      </div>
      <hr />
      {currentSceneIndex === 0 && (
        <div className="cercles">
          <button className="spot" onClick={() => goToSpot(0)}>
            Cercles de pierre
          </button>
        </div>
      )}
      {currentSceneIndex === 1 && (
        <div className="mine">
          <button className="spot" onClick={() => goToSpot(0)}>
            Outils abandonnés
          </button>
          <button className="spot spot--2" onClick={() => goToSpot(1)}>
            Entrée de la mine
          </button>
        </div>
      )}
      <canvas id="webgl"></canvas>
      {displayUi && (
        <div className="dialogue">
          {currentSpeaker === 'narrator' && <h2 className="narrator">Le narrateur</h2>}
          {currentSpeaker === 'innerVoice' && (
            <h2 className="narrator narrator--innerVoice">Une voix</h2>
          )}
          <div>
            <p>{voiceover[currentTextIndex].text}</p>
            {hasMore && (
              <button className="more" onClick={showMore}>
                Suite
              </button>
            )}
            {!hasMore && (
              <button className="more" onClick={resetUiState}>
                Fermer
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
