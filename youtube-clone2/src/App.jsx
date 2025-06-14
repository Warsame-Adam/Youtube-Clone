import Navbar from "./Components/Navbar/Navbar"
import {Route, Routes} from 'react-router-dom'
import Home from './Pages/Home/Home'
import Video from './Pages/Video/Video'
import  {useState} from "react"





export default function App() {

  const [sidebar, setsidebar] = useState(true)
  return (
    <div >
      <Navbar setsidebar={setsidebar}/>
      <Routes>
        <Route path='/' element={<Home sidebar={sidebar} />} />
        <Route path='/video/:categoryId/:videoId' element={<Video/>} />
      </Routes>

    </div>
  )
}