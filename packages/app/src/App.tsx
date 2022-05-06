import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import fetchFiles from './api/fetchFiles';
import './App.css';
import FileListing from './app/FileListing';
import Uploader from './app/FileListing/components/Uploader';
import CompleteFileInfo from './types/CompleteFileInfo';

const Container = styled.div`
  margin: auto;
  width: 1100px;
  @media (max-width: 1100px) {
    width: 100%;
  }
  img {
    width: 100%;
    height: auto;
  }
`;

function App() {
  return (
    <Container>
      <Uploader />
      <FileListing />
    </Container>
  );
}

export default App;
