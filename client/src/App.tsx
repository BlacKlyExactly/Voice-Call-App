import React, { FC, createContext, useState, useEffect, useRef } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { blue, white, orange, green } from "./assets/colors";
import { faPlus, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { Helmet } from "react-helmet";
import gsap from "gsap";
import useVoice from "./hooks/useRtc";
import Section from "./components/Section";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Room from "./components/Room";
import { Connection, getUserRoom } from "./utils/room";

const Global = createGlobalStyle`

  *,
  *::before,
  *::after {
    font-family: 'Montserrat', sans-serif;
    box-sizing: border-box;
  }

  ul,li,p,h1 {
    margin: 0;
    padding: 0;
  }

  body{
    margin: 0;
    background: ${white};
  }

  a,
  a:hover,
  a:active{
    color: inherit;
    text-decoration: inherit;
  }

  button {
    cursor: pointer;
  }
`;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  min-height: 100vh;
`;

const Sections = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;
  margin-top: 80px;

  @media screen and (min-width: 800px){
    margin-top: 20%;
  }

  @media screen and (min-width: 1300px){
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 90%;
    margin: 0;
  }
`;

interface AppContextProps {
  name: string | undefined,
  setName: ( name: string ) => void,
  userRoom: Connection | undefined,
  setUserRoom: () => void,
}

export const AppContext = createContext<AppContextProps>({
  name: undefined,
  setName: () => {},
  userRoom: undefined,
  setUserRoom: () => {}
})

const App: FC = () => {
  const [ name, setUsername ] = useState<string | undefined>(undefined);
  const [ userConnection, setUserConnection ] = useState<Connection | undefined>();

  const { connectToRoom, createRoom } = useVoice();

  const fetchUserRoom = async () => {
    const userConn: Connection | undefined = await getUserRoom();
    userConn && setUserConnection(userConn);
  }

  const sections = useRef<HTMLDivElement>(null);

  const setName = ( newName: string ) => setUsername(newName);

  return(
    <Wrapper>
      <Helmet>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap" 
          rel="stylesheet"
        />
      </Helmet>
      <Global/> 
      <AppContext.Provider value={{
        name,
        setName,
        userRoom: userConnection,
        setUserRoom: fetchUserRoom
      }}>
        <Room />
        <Navbar />
        <Sections ref={sections}>
          <Section
            color={blue}
            firstTitlePart="Join by"
            secondTitlePart="room id"
            description="You can easy join to your room by id shared by your friend or someone else you want"
            isInput={true}
            isSmallButton={true}
            smallButtonIcon={faSignInAlt}
            inputPlaceholder={"Code"}
            onSmallButtonClick={async ( id: string ) => {
              await connectToRoom(id, name);
              fetchUserRoom();
            }}
          />
          <Section
            color={orange}
            firstTitlePart="Join to"
            secondTitlePart="global"
            description="Do you want to meet someone, or just chill with random pepole ? It's your place"
            isBigButton={true}
            bigButtonText="JOIN"
            onBigButtonClick={async () => {
              await connectToRoom("GLOBAL", name);
              fetchUserRoom();
            }}
          />
          <Section
            color={green}
            firstTitlePart="Make your"
            secondTitlePart="room"
            description="It's seems u want to create your room right ? Ha. Got You. Just write your code and share it"
            isInput={true}
            isSmallButton={true}
            smallButtonIcon={faPlus}
            inputPlaceholder={"Code... Again"}
            onSmallButtonClick={async ( id: string ) => {
              await createRoom(id, name);
              await connectToRoom(id, name);
              fetchUserRoom();
            }}
          />
        </Sections>
      </AppContext.Provider>
      <Footer/>
    </Wrapper>
  )
}

export default App;
