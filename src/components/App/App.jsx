import { useSelector } from 'react-redux'

import Introduction from '../Introduction/Introduction'
import './App.scss'

import { ExperienceCanvas } from '../ExperienceCanvas/ExperienceCanvas'
import StoreData from '../StoreData/StoreData'

export default function App() {
  const hasExperienceStarted = useSelector((state) => state.introduction.hasExperienceStarted)

  return (
    <div className="App">
      {/* <Introduction /> */}
      {!hasExperienceStarted && <ExperienceCanvas />}
      <StoreData />
    </div>
  )
}
