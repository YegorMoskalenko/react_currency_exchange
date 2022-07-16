import Loader from "./loader/Loader";

const ThemeHeader = ({uahToCurrency}) => {
    return (
        <div className="header">
            <div className="header__content">
                <div className='exchange__rates'>
                    {uahToCurrency.USD === 0
                        ? <div style={{display: 'flex'}} className='exchange__rate__1 exchange__blocks'><Loader /><div style={{marginLeft: '15px'}}>UAH/USD</div></div>
                        : <div className='exchange__rate__2 exchange__blocks'>{uahToCurrency.USD} - UAH/USD</div>
                    }
                    {uahToCurrency.EUR === 0
                        ? <div style={{display: 'flex'}} className='exchange__rate__1 exchange__blocks'><Loader /><div style={{marginLeft: '15px'}}>UAH/USD</div></div>
                        : <div className='exchange__rate__2 exchange__blocks'>{uahToCurrency.EUR} - UAH/EUR</div>
                    }
                </div>
            </div>
        </div>
    );
};

export default ThemeHeader;