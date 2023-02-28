import { useDispatch } from 'react-redux'
import { startExperience } from '../../features/main/introduction'
import './StartButton.scss'

export default function StartButton() {
  const dispatch = useDispatch()

  const endIntroduction = () => {
    dispatch(startExperience())
  }

  // Template
  return (
    <button className="StartButton" onClick={() => endIntroduction()}>
      Start the experience
    </button>
  )
}
