import "./PlayVideo.css"
import video1 from "../../assets/video.mp4"
import like from "../../assets/like.png"
import dislike from "../../assets/dislike.png"
import share from "../../assets/share.png"
import save from "../../assets/save.png"
import jack from "../../assets/jack.png"
import user_profile from "../../assets/user_profile.jpg"
import { useEffect, useState } from "react"
import { API_KEY, value_converter } from "../../Data"
import moment from "moment"
import { useParams } from "react-router-dom"

export default function PlayVideo() {
    const {videoId} = useParams();

    const [APIData, setAPIData] = useState(null)
    const [otherData, setotherData] = useState(null)
    const [commentData, setcommentData] = useState([])

    const fetchvideodata = async () =>{
        const videodetails_url = ` https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY} `
        await fetch(videodetails_url).then(res=>res.json()).then(data=>setAPIData(data.items[0]))
    }
    const fetchotherdata = async () =>{
        const channeldetails_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${APIData.snippet.channelId}&key=${API_KEY}  `
        await fetch(channeldetails_url).then(res=>res.json()).then(data=>setotherData(data.items[0]))

        const commentdetails_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${API_KEY}`
        await fetch(commentdetails_url).then(res=>res.json()).then(data=>setcommentData(data.items))
    }

    useEffect( ()=> {
        fetchvideodata();

    }, [videoId])

    useEffect( ()=> {
        fetchotherdata();

    }, [APIData])


    return (
        <div className="play-video">
            <iframe  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            <h3>{APIData?APIData.snippet.title: "title here"}</h3>
            <div className="play-video-info">
                <p>{APIData?value_converter(APIData.statistics.viewCount): ""} Views &bull; {APIData?moment(APIData.snippet.publishedAt).fromNow(): ""}</p>
                <div>
                    <span><img src={like} alt="" /> {APIData?value_converter(APIData.statistics.likeCount): ""}</span>
                    <span><img src={dislike} alt="" /></span>
                    <span><img src={share} alt="" /> Share</span>
                    <span><img src={save} alt="" /> Save</span>
                </div>
            </div>
                <hr />
                <div className="publisher">
                    <img src={otherData?otherData.snippet.thumbnails.default.url: ""} alt="" />
                    <div>
                        <p>{APIData?APIData.snippet.channelTitle:""}</p>
                        <span>{otherData?value_converter(otherData.statistics.subscriberCount): ""} Subscribers</span>
                    </div>
                    <button>Subscribe</button>
                </div>
                <div className="vid-description">
                    <p>{APIData?APIData.snippet.description.slice(0,250): ""}</p>
                    <hr />
                    <h4>{APIData?value_converter(APIData.statistics.commentCount): ""} Comments</h4>
                    {commentData.map( (item, index)=> {
                    return (
                        <div key = {index} className="comment">
                    <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
                    <div>
                        <h3>{item.snippet.topLevelComment.snippet.authorDisplayName} <span>1 day ago</span></h3>
                        <p>{item.snippet.topLevelComment.snippet.textDisplay} </p>
                        <div className="comment-action">
                            <img src={like} alt="" />
                            <span>{item.snippet.topLevelComment.snippet.likeCount}</span>
                            <img src={dislike} alt=""  />
                        </div>
                    </div>
                </div>
                    )})}
                </div>
                
               
                   
                
                </div>
            
            
        
    )
}