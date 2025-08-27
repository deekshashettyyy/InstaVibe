import {useState} from "react";
import axios from "axios";
import "./Styles.css";

function CreatePost(props)
{
    const [username, setUsername] = useState("");
    const [caption , setCaption] = useState("");
    const [file , setFile] = useState(null);
    const [msg , setMsg] = useState("");

    let handleFileChange = (e)=>{
        setFile(e.target.files[0]);
    }

    let handleSubmit = async (e)=>{
        e.preventDefault();

        if(!file || !username.trim() || !caption.trim())
        {
            setMsg("Please enter name , caption and select file");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("username", username);
        formData.append("caption", caption);

        let url = "https://instavibe-2j3l.onrender.com/upload"

        try
        {
            await axios.post(url, formData, { headers: {"Content-Type" : "multipart/form-data"} });

            setMsg("Post created sucessfully!");
            props.refreshTrigger(
                (prev) => prev + 1
            );

            setUsername("")
            setCaption("");
            setFile(null);
        }
        catch(err)
        {
            console.log(err);
            setMsg("Error Uploading post");
        }
    }


    return(
        <div className="create-post-container">

            <h2>Create New Post</h2>

            <form className="upload-form" onSubmit={handleSubmit}>
                <input
                type="text"
                placeholder="Username"
                onChange= {(e)=> setUsername(e.target.value)}
                value = {username}
                className="text-input"
                />

                <textarea
                placeholder="Write Caption ..."
                onChange= {(e)=> setCaption(e.target.value)}
                value = {caption}
                className="caption-input" 
                />

                <input
                type="file"
                onChange= {handleFileChange}
                className="file-input"
                />

                <button type="submit" className="upload-button">Upload</button>

            </form>

            {msg && <p className="message">{msg}</p>}

        </div>
    );
}

export default CreatePost;