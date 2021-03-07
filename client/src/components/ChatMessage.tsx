import { FC, useContext, useEffect, useRef } from "react";
import styled,  { css } from "styled-components";
import { AppContext } from "../App";
import { room, white } from "../assets/colors";
import { avatarURL } from "../utils/constants";
import ReactTooltip from "react-tooltip";
import gsap from "gsap";

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    margin: 1vw;
`;

const Avatar = styled.img`
    width: 50px;
    height: 50px;

    @media screen and (min-width: 800px){
        width: 3vw;
        height: 3vw;
    }
`;

interface MessageProps {
    isSender: boolean
}

const Message = styled.div<MessageProps>`
    background: ${room.light};
    padding: 20px;
    border-radius: 100vw;
    font-size: 12px;
    color: ${white};
    margin-left: 10px;
    max-width: 69%;
    word-wrap: break-word;

    ${({ isSender }) => isSender && css`
        background: ${room.blue};
        margin-left: auto;
        margin-right: 8%;
        text-align: right;
    `}
`;

const ChatMessage: FC<ChatMessageProps> = ({ username, message }) => {
    const { name } = useContext(AppContext);

    const msg = useRef<HTMLDivElement>(null);

    useEffect(() => {
        msg.current && gsap.from(msg.current, { opacity: 0, y: 10, ease: "expo.inOut" });
    }, [])

    return(
        <Wrapper ref={msg}>
            {username !== name && (
                <Avatar 
                    src={`${avatarURL}&name=${username}`}
                    data-tip={username}
                />
            )}
            <Message isSender={name === username}>
                {message}
            </Message>
            <ReactTooltip />
        </Wrapper>
    )
}

interface ChatMessageProps {
    username: string,
    message: string,

}

export default ChatMessage;