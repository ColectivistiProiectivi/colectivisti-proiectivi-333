import { styled } from '@mui/material'
import React from 'react'

interface InboxItemProps {
  img: string
  text: string
  children: string
}

export const InboxItem: React.FC<InboxItemProps> = ({ img, text, ...children }) => {
  return (
    <ConversationContainer>
      <ConversationTop>
        <ConversationImage src={img} alt="avatar" />
        <ConversationName>{text}</ConversationName>
      </ConversationTop>
      <LastMessage>{children.children}</LastMessage>
    </ConversationContainer>
  )
}

const ConversationContainer = styled('div')`
  display: flex;
  color: ${props => props.theme.palette.common.black};
  background: ${props => props.theme.palette.common.white};
  flex-direction: column;
  cursor: pointer;
  height: 55px;
  padding: 10px;
  border-radius: 15px;
  margin-top: 2px;
  :hover {
    opacity: 0.8;
  }
`

const ConversationImage = styled('img')`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
`

const ConversationTop = styled('div')`
  display: flex;
  width: 100%;
  flex-flow: row wrap;
  gap: 10px;
`

const ConversationName = styled('p')`
  font-weight: 450;
  border-radius: 20px;
  width: fit-content;
  margin: 0;
`

const LastMessage = styled('div')`
  font-weight: 450;
  font-style: italic;
  margin-left: 42px;
  font-size: 12px;
  position: relative;
  top: -10px;
`
//   return (
//     <ListItem>
//       <img src={img}></img>
//       <p>{children.children}</p>
//       <p> {text} </p>
//     </ListItem>
//   )
// }

// const ListItem = styled('div')`
//   display: flex;
// `
