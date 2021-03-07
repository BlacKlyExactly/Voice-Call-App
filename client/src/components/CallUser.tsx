import React, { FC } from "react";
import styled, { css } from "styled-components";
import { white } from "../assets/colors";
import { avatarURL } from "../utils/constants";

interface CallWindowUserProps {
    bg: string | undefined
}

const CallWindowUser = styled.div<CallWindowUserProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100%;

    ${({ bg }) => css`
        background: ${bg};
    `};
`;

const Avatar = styled.img`
    width: 15%;
`;

const Nickname = styled.p`
    font-size: 150%;
    font-weight: 500;
    color: ${white};
    margin: 20px 0;
`;

const CallUser: FC<CallUserProps> = ({ id, name, color }) => (
    <CallWindowUser key={id} bg={color}>
        <Avatar src={`${avatarURL}&name=${name}`}/>
        <Nickname>{name}</Nickname>
    </CallWindowUser>
);

interface CallUserProps {
    id: string | undefined,
    name: string | undefined,
    color: string | undefined
}

export default CallUser;