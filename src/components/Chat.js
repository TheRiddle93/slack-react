import { orange } from "@material-ui/core/colors";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import db from "../firebase";
import { useParams } from "react-router-dom";
import firebase from "firebase";

function Chat({ user }) {
  // useParams() is a function that comes from react-router-dom that lets us fetch the room id from the URL, and we assign it to channelId that is used as an argument for the Route path rooms/channelId, which is wrapped inside the Sidebar container which selects which channel room we select.
  let { channelId } = useParams();
  const [channel, setChannel] = useState();
  const [messages, setMessages] = useState([]);

  const getMessages = () => {
    db.collection("rooms")
      .doc(channelId)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        let messages = snapshot.docs.map((doc) => doc.data());
        console.log(messages);
        setMessages(messages);
      });
  };

  const sendMessage = (text) => {
    if (channelId) {
      let payload = {
        text: text,
        timestamp: firebase.firestore.Timestamp.now(),
        user: user.name,
        userImage: user.photo,
      };
      db.collection("rooms").doc(channelId).collection("messages").add(payload);

      console.log(payload);
    }
  };

  const getChannel = () => {
    db.collection("rooms")
      .doc(channelId)
      .onSnapshot((snapshot) => {
        setChannel(snapshot.data());
        console.log(snapshot.data());
      });
  };
  // To ensure the getChannel() only gets called once, we useEffect(). Whenever [channelId] gets called, the function getChannel() inside useEffect will get called once.
  useEffect(() => {
    getChannel();
    getMessages();
  }, [channelId]);

  return (
    <Container>
      {/*Header component in the chat component */}
      <Header>
        <Channel>
          <ChannelName> # {channel && channel.name} </ChannelName>
          <ChannelInfo></ChannelInfo>
        </Channel>
        <ChannelDetails>
          <div>Details</div>
          <Info />
        </ChannelDetails>
      </Header>
      {/*MessageContainer component in the chat component */}
      <MessageContainer>
        {messages.length > 0 &&
          messages.map((data, index) => (
            <ChatMessage
              text={data.text}
              name={data.user}
              image={data.userImage}
              timestamp={data.timestamp}
            />
          ))}
      </MessageContainer>
      {/*ChatInput component in the chat component */}
      <ChatInput sendMessage={sendMessage} />
    </Container>
  );
}

export default Chat;

// styled components for each components inside the Chat.js component file.
// Container component wrapped around all other components, style works for all components inside the Container they're wrapped inside.
// min-content adjust the size of the component to fit the content inside the component.
const Container = styled.div`
  display: grid;
  grid-template-rows: 65px auto min-content;
  min-height: 0;
`;

// Padding left and right creates a 20px distance for all the components inside the Header component
// display: flex, centers the content inside the Header component.
// align-items: center, aligns the content vertically centered, inside the Header component
// border-bottom: 1px solid rgba(83, 39, 83,.13) creates a border on the bottom of the component.

const Header = styled.div`
  background: #346563;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #292a2a;
  justify-content: space-between;
`;

const Channel = styled.div``;

const ChannelName = styled.div`
  font-weight: 700;
`;

// margin top creates 8px distance outside the ChannelInfo component to the ChannelName component;
// font weight changes the thickness of the font.
const ChannelInfo = styled.div`
font-weight: 400
color: #132625;
font-size: 13px;
margin-top: 8px;
`;

//Creates a styled component for the InfoOutlinedIcon stored inside Info.
const Info = styled(InfoOutlinedIcon)`
  margin-left: 10px;
`;

// To prevent info and icon to stack on top of eachother in the ChannelDetails component, we use display: flex;
const ChannelDetails = styled.div`
  display: flex;
  align-items: center;
  color: #132625;
  margin: 20px;
`;

const MessageContainer = styled.div`
  background: #edf3f5;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

// CSS syntax:
// display: grid; will split all the components wrapped within Container into rows.
// grid-template-rows: defines each row in the grid.
