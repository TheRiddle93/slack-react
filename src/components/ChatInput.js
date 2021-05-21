import React, { useState } from "react";
import styled from "styled-components";
import SendIcon from "@material-ui/icons/Send";
import SendRoundedIcon from "@material-ui/icons/SendRounded";

function ChatInput({ sendMessage }) {
  const [input, setInput] = useState("");
  // e is for an event argument,
  const send = (e) => {
    e.preventDefault();
    if (!input) return;
    sendMessage(input);
    setInput("");
  };

  return (
    <Container>
      <InputContainer>
        <form>
          <input
            onChange={(e) => setInput(e.target.value)}
            type="text"
            value={input}
            placeholder="Message here..."
          />
          <SendButton type="submit" onClick={send}>
            <SendRounded />
          </SendButton>
        </form>
      </InputContainer>
    </Container>
  );
}

export default ChatInput;

const Container = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 24px;
  padding-top: 20px;
  background: #d2e3e6;
`;

const InputContainer = styled.div`
  border: 1px solid #8d8d8e;
  border-radius: 2px;
  background: #d2e3e6;
  form {
    display: flex;
    height: 42px;
    align-items: center;
    padding-left: 10px;
    background: #d2e3e6;
    input {
      flex: 1;
      border: none;
      font-size: 13px;
      background: #d2e3e6;
    }

    input: focus {
      outline: none;
    }
  }
`;

const SendButton = styled.button`
  background: #203f3f;
  border-radius: 6px;
  width: 42px;
  height: 31px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
  cursor: pointer;
  border: none;
    width: 28px;
  }

  :hover {
    background: #346565;
    border: none;
  }
`;

const SendRounded = styled(SendRoundedIcon)`
  color: #0b1515;
`;

// styled types are used for all html elements. styled.div is used the most because containers are divs. Other types are: styled.span, styled.p, styled.button, as long as it is an html element, it can be styled.htmlElement.
