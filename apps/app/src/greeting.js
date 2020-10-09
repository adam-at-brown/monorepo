import React, { useState, useEffect } from 'react';
import { isNullOrWhitespace } from '@adam-at-brown/validatior';

export default () => {
    const [data, setData] = useState({ name: '' });

    const onSubmit = () => {
        const { name } = data;
        if (isNullOrWhitespace(name)) {
            alert('Please, type your name first.');
            return;
        }

        fetch(`/greeting?name=${name}`)
            .then((response) => response.json())
            .then(({ message }) => setData({ message, error: null }))
            .catch((error) => setData({ error }));
    };

    const { message, name, error } = data;

    return (
        <div style={{ padding: '10px' }}>
            {!!message && <div style={{ fontSize: '50px' }}>{message}</div>}
            <input
                value={name}
                onChange={(event) => setData({ name: event.target.value })}
                placeholder="Type your name"
            />
            <button onClick={onSubmit}>Submit</button>
            {error && <pre>{JSON.stringify(error)}</pre>}
        </div>
    );
};
