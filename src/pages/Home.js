import React, { Component } from 'react';
import sun from '../images/icon-sun.svg';
import moon from '../images/icon-moon.svg';
import closeIcon from '../images/icon-cross.svg';

class Home extends Component {
    constructor(props) {
        super();
        this.state = {
            theme: props.theme === null ? 'light' : props.theme,
            inputValue: '',
            todos: {},
            todosForMap: {},
            filter: 'all',
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
                todos: JSON.parse(localStorage.getItem('todos'))
            }, this.filter)
        }
    }

    // ComponentDidMount Lifecycle
    componentDidMount() {
        if (localStorage.getItem('todos')) {
            this.setState({
                todos: JSON.parse(localStorage.getItem('todos'))
            }, this.filter)
        } else {
            this.filter()
        }
    }

    // Convert Array to Object
    toObject(arr) {
        var rv = {};
        for (var i = 0; i < arr.length; ++i)
            rv[`${i}`] = arr[i];
        return rv;
    }

    // Filter Items (All, Active, Completed)
    filter() {
        if (this.state.filter === 'all') {
            this.setState((state) => ({
                todosForMap: state.todos
            }))
        } else if (this.state.filter === 'active') {
            this.setState((state) => ({
                todosForMap: this.toObject(Object.values(state.todos).filter(item => item.active === true))
            }))
        } else {
            this.setState((state) => ({
                todosForMap: this.toObject(Object.values(state.todos).filter(item => item.active === false))
            }))
        }
        localStorage.setItem('todos', JSON.stringify(this.state.todos))
    }

    // Change Filter Property of Items in order to Filter
    changeFilter(toWhich) {
        this.setState({
            filter: toWhich
        }, this.filter)
    }

    // Delete Item Function
    delete(text) {
        Object.values(this.state.todos).forEach((item, index) => {
            if (item.text === text) {
                let myObject = this.toObject(Object.values(this.state.todos).filter(item => item.text !== text))
                this.setState({
                    todos: myObject
                }, this.filter)
            }
        })
    }

    // Make Completed Function
    makeCompleted(text) {
        Object.values(this.state.todos).forEach((item, index) => {
            if (item.text === text) {
                Object.values(this.state.todos)[index].active = !Object.values(this.state.todos)[index].active;
            }
        })
        this.setState({
            todos: this.state.todos
        }, this.filter)
    }

    // Clear Completed
    clearCompleted() {
        let myArray = [];
        Object.values(this.state.todos).forEach((item) => {
            if (item.active === true) {
                myArray.push(item)
            }
        })
        this.setState({
            todos: this.toObject(myArray)
        }, this.filter)
    }

    render() {
        const { toggleTheme } = this;
        const { theme, todos, todosForMap, filter } = this.state;
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

                        <div className='body'>
                            <div className='body-inside'>
                                <div className='items'>
                                    {Object.keys(todosForMap).map((key, index) => (
                                        <div key={key} className={`item ${todosForMap[key].active ? '' : 'disabled'}`}>
                                            {todosForMap[key].text}
                                            <div onClick={() => this.makeCompleted(todosForMap[key].text)} className='circle'></div>
                                            <div onClick={() => this.delete(todosForMap[key].text)} className='close'> <img src={closeIcon} alt="X" /> </div>
                                        </div>
                                    ))}
                                </div>
                                <div className='body-bottom'>
                                    <div className='text'>{Object.values(todos).length} item{`${Object.values(todos).length > 1 ? 's' : ''}`} left</div>
                                    <div className='text tabs'>
                                        <div onClick={() => this.changeFilter('all')} className={`tab ${filter === 'all' ? 'active' : ''}`}> All </div>
                                        <div onClick={() => this.changeFilter('active')} className={`tab ${filter === 'active' ? 'active' : ''}`}> Active </div>
                                        <div onClick={() => this.changeFilter('completed')} className={`tab ${filter === 'completed' ? 'active' : ''}`}> Completed </div>
                                    </div>
                                    <div onClick={() => this.clearCompleted()} className='text clear-completed'>Clear Completed</div>
                                </div>
                            </div>
                            <div className='body-bottom-mobile'>
                                <div className='text tabs'>
                                    <div onClick={() => this.changeFilter('all')} className={`tab ${filter === 'all' ? 'active' : ''}`}> All </div>
                                    <div onClick={() => this.changeFilter('active')} className={`tab ${filter === 'active' ? 'active' : ''}`}> Active </div>
                                    <div onClick={() => this.changeFilter('completed')} className={`tab ${filter === 'completed' ? 'active' : ''}`}> Completed </div>
                                </div>
                            </div>
                        </div>

                        <div className='footer'>
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;