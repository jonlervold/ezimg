import './App.css';
import FileListing from './app/FileListing';
import Card from './app/FileListing/components/Card';
import Container from './app/FileListing/components/styles/Container';

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
