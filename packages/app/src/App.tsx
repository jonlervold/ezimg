import styled from 'styled-components';
import './App.css';
import FileListing from './app/FileListing';
import Card from './app/FileListing/components/Card';

const Container = styled.div`
  text-align: center;
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
      <Card>
        <div className="title">ezimg</div>
      </Card>
      <FileListing />
    </Container>
  );
}

export default App;

// what should go where with styled? move this style to app.css

// error handling

// loadings...

// file upload button thing
