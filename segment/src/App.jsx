import { useState } from "react"
import Popup from "./components/Popup"
import "./App.css"

function App() {

  const [show, setShow] = useState(false)

  return (
    <div className="mainPage">
      <div className="topBar">
        <button className="saveSegBtn" onClick={()=>setShow(true)}>Save segment</button>
      </div>

      {show && (
        <Popup closePopup={()=>setShow(false)} />
      )}
    </div>
  )
}

export default App
