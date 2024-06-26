import './App.css';
import {db, auth} from "./firebase.js";
import {useEffect, useState} from 'react';
import Header from './Header';
import Post from './Post';


function App() {
  const [user, setUser] = useState();
  const [posts, setPosts] = useState([]);

    useEffect(()=>{



      db.collection("posts").orderBy("timestamp","desc").onSnapshot((snapshot)=>{
        setPosts(snapshot.docs.map(function(document){
          return {id:document.id,info:document.data()}
        }))
      })
    },[]);

    return (
      <div className="App">

        <Header setUser={setUser} user = {user}></Header>
        {
          posts.map(function(val){
            return(
              <Post info={val.info} id={val.id}/>
            )
          })
        }
      </div>
    );
}
export default App;