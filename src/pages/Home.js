import React, { Component } from 'react';
import sun from '../images/icon-sun.svg';
import moon from '../images/icon-moon.svg';
import ResultBody from '../components/ResultBody';

class Home extends Component {
    constructor(props) {
        super();
        this.state = {
            theme: props.theme === null ? 'light' : props.theme
        }
        this.toggleTheme = this.toggleTheme.bind(this)
    }

    toggleTheme(paramTheme) {
        let isDark = paramTheme === 'dark' ? true : false;

        localStorage.setItem('theme', isDark ? 'light' : 'dark');
        document.querySelector('html').setAttribute('data-theme', isDark ? 'light' : 'dark')
        this.setState((state) => ({
            theme: isDark ? 'light' : 'dark'
        }))
    }

    render() {
        const { toggleTheme } = this;
        const { theme } = this.state;
        return (
            <div className='home'>
                <div className='top'></div>
                <div className='bottom'></div>
                <div className='content'>
                    <div className='top-part'>
                        <div className='title'>TODO</div>
                        <div onClick={() => toggleTheme(localStorage.getItem('theme'))} className='theme'><img src={theme === 'light' ? moon : sun} alt="theme" /></div>
                    </div>
                    <div className='search-part'>
                        <input type="text" placeholder='Create a new todo...' />
                        <div className='circle'></div>
                    </div>
                    <div className='result'>
                        <ResultBody />
                        <div className='footer'>
                            Drag and drop to reorder list
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;