import React, { Component } from 'react';
import * as C from './components/components';

import './assets/bootstrap.css';
import './assets/main.js';
import './App.css';

class App extends Component {

  render() {
    return (
      <div>
        <C.Navbar />
        <C.Lilbar />
        <C.List />
        <C.Section />
        <C.Footer />
      </div>
    );
  }
};

export default App;
