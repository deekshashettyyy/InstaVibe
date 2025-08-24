// Files import
import CreatePost from "./components/CreatePost";
import SearchUser from "./components/SearchUser";
import ShowPost from "./components/ShowPost";
import Click from "./components/Click";
import "./components/Styles.css";

// Icons import
import { TiSocialInstagramCircular } from "react-icons/ti";
import { BsCameraFill } from "react-icons/bs";

import { useState } from "react";

function App() {

  const [showCreate , setShowCreate] = useState(false);
  const [showSearchUser, setShowSearchUser] = useState(false);
  const [showClick , setShowClick] = useState(false);
  const [refreshTrigger , setRefreshTrigger] = useState(0);

  const toggleCreatePost = ()=>{
    setShowCreate( (prev)=> !prev);
  }

  const toggleSearchUser = ()=>{
    setShowSearchUser( (prev)=> !prev);
  }

  const toggleClick = ()=>{
    setShowClick( (prev)=> !prev);
  }

  const refreshPosts = ()=>{
    setRefreshTrigger( (prev)=> prev+1);
  }

  return (
    <div className="app-container">

      <header className="app-header">
        <h1>
          <span className="Ti"> <TiSocialInstagramCircular /> </span>
          <span className="logo"> InstaVibe </span>
        </h1>
      </header>

      <main>
        <div className="action-buttons">
          <button className="plus-button"  onClick={toggleCreatePost} > + </button>
          <button className="search-user-button" onClick={toggleSearchUser} > 🔍 </button>
          <button className="camera-button" onClick={toggleClick} > <BsCameraFill /> </button>
        </div>

        { showCreate && <CreatePost refreshTrigger={setRefreshTrigger} />}
        { showSearchUser && <SearchUser /> }
        { showClick && <Click close={toggleClick} upload={refreshPosts} />}
        <ShowPost refresh={refreshTrigger} />


      </main>

    </div>
  )
}

export default App
