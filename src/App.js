import React, { Component } from 'react';
import Home from './pages/Home';
import './styles/App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

class App extends Component {
  constructor() {
    super()
    this.state = {
      theme: 'light'
    }
  }

  componentDidMount() {
    if (!localStorage.getItem('theme')) {
      localStorage.setItem('theme', 'light')
      document.querySelector('html').setAttribute('data-theme', 'light')
      this.setState((state)=>({
        theme: 'light'
      }))
    } else {
      document.querySelector('html').setAttribute('data-theme', localStorage.getItem('theme'))
      this.setState((state)=>({
        theme: localStorage.getItem('theme')
      }))
    }
  }
  
  render() {
    return (
      <div className='App'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home theme={localStorage.getItem('theme')}/>}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;