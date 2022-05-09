import './App.css';
import FileManager from './app/FileManager';
import Card from './components/styles/Card';
import Container from './components/styles/Container';

function App() {
  return (
    <Container>
      <Card>
        <div className="title">ezimg</div>
      </Card>
      <FileManager />
    </Container>
  );
}

export default App;

// what should go where with styled? move this style to app.css

// error handling

// loadings...

// file upload button thing
