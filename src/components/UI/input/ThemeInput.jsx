import React from 'react';
import cl from './ThemeInpute.module.css'

const ThemeInput = (props) => {
    return (
        <input className={cl.input} {...props}/>
    );
};

export default ThemeInput;