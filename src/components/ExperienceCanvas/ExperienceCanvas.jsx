import './ExperienceCanvas.scss'
import chapterOne from '../../assets/chapterOne.json'
import { useState } from 'react'

export default function ExperienceCanvas() {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0)
  const [displayUi, setDisplayUi] = useState(false)
  const [currentSpotIndex, setCurrentSpotIndex] = useState(0)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentSpeaker, setCurrentSpeaker] = useState('')

  const currentSpot = chapterOne[currentSceneIndex].spots[currentSpotIndex]
  const voiceover = currentSpot.voiceover
  const hasMore = currentTextIndex < voiceover.length - 1

  function changeScene(sceneIndex) {
    setCurrentSceneIndex(sceneIndex)
    resetUiState()
  }

  function goToSpot(spotIndex) {
    setCurrentSpotIndex(spotIndex)
    setCurrentSpeaker(voiceover[0].emitter)
    setCurrentTextIndex(0)
    setDisplayUi(true)
  }

  function showMore() {
    setCurrentTextIndex(currentTextIndex + 1)
    setCurrentSpeaker(voiceover[currentTextIndex + 1].emitter)
  }

  function resetUiState() {
    setDisplayUi(false)
    setCurrentSpotIndex(0)
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
      <div>
        <p>Current scene index: {currentSceneIndex}</p>
        <p>Current spot index: {currentSpotIndex}</p>
        <p>Current text index: {currentTextIndex}</p>
        <p>Current speaker: {currentSpeaker}</p>
        <p>Has more: {hasMore.toString()}</p>
        <p>Display UI: {displayUi.toString()}</p>
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
          </div>
        </div>
      )}
    </section>
  )
}
