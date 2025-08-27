import {useState , useEffect} from "react";
import axios from "axios";

function ShowPost(props)
{
    const [files , setFiles] = useState([]);

    useEffect(()=>{
        fetchFiles();
    }, []);

    useEffect( ()=>{
        fetchFiles();
    }, [props.refresh]);

    const fetchFiles = ()=>{

        let url = "https://instavibe-2j3l.onrender.com/show";

        axios.get(url)
        .then((response)=> setFiles(response.data))
        .catch( (error) => alert("Error fetching files", error));
    }

    const formatTime = (time)=> {

        const date = new Date(time);
        return date.toLocaleString();
    }

    const handleDelete = (id)=>{
        
        let url = `https://instavibe-2j3l.onrender.com/delete/${id}`;

        axios.delete(url)
        .then( ()=> fetchFiles())
        .catch( (err) => console.log("Error deleting files" , err));

    }


    return(
        <div className="show-posts-container">
            <h2>Your Feed</h2>

            <div className="posts-grid">
                {
                    files.map( (file)=>(
                        <div key={file._id} className="post-card">

                            <div className="post-image-container">
                                <img 
                                src={file.file_url}
                                alt={file.file_name}
                                className="post-image" 
                                />
                            </div>

                            <div className="post-footer">
                                <p className="post-caption">{file.caption} </p>
                                <p className="post-time">{formatTime(file.uploadTime)}</p>

                                <button
                                className="delete-button"
                                onClick={()=> handleDelete(file._id)}>Delete</button>
                            </div>

                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default ShowPost;