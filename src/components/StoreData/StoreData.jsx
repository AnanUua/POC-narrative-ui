import { useSelector } from 'react-redux'
import './StoreData.scss'

export default function StoreData() {
  const currentIndex = useSelector((state) => state.introduction.currentIndex)
  const score = useSelector((state) => state.introduction.score)
  const isPromptComplete = useSelector(
    (state) => state.introduction.isPromptComplete
  )
  const hasExperienceStarted = useSelector(
    (state) => state.introduction.hasExperienceStarted
  )

  return (
    <div className="StoreData">
      <h2>[Store Data]</h2>
      <p>Current Index: {currentIndex}</p>
      <p>Score: {score}</p>
      <p>Is complete?: {isPromptComplete.toString()}</p>
      <p>Exp started?: {hasExperienceStarted.toString()}</p>
    </div>
  )
}
