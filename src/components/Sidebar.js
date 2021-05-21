import React from "react";
import styled from "styled-components";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { sidebarItemsData } from "../data/SidebarData"; // .. means to go up from this folder/directory, into src folder, then from src folder into /data folder and then into /SidebarData.
import AddIcon from "@material-ui/icons/Add";
import db from "../firebase";
import { useHistory } from "react-router-dom";

//props (properties) takes/calls the data that is passed from one file to another, in this case the data is passed from the <Sidebar rooms={rooms} /> components in App.js.
function Sidebar(props) {
  // importing the useHistory() function that allows us to go from one page to another page, by using .push (adding new element to the array)
  const history = useHistory();

  // history.push pushes a new element that is the room/id, and id is the id of the channels room in the database. the goToChannel() function will be called from the channel container using onClick={goToChannel()} with the item.id as argument.
  const goToChannel = (id) => {
    if (id) {
      console.log(id);
      history.push(`/room/${id}`);
    }
  };

  // A function that adds Channels to the database from the website.
  // The new channel is first stored in the database firestore. Then the data gets sent from the database to the react app/website, or server that that the app runs on. And then the data/channel shows on the react website. That way the data that is created gets stored for the future, and won't disapear once you leave the website. This is called persistance storage.
  const addChannel = () => {
    const promptName = prompt("Enter channel name");
    // conditional to check if promptName value isn't null = true
    if (promptName) {
      db.collection("rooms").add({ name: promptName });
    }
  };

  return (
    <Container>
      <WorkspaceContainer>
        <Name>Chatty</Name>
        <NewMessage>
          <AddCircleOutlineIcon />
        </NewMessage>
      </WorkspaceContainer>
      <MainChannels>
        {sidebarItemsData.map((item) => (
          <MainChannelItem>
            {item.icon}
            {item.text}
          </MainChannelItem>
        ))}
        <MainChannelItem>
          <AddCircleOutlineIcon />
          Add
        </MainChannelItem>
      </MainChannels>
      <ChannelsContainer>
        <NewChannelContainer>
          <div>Channel</div>
          {/* runs the function addChannel() when clicking the AddIcon component on the webpage */}
          <AddIcon onClick={addChannel} />
        </NewChannelContainer>
        <ChannelsList>
          {/*Going to loop through every item in the rooms object, defined inside app.js. props is how the data is passed through app.js and sidebar.js*/}
          {props.rooms.map((item) => (
            <Channel onClick={() => goToChannel(item.id)}>
              # {item.name}
            </Channel>
          ))}
        </ChannelsList>
      </ChannelsContainer>
    </Container>
  );
}

export default Sidebar;

const Container = styled.div`
  background: #1f3e3f;
`;

const WorkspaceContainer = styled.div`
  color: white;
  height: 64px;
  display: flex;
  align-items: center;
  padding-left: 19px;
  justify-content: space-between;
  border-bottom: 1px solid #1b3535;
`;

const Name = styled.div``;

const NewMessage = styled.div`
  width: 36px;
  height: 36px;
  background: #d2e3e6;
  color: #3f0e40;
  fill: #3f0e40;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-right: 20px;
  cursor: pointer;
`;

const MainChannels = styled.div`
  padding-top: 20px;
`;

const MainChannelItem = styled.div`
  color: #d2e3e6;
  display: grid;
  grid-template-columns: 15% auto;
  height: 28px;
  align-items: center;
  padding-left: 19px;
  cursor: pointer;
  :hover {
    background: #294b51;
  }
`;

const ChannelsContainer = styled.div`
  color: #d2e3e6;
  margin-top: 10px;
`;

const NewChannelContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 28px;
  padding-left: 19px;
  padding-right: 12px;
`;

const ChannelsList = styled.div``;

const Channel = styled.div`
  height: 28px;
  display: flex;
  align-items: center;
  padding-left: 19px;
  cursor: pointer;
  :hover {
    background: #294b51;
  }
`;
