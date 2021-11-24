
import './App.css';
import Post from "./Post"


function App() {
  return (
    <div className="App">

      <div className="App__header">
        <img
          src="	https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="logo" />
      </div>
      <Post username="ayushi_rai" caption="Hiii I am awesome" imageUrl="https://www.best4geeks.com/wp-content/uploads/2018/08/48-lovely-cute-girl-picture-1024x816.jpg" />
      <Post username="cm_champ" caption="I love ayushi" imageUrl="https://i.stack.imgur.com/7pHXK.jpg?s=256&g=1" />

    </div>
  );
}

export default App;
