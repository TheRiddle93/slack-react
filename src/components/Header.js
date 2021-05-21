import React from "react";
import styled from "styled-components";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

function Header({ user, signOut }) {
  return (
    <Container>
      <Main>
        <AccessTime />
        <SearchContainer>
          <Search>
            <input type="text" placeholder="Search..." />
          </Search>
        </SearchContainer>
        <HelpOutline />
      </Main>
      <UserContainer>
        <Name>{user.name}</Name>
        <UserImage onClick={signOut}>
          <img
            src={
              user.photo
                ? user.photo
                : "https://www.npolar.no/wp-content/themes/npolar_enfold/includes/img/default-user-image.png"
            }
          />
        </UserImage>
      </UserContainer>
    </Container>
  );
}

export default Header;

const Container = styled.div`
  background: #1b3535;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: 0 1px 0 0 rgb(255 255 255 / 10%);
`;

const Main = styled.div`
  display: flex;
  margin-right: 16px;
  margin-left: 16px;
`;

const SearchContainer = styled.div`
  min-width: 400px;
  margin-left: 16px;
  margin-right: 16px;
`;

const Search = styled.div`
  box-shadow: inset 0 0 0 1px rgb(155 155 155);
  width: 100%;
  border-radius: 6px;
  display: flex;
  align-items: center;

  input {
    background-color: transparent;
    border: none;
    padding-left: 8px;
    padding-right: 8px;
    color: white;
    padding-top: 4px;
    padding-bottom: 4px;
  }

  input: focus {
    outline: none;
  }
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  padding-right: 16px;
  position: absolute;
  right: 0;
`;

/*padding is the space given within an element/container, and margin is the space given outside an element/container*/

const Name = styled.div`
  padding-right: 16px;
  color: #d2e3e6;
`;

const UserImage = styled.div`
  width: 28px;
  height: 28px;
  border: 2px solid #4e8fb2;
  border-radius: 30px;
  cursor: pointer;
  img {
    width: 100%;
    border-radius: 20px;
  }
`;

const AccessTime = styled(AccessTimeIcon)`
  color: #d2e3e6;
`;

const HelpOutline = styled(HelpOutlineIcon)`
  color: #d2e3e6;
`;
