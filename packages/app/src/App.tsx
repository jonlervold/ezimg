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
  const [isLoading, setIsLoading] = useState(true);
  const [files, setFiles] = useState<CompleteFileInfo[]>([]);

  const fetch = useCallback(async () => {
    const { files } = await fetchFiles();
    setFiles(files);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <Container>
      <Uploader fetch={fetch} />
      <FileListing fetch={fetch} isLoading={isLoading} files={files} />
    </Container>
  );
}

export default App;
