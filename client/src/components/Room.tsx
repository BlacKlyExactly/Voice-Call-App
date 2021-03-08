import React, { FC, useEffect, useState, useRef } from "react";
import styled, { css } from "styled-components";
import gsap from "gsap"
import { useMediaQuery } from 'react-responsive'
import useVoice from "../hooks/useRtc";
import { blue, room } from "../assets/colors";
import CallUser from "./CallUser";
import Chat from "./Chat";
import { Connection, Name } from "../utils/room";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard, faCommentDots, faPhoneSlash } from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";

const Wrapper = styled.div`
    position: fixed;
    display: flex;
    background: white;
    flex-direction: row;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0;
    background: ${room.light};
`;

interface CallWindowProps {
    usersCount: number | undefined;
}

const RTCWindow = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const CallWindow = styled.div<CallWindowProps>`
    display: grid;
    position: relative;
    height: 85%;
    width: 100%;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    

    @media screen and (min-width: 800px){
        height: 88%;
        max-width: 100%;

        ${({ usersCount }) => usersCount === 1 && css`
            grid-template-columns: 1fr;
            grid-template-rows: 1fr;
        `}

        ${({ usersCount }) => usersCount === 2 && css`
            grid-template-columns: repeat(2, 1fr);
        `}

        ${({ usersCount }) => usersCount && usersCount > 2 && usersCount < 6 && css`
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: repeat(2, 1fr);
        `}

        ${({ usersCount }) => usersCount && usersCount === 6 && css`
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: repeat(2, 1fr);
        `}

        ${({ usersCount }) => usersCount && usersCount > 6 && css`
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: repeat(3, 1fr);
        `}
    }
`;

const PanelButtons = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    bottom: 0;
    width: 100%;
    height: 15%;
    background: ${room.darkest};

    button{
        font-size: 20px;
        height: 60%;
        border-radius: 100vw;
        border: none;
        color: white;
    }

    @media screen and (min-width: 800px){
        max-width: 100%;
        height: 12%;

        button{
            font-size: 1.2vw;
        }
    }
`;

const LeaveButton = styled.button`
    width: 90px;
    background: ${room.red};

    @media screen and (min-width: 800px){
        width: 8vw;
    }
`;

const SimpleButton = styled.button`
    width: 60px;
    background: ${blue};
    margin-left: 10px;

    @media screen and (min-width: 800px){
        width: 4vw;
        margin-left: 1vw;
    }
`;

const Room: FC = () => {
    const [ room, setRoom ] = useState<Connection | undefined>(undefined);
    const [ chatState, setChatState ] = useState<boolean>(false);
    
    const isDesktop = useMediaQuery({
        query: "(min-width: 800px)"
    })

    const wrapper = useRef<HTMLDivElement>(null);

    const { leaveFromRoom } = useVoice(( userConnection: Connection | undefined ) => setRoom(userConnection));

    useEffect(() => {
        if(room){
            gsap.set(wrapper.current, { zIndex: 120 });
            gsap.to(wrapper.current, { duration: 0.2, ease: "expo.inOut", opacity: 1 });
            
            return;
        }

        gsap.to(wrapper.current, { duration: 0.2, ease: "expo.inOut", opacity: 0 }).then(() => {
            gsap.set(wrapper.current, { zIndex: 0 });
        })
    }, [ room ])

    const copyToClipboard = () => {
        const temp = document.createElement('input');
        document.body.appendChild(temp);

        if(room) temp.value = room?.room;
        temp.select();

        document.execCommand('copy');
        document.body.removeChild(temp);
    }

    const toggleChat = () => setChatState(( prev: boolean ) => !prev);

    return(
        <Wrapper ref={wrapper}>
            <RTCWindow>
                <CallWindow usersCount={room?.peers.length}>
                    {
                        isDesktop ? room?.peers.map(({ id, name, color }: Name ) => 
                            <CallUser 
                                key={id}
                                name={name} 
                                id={id} 
                                color={color}
                            />
                        ) : <CallUser 
                                name={room?.peers[0].name} 
                                id={room?.peers[0].id} 
                                color={room?.peers[0].color}
                            />
                    }
                </CallWindow>
                <PanelButtons>
                    <LeaveButton 
                        onClick={() => leaveFromRoom()}
                        data-tip="Leave from room"
                    >
                        <FontAwesomeIcon icon={faPhoneSlash}/>
                    </LeaveButton>
                    <SimpleButton 
                        onClick={copyToClipboard}
                        data-tip="Copy code"
                    >
                        <FontAwesomeIcon icon={faClipboard}/>
                    </SimpleButton>
                    <SimpleButton 
                        onClick={toggleChat}
                        data-tip="Toggle chat"
                    >
                        <FontAwesomeIcon icon={faCommentDots}/>
                    </SimpleButton>
                </PanelButtons>
            </RTCWindow>
            {chatState && <Chat/>}
            <ReactTooltip />
        </Wrapper>
    )
}

export default Room;