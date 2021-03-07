import React, { FC, useContext, ChangeEvent } from "react";
import styled from "styled-components";
import { AppContext } from "../App";
import { black, blue, white } from "../assets/colors";

const Wrapper = styled.nav`
    position: fixed;
    display: flex;
    background: ${white};
    align-items: center;
    z-index: 100;
    top: 0;
    left: 0;
    display: flex;
    width: 100%;
    padding: 20px;
    box-shadow: 00 2px 10px rgba(0, 0, 0, 0.2);

    @media screen and (min-width: 1000px){
        height: 176px;
        padding: 60px;
        box-shadow: none;
    }

    @media screen and (min-width: 1300px){
        background: transparent;
    }
`;

const Selects = styled.div`
    margin-left: auto;
`;

const Brand = styled.span`
    font-size: 22px;
    font-weight: 900;
    color: ${blue};

    @media screen and (min-width: 1000px){
        font-size: 35px;
    }
`;

const Input = styled.input`
    width: 133px;
    height: 45px;
    text-align: center;
    font-size: 16px;
    font-weight: 800;
    background: transparent;
    border-radius: 50vw;
    color: ${white};
    background: ${black};
    border: none;

    @media screen and (min-width: 1000px){
      width: 290px;
      height: 60px;
      font-size: 20px;
    }

    &::placeholder{
      color: white;
      opacity: 0.8;
      font-weight: 400;
    }
`;

const Navbar: FC = () => {
    const { setName } = useContext(AppContext);

    return(
        <Wrapper>
            <Brand>Voice Call App</Brand>
            <Selects>
                <Input 
                    placeholder="Name..."
                    onChange={( e: ChangeEvent<HTMLInputElement> ) => setName(e.target.value)}
                />
            </Selects>
        </Wrapper>
    )
}

export default Navbar;