import React, { Component } from 'react';
import CustomPaginationActionsTable from './PaginationComponent';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Welcome to moviekart
          <CustomPaginationActionsTable />
        </header>
      </div>
    );
  }
}

export default App;
