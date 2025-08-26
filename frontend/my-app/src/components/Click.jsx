import {useState, useRef} from "react";
import axios from "axios";
import "./Click.css";

function Click({upload, close})
{
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [photoTaken , setPhotoTaken] = useState(false); 
    const [username , setUsername] = useState("");
    const [caption , setCaption] = useState("");

    let startCamera = async ()=>{
        try{
            const stream = await navigator.mediaDevices.getUserMedia({video:true});  //permission
            videoRef.current.srcObject = stream;                                     //putting live stream in <video> element
        }
        catch(err)
        {
            console.error("Camera Error: ",err);
            alert("Unable to Access Camera");
        }
    };

    let takePhoto = ()=>{
        const video = videoRef.current;  //current captured img from video frame
        const canvas = canvasRef.current;    //getting canvas dom element

        // get Context
        const context = canvas.getContext("2d");    

        // set canvas ht width
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        //draw captured img on canvas
        context.drawImage(video, 0 , 0);
        setPhotoTaken(true);

        //close live camera stream
        video.srcObject.getTracks().forEach((track)=> track.stop());
    };

    let handleSubmit = async ()=>{
      
        // get current canvas frame
        const canvas = canvasRef.current;

        // convert image inside canvas to dataURL
        const dataUrl = canvas.toDataURL("image/png");

        // convert dataURL to blob
        const blob = await(await fetch(dataUrl)).blob();

        //append in formData
        let formData = new FormData();
        formData.append("file" , blob , "photo.png");
        formData.append("username", username);
        formData.append("caption", caption);

        let url = "http://localhost:3000/upload";

        try{
            await axios.post(url , formData , {
                headers: {"Content-Type": "multipart/form-data"}
            })

            alert("Post Created SuccessFully");
            setUsername("");
            setCaption("");
            setPhotoTaken(false);
            close();   //close click
            upload();  //refresh posts
        }
        catch(err)
        {
            console.error("Error Uplaoding:", err);
            alert("Error Uplaoding Post")
        }
    }


    return(
        <div className="create-post-container">

            <h2>Camera Post</h2>

            <video
                ref={videoRef}
                autoPlay
                style={{width:"100%" , display: photoTaken? "none" : "block" }}
            />

            <canvas
                ref={canvasRef}
                style={{width:"100%" , display: photoTaken? "block" : "none"}}
            />

            {   
                !photoTaken && (
                    <>
                        <button onClick={startCamera} className="upload-button"> Start Camera </button>
                        <button onClick={takePhoto} className="upload-button"> Take Photo </button>
                    </>
                )
            }

            {
                photoTaken && (
                    <>
                        <input
                        type= "text"
                        placeholder= "Enter Username"
                        value= {username}
                        onChange= {(e)=> setUsername(e.target.value)}
                        className="text-input"
                        />

                        <br/>

                        <textarea
                        placeholder="Enter Caption"
                        value= {caption}
                        onChange= {(e)=> setCaption(e.target.value)}
                        className="caption-input"
                        />

                        <br/>

                        <button onClick={handleSubmit} className="upload-button">Upload Post</button>
                    </>
                )
            
            }
        </div>
    );
}

export default Click;