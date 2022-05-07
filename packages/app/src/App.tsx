import styled from 'styled-components';
import './App.css';
import FileListing from './app/FileListing';

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
      <FileListing />
    </Container>
  );
}

export default App;
