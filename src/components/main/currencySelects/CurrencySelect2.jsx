import React from 'react';

const CurrencySelect2 = ({options, defaultValue, value, onChange}) => {
    return (
        <select className='select__currency'
            value={value}
            onChange={event => onChange(event.target.value)}
        >
            <option disabled value=''>{defaultValue}</option>
            {options.map(option =>
                <option key={option} value={option}>
                    {option}
                </option>
            )}
        </select>
    );
};

export default CurrencySelect2;