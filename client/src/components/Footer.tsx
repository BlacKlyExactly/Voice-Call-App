import React, { FC } from "react";
import styled from "styled-components";
import { black, blue, white } from "../assets/colors";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Wrapper = styled.footer`
    display: flex;
    align-items: center;
    position: relative;
    bottom: 0;
    width: 100%;
    height: 80px;
    padding: 20px;
    background: ${white};

    @media screen and (min-width: 1150px){
        position: relative;
        padding: 40px;
        margin-top: auto;
    }
`;

const Author = styled.span`
    font-size: 20px;
    color: ${black};
    font-weight: 800;

    span{
        color: ${blue};
        text-decoration: underline;
        margin-left: 8px;
        cursor: pointer;
    }

    @media screen and (min-width: 1150px){
        font-size: 25px;
    }
`;

const GithubIcon = styled.div`
    margin-left: auto;
    font-size: 40px;

    @media screen and (min-width: 800px){
        font-size: 55px;
    }
`;

const Footer: FC = () => {
    return(
        <Wrapper>
           <Author>
                Coded by
                <a href="https://blackly-exactly.netlify.app">
                    <span>BLACK</span>
                </a>
           </Author>
           <GithubIcon>
                <a href="https://github.com/BlacKlyExactly">
                    <FontAwesomeIcon icon={faGithub}/>
                </a>
            </GithubIcon>
        </Wrapper>
    )
}

export default Footer;