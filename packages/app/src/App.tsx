import './App.css';
import Uploader from './app/Uploader';
import { useEffect } from 'react';
import fetchDatabase from './api/fetchDatabase';
import useApp from './hooks/useApp';
import styled, { createGlobalStyle } from 'styled-components';
import ContentBox from './components/ContentBox';
import CheckLoading from './components/CheckLoading';

const FillBackground = createGlobalStyle`
body {
  background-color: #959595;
}`;

const Container = styled.div`
  text-align: center;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  img {
    width: 100%;
    height: auto;
  }
  margin: auto;
  padding-top: 1.5rem;
  padding-bottom: 1rem;
  width: 60%;
  button {
    background-color: #424242;
    border: 1px solid black;
    color: white;
    padding: 0.2rem 1rem;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin-left: 0.1rem;
    margin-right: 0.1rem;
    :hover {
      background-color: #814b8c;
    }
    :active {
      background-color: #a12353;
    }
    :disabled {
      background-color: #a4a4a4;
    }
  }
  .title {
    font-size: 6em;
    padding-bottom: 0.5rem;
  }
`;

function App() {
  const { change, setChange, database, setDatabase, isLoading } = useApp();

  useEffect(() => {
    const updateDatabaseView = async () => {
      const res = await fetchDatabase();
      setDatabase(res.data);
    };
    updateDatabaseView();
  }, [change]);

  return (
    <>
      <Container>
        <ContentBox>
          <div className="title">smpl img</div>
        </ContentBox>
        <ContentBox>
          <Uploader setChange={setChange} />
        </ContentBox>
        <CheckLoading
          isLoading={isLoading}
          database={database}
          setChange={setChange}
        />
      </Container>
      <FillBackground />
    </>
  );
}

export default App;

// image order

// On initial load, ask for PW, use state to reveal main section, or implement full auth system?
