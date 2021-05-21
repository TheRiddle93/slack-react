import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// . means current directory, then / for other directories/folders inside the current directory, then / the file you wish to import.
import Chat from "./components/Chat";
import Login from "./components/Login";
import styled from "styled-components";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import db from "./firebase";
import { auth, provider } from "./firebase";
import SubdirectoryArrowLeftRoundedIcon from "@material-ui/icons/SubdirectoryArrowLeftRounded";

function App() {
  // State is a database, useState stores the data fetched in getChannels(). useState() creates new database sections for the rooms channel. And setRooms can change the data inside the section.
  const [rooms, setRooms] = useState([]);

  // useState will create a new database section for user, and setUser will be able to make changes to the database section user.
  // JSON.parse() will convert the string created by JSON.stringify() into an object.
  // localStorage.getItem() gets the data stored localy in the browser with localStorage.setItem().
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  // method function to get rooms collection using the method .collection() from the created db object with imported database from firestore. .onSnapshot() method to get a Snapshot of the data inside the database.
  // This is a real time database, meaning changes in the database gets updated instantly to the website.
  const getChannels = () => {
    db.collection("rooms").onSnapshot((snapshot) => {
      // .map() selects the file doc inside the docs
      //
      setRooms(
        snapshot.docs.map((doc) => {
          // .data() fetches the data from the document.
          // .name fetches the data from the name key inside document. .id fetches the id from the document.
          return { id: doc.id, name: doc.data().name };
        })
      );
    });
  };

  // signOut function that removes the user data from localStorage. And gives the database user state to null.
  // signOut function is then passed as an 'argument' for the Header Component. Where it is then defined aswell. And then it is passed from the Header component into the <UserImage/> div Container, where it's called when the <UserImage/> is clicked.
  const signOut = () => {
    auth.signOut().then(() => {
      localStorage.removeItem("user");
      setUser(null);
    });
  };

  // To prevent getChannel() function to get called multiple times, we use the function useEffect().
  useEffect(() => {
    getChannels();
  }, []);

  return (
    <div className="App">
      <Router>
        {/* if/else condition: if not user, then show Login component, else (user) shows the application. Login not accepted = not user, Login accepted = user */}
        {!user ? (
          <Login setUser={setUser} />
        ) : (
          <Container>
            <Header signOut={signOut} user={user} />
            <Main>
              {/* defines the data that is passed inside the Sidebar (props) */}
              <Sidebar rooms={rooms} />
              <Switch>
                <Route path="/room/:channelId">
                  <Chat user={user} />
                </Route>
                {/* When creating Route the root path always needs to be last, because it's the one that is checked last. */}
                <Route path="/">
                  <Welcome>
                    <h2>Select Channel</h2>
                    <SubdirectoryArrowLeftRoundedIcon />
                  </Welcome>
                </Route>
              </Switch>
            </Main>
          </Container>
        )}
      </Router>
    </div>
  );
}
/*>signOut={signOut} user={user} */
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-rows: 38px minmax(0, 1fr);
`;

const Welcome = styled.div`
  background: #d2e3e6;
  padding-top: 290px;
  padding-left: 30px;
`;

const Main = styled.div`
  background: white;
  display: grid;
  grid-template-columns: 260px auto;
`;

export default App;

// index.js imports the code in app.js. and linkes it to html, by getElementById('root'). So everything that is made in react is linked to the index html through div id 'root'
