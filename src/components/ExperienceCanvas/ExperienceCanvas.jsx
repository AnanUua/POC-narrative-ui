import './ExperienceCanvas.scss'
import chapterOneData from '../../assets/chapterOne.json'
import { useEffect, useState } from 'react'

export default function ExperienceCanvas() {
  // Local state
  const [displayUi, setDisplayUi] = useState(true)
  const [sceneIndex, setSceneIndex] = useState(0)
  const [textIndex, setTextIndex] = useState(0)

  const [spot, setSpot] = useState(chapterOneData[sceneIndex])
  const [voiceover, setVoiceover] = useState(spot.voiceover)
  const [speaker, setSpeaker] = useState(voiceover[0].emitter)

  const hasMore = textIndex < voiceover.length - 1

  // Init the first scene
  useEffect(() => {
    initScene(0)
    console.log('initial scene init')
  }, [])

  const initScene = (dataSceneIndex) => {
    setSceneIndex(dataSceneIndex)
    setSpot(chapterOneData[sceneIndex])
    setVoiceover(spot.voiceover)
    setSpeaker(voiceover[0].emitter)
    setTextIndex(0)
    setDisplayUi(true)
  }

  // Change the current scene and reset UI state
  const changeScene = (sceneIndex) => {
    resetUiState()
    setSceneIndex(sceneIndex)
    initScene(sceneIndex)
  }

  useEffect(() => {
    console.log(spot)
  }, [spot])

  // Change the current spot and reset UI state
  const goToSpot = (spotIndex) => {
    setDisplayUi(true)
    setSpot(chapterOneData[sceneIndex].spots[spotIndex])
    setVoiceover(chapterOneData[sceneIndex].spots[spotIndex].voiceover)
    setSpeaker(voiceover[0].emitter)
    setTextIndex(0)
  }

  // Show the next text in the voiceover array
  const showMore = () => {
    setTextIndex(textIndex + 1)
    setSpeaker(voiceover[textIndex + 1].emitter)
  }

  // Reset UI state
  const resetUiState = () => {
    setDisplayUi(false)
    setTextIndex(0)
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
        <h2>CHOISIR UN SPOT:&nbsp;</h2>
        {sceneIndex === 0 && (
          <button className="spot" onClick={() => goToSpot(0)}>
            Cercles de pierre
          </button>
        )}
        {sceneIndex === 1 && (
          <>
            <button className="spot" onClick={() => goToSpot(0)}>
              Outils abandonnés
            </button>
            <button className="spot spot--2" onClick={() => goToSpot(1)}>
              Entrée de la mine
            </button>
          </>
        )}
      </div>
      <canvas id="webgl"></canvas>
      {displayUi && (
        <div className="dialogue">
          {speaker === 'narrator' && <h2 className="narrator">Le narrateur</h2>}
          {speaker === 'innerVoice' && <h2 className="narrator narrator--innerVoice">Une voix</h2>}
          <div>
            <p>{voiceover[textIndex].text}</p>
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
