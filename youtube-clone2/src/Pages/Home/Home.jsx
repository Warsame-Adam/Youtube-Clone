import "./Home.css"
import Sidebar from "../../Components/Sidebar/Sidebar"
import Feed from "../../Components/Feed/Feed"
import {useState, useEffect} from "react"

export default function Home({sidebar}) {

    const [category, setCategory] = useState(0);
    return (
        <>
        <Sidebar sidebar={sidebar} category={category} setCategory={setCategory}/>
        <div className={`container ${sidebar?"":"large-container"}`}>
            <Feed category={category} />

        </div>
        </>
        
    )
}