import React, { FC, useState, ChangeEvent } from "react";
import styled, { css } from "styled-components";
import { black } from "../assets/colors";
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

const Wrapper = styled.div`
    width: 332px;
    margin: 50px 0;

    @media screen and (min-width: 800px){
        margin: 5% 20px;
    }

    @media screen and (min-width: 1150px){
        width: 580px;
        display: grid;
        grid-template-rows: repeat(3, 0.8fr);
        margin: 7% 20px;
    }
`;

interface TitleProps {
    color: string
}

const Title = styled.h1<TitleProps>`
    width: 100%;
    font-size: 41px;
    font-weight: bold;
    color: ${black};
    margin: 30px 0;

    span{
        color: ${({ color }) => color};
    }
    
    @media screen and (min-width: 1150px){
        font-size: 55px;
    }
`;

const Description = styled.p`
    font-size: 20px;
    line-height: 40px;
    color: ${black};

    @media screen and (min-width: 1150px){
        font-size: 18px;
        width: 70%;
    }
`;

const Actions = styled.div`
    margin-top: 39px;
    width: 100%;
    display: flex;
    align-items: center;
`;

interface InputProps {
    color: string,
    isBigButton?: boolean
}

const Input = styled.input<InputProps>`
    width: 173px;
    height: 53px;
    text-align: center;
    font-size: 16px;
    font-weight: 800;
    background: transparent;
    border-radius: 50vw;
    color: ${({ color }) => color};
    border: .2vw solid ${({ color }) => color};
    text-transform: uppercase;

    @media screen and (min-width: 1150px){
        height: 66px;
    }
`;

const Button = styled.button<InputProps>`
    cursor: pointer;
    width: ${({ isBigButton }) => isBigButton ? 116 : 57}px;
    height: 57px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ color }) => color};
    color: white;
    font-size: 20px;
    border-radius: 25vw;
    border: none;
    text-transform: uppercase;
    font-weight: 800;
    transition: 
        color 0.2s,
        background 0.2s;


    &:hover{
        background: white;
        color: ${({ color }) => color};
        border: .15vw solid ${({ color }) => color};
    }

    ${({ isBigButton }) => !isBigButton && css`
        margin-left: 20px;
        
        @media screen and (min-width: 800px){
            width: 66px;
            height: 66px;
        }
    `}

    ${({ isBigButton }) => isBigButton && css`
        @media screen and (min-width: 800px){
            width: 156px;
            height: 65px;
        }
    `}
`;

const Section: FC<SectionProps> = ({ 
    color, 
    firstTitlePart, 
    secondTitlePart, 
    description ,
    isInput,
    isSmallButton,
    smallButtonIcon,
    isBigButton,
    bigButtonText,
    inputPlaceholder,
    onBigButtonClick,
    onSmallButtonClick
}) => {
    const [ inputValue, setInputValue ] = useState<string>("");

    const handleInputChange = ( e: ChangeEvent<HTMLInputElement> ) => {
        e.preventDefault();
        e.target.value.length < 6 && setInputValue(e.target.value.toUpperCase());
    }

    return(
        <Wrapper>
            <Title color={color}>
                {firstTitlePart} <span>{secondTitlePart}</span>
            </Title>
            <Description>{description}</Description>
            <Actions>
                {isInput && 
                    <Input 
                        color={color} 
                        placeholder={inputPlaceholder}
                        onChange={handleInputChange}
                        value={inputValue}
                    />
                }
                {isSmallButton && smallButtonIcon && onSmallButtonClick && (
                    <Button 
                        color={color} 
                        isBigButton={!isSmallButton}
                        onClick={() => onSmallButtonClick(inputValue)}
                    >
                        <FontAwesomeIcon icon={smallButtonIcon}/>
                    </Button>
                )}
                {isBigButton && onBigButtonClick && (
                    <Button 
                        color={color} 
                        isBigButton={isBigButton}
                        onClick={() => onBigButtonClick(inputValue)}
                    >
                        {bigButtonText}
                    </Button>   
                )}
            </Actions>
        </Wrapper>
    )
}

interface SectionProps {
    color: string,
    firstTitlePart: string,
    secondTitlePart: string,
    description: string,
    isInput?: boolean,
    isSmallButton?: boolean,
    smallButtonIcon?: FontAwesomeIconProps['icon'],
    isBigButton?: boolean,
    bigButtonText?: string,
    inputPlaceholder?: string,
    onBigButtonClick?: ( inputValue: string ) => void,
    onSmallButtonClick?: ( inputValue: string ) => void
}

export default Section;