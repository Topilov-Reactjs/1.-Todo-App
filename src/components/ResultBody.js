import React from 'react';
import closeIcon from '../images/icon-cross.svg';

class ResultBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className='body'>
                <div className='body-inside'>
                    <div className='items'>
                        <div className='item'>
                            asdasdasdas asd
                            <div className='circle'></div>
                            <div className='close'><img src={closeIcon} alt="X" /></div>
                        </div>
                        <div className='item'>
                            asdasdasdas asd
                            <div className='circle'></div>
                            <div className='close'><img src={closeIcon} alt="X" /></div>
                        </div>
                        <div className='item'>
                            asdasdasdas asd
                            <div className='circle'></div>
                            <div className='close'><img src={closeIcon} alt="X" /></div>
                        </div>
                        <div className='item'>
                            asdasdasdas asd
                            <div className='circle'></div>
                            <div className='close'><img src={closeIcon} alt="X" /></div>
                        </div>
                        <div className='item'>
                            asdasdasdas asd
                            <div className='circle'></div>
                            <div className='close'><img src={closeIcon} alt="X" /></div>
                        </div>
                        <div className='item'>
                            asdasdasdas asd
                            <div className='circle'></div>
                            <div className='close'><img src={closeIcon} alt="X" /></div>
                        </div>
                        <div className='item'>
                            asdasdasdas asd
                            <div className='circle'></div>
                            <div className='close'><img src={closeIcon} alt="X" /></div>
                        </div>
                    </div>
                    <div className='body-bottom'>
                        <div className='text'>5 items left</div>
                        <div className='text tabs'>
                            <div className='tab active'> All </div>
                            <div className='tab'> Active </div>
                            <div className='tab'> Completed </div>
                        </div>
                        <div className='text clear-completed'>Clear Completed</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ResultBody;
