import {useState} from "react";
import axios from "axios";


function SearchUser()
{
    const [username, setUsername] = useState("");
    const [searched , setSearched] = useState(false);
    const [searchResult , setSearchResult] = useState([]);
    const [error , setError] = useState("");

    let handleSearch = ()=>{
        if(!username.trim())
        {
            return;
        }

        let url = `https://instavibe-2j3l.onrender.com/show?username=${username}`;

        axios.get(url)
        .then((response)=>{
            setSearched(true);
            setSearchResult(response.data);
            setError("");
           
        })
        .catch((err)=>{
            setSearched(true);
            setError("Error fetching post");
            setSearchResult([]);
        });
    }


    return(
        <div className="search-user-container">

            <input
            type="text"
            placeholder="Search by username"
            onChange = { (e)=> setUsername(e.target.value)}
            value = {username}
            className="search-input"
            />

            <button 
            onClick={handleSearch}
            className="search-btn"
            >Search</button>

            {error && <p className="error-message">{error}</p>}

            <div className="search-results">
                {
                    searched && !error ? (
                        searchResult.length>0 ? (
                            searchResult.map((fileObj)=> (

                                <div key={fileObj._id} className="post-card">
                                    <div className="post-image-container">
                                        <img
                                        src = {fileObj.file_url}
                                        alt = {fileObj.file_name}
                                        className="post-image"
                                        />
                                    </div>

                                    <div className="post-footer">
                                        <p className="post-caption">{fileObj.caption}</p>
                                    </div>
                                </div>

                            ))
                        ) : ( <p>No Posts found for this username</p> )
                    ) : null
                }
            </div>

        </div>
    );
}

export default SearchUser;