import React, { Component } from 'react';
import HomeView from './home-view/home-view';

class App extends Component {
  constructor(){
    super();
  }

  render() {
    return (
      <div className="App">
        <HomeView />
      </div>
    );
  }
}

export default App;
