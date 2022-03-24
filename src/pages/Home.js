import React, { Component } from 'react';
import sun from '../images/icon-sun.svg';
import moon from '../images/icon-moon.svg';
import ResultBody from '../components/ResultBody';

class Home extends Component {
    constructor(props) {
        super();
        this.state = {
            theme: props.theme === null ? 'light' : props.theme,
            update: false,
            inputValue: ''
        }
        this.toggleTheme = this.toggleTheme.bind(this)
    }

    // Toggle Theme
    toggleTheme(paramTheme) {
        let isDark = paramTheme === 'dark' ? true : false;

        localStorage.setItem('theme', isDark ? 'light' : 'dark');
        document.querySelector('html').setAttribute('data-theme', isDark ? 'light' : 'dark')
        this.setState((state) => ({
            theme: isDark ? 'light' : 'dark'
        }))
    }

    // Add Item to localstorage
    addItem(e) {
        if (e.keyCode === 13) {
            let myObject = JSON.parse(localStorage.getItem('todos'));

            let s = false;
            Object.values(myObject).forEach(element => {
                if (element.text === e.target.value.trim()) {
                    s = true;
                }
            });
            if (!s && e.target.value.trim() !== '') {
                myObject[`${Object.values(myObject).length + 1}`] = {
                    text: e.target.value,
                    active: true
                };
                e.target.value = ''
            } else {
                e.target.value = ''
            };

            localStorage.setItem('todos', JSON.stringify(myObject))
            this.setState({
                update: true
            })
        }
    }

    render() {
        const { toggleTheme } = this;
        const { theme, update } = this.state;
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
                        <input onKeyUp={(e) => this.addItem(e)} type="text" placeholder='Create a new todo...' />
                        <div style={{ cursor: 'default' }} className='circle'></div>
                    </div>
                    <div className='result'>
                        <ResultBody update={update} />
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