import { PlayCircleFilledWhite } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { auth, provider } from "../firebase";

// props are like paramaters for functions, but for components.
function Login(props) {
  const signIn = () => {
    // The content inside .signInWithPopup(provider)is a promise, meaning the data 'provider' delivers is 'promise the data' will come, and when the data comes, we use the .then(result) function for the data that comes. The data is then stored in the object newUser as name: result.user.diplayName etc.
    auth
      .signInWithPopup(provider)
      .then((result) => {
        const newUser = {
          name: result.user.displayName,
          photo: result.user.photoURL,
        };
        //JSON.stringify converts the newUser data into a string.
        // localStorage stores the data temporarily in the browser, not the database.
        // localStorage will store the data in the browser until we logout.
        localStorage.setItem("user", JSON.stringify(newUser));
        props.setUser(newUser);

        console.log(newUser);
      })
      // .catch() function is for when the promise of data wasn't delivered as promised, so an error happens. .then() for when the data comes, .catch() if the data doesn't come (error)
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <Container>
      <Content>
        <SlackImg src="https://images.vexels.com/media/users/3/139911/isolated/preview/1afb4038427b2bd8edd275940aea269d-chat-service-icon-by-vexels.png" />
        <h1>Sign in Chatty</h1>
        {/* onClick the signIn function gets called */}
        <SignInButton onClick={() => signIn()}>
          Sign In With Google
        </SignInButton>
      </Content>
    </Container>
  );
}

export default Login;

// For the div <Container></Container> to display, it needs to be defined in styled: const Container = styled.div``, because <Container></Container> is a div. And to use styled. it needs to be imported from "styled-components", and in order to be imported from node_modules, it needs to be installed from npm install styled-components.j
const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f8f8f8;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  background: white;
  padding: 100px;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0/ 24%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SlackImg = styled.img`
  height: 100px;
`;

const SignInButton = styled.button`
  margin-top: 50px;
  background-color: #3d8f85;
  color: white;
  border: none;
  height: 40px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 15px;
`;
