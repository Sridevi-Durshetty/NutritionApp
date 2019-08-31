import React from 'react';
import Search from './components/search';
import Container from '@material-ui/core/Container';

function App() {
  return (
    <Container maxWidth="sm">
    <div className="App">
      <Search/>
    </div>
    </Container>
  );
}

export default App;
