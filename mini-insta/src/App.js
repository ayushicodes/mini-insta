
import React, { useState, useEffect } from "react"
import './App.css';
import Post from "./Post"
import { db, auth } from "./firebase"
import { Box, Input } from "@material-ui/core";
import { Modal } from "@material-ui/core";
import { Button } from "@material-ui/core";
import ImageUpload from "./ImageUpload";

// Modal Styling
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



// useState
function App() {
  const [posts, setPosts] = useState([])
  const [open, setOpen] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [user, setUser] = useState(null);
  const [openSignIn, setOpenSignIn] = useState('')


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser)
        setUser(authUser)

      }
      else {
        setUser(null);
      }
    })
    return () => {
      unsubscribe();
    }

  }, [user, username])



  //  useEffect
  useEffect(() => {
    db.collection('post').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id, post: doc.data()
      })))
    })
  }, [])


  // signUp
  const signUp = (event) => {
    event.preventDefault();
    auth.createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          updateProfile: username
        })
      })
      .catch((error) => alert(error.message))
    setOpen(false)
  }

  const signIn = (event) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message))
    setOpenSignIn(false)
  }
  // return 
  return (
    <div className="App">

      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ) : (
        <h3>Login to upload</h3>)
      }


      {/* Modal  start*/}
      < Modal open={open}
        onClose={() => setOpen(false)
        }
      >

        <Box sx={style}>
          <form className="app__signup">
            <center>
              <img
                className="app__headerImage"
                src="	https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt="logo" />
            </center>
            <Input
              placeholder="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit" onClick={signUp}>Sign Up </Button>

          </form>

        </Box>
      </Modal >
      {/* Modal End */}

      < Modal open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >

        <Box sx={style}>
          <form className="app__signup">
            <center>
              <img
                className="app__headerImage"
                src="	https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt="logo" />
            </center>
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit" onClick={signIn}>Sign In </Button>

          </form>

        </Box>
      </Modal >


      <div className="App__header">
        <img
          className="app__headerImage"
          src="	https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="logo" />
      </div>
      {
        user ? (
          <Button onClick={() => auth.signOut()}>logout</Button>
        ) : (
          <div className="app__loginCointainer">

            <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
            <Button onClick={() => setOpen(true)}>Sign Up</Button>
          </div>
        )
      }





      {/* Mapping */}
      {
        posts.map(({ id, post }) => (
          <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
        ))
      }
    </div >
  );
}

export default App;
