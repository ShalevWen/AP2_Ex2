import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';

function LoginForm() {
    const username = useRef(null);
    const password = useRef(null);

    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const navigate = useNavigate();

    const checkUsername = function () {
        if (username.current.value.trim() === '') {
            setUsernameError('Please enter a username.');
        }
        else {
            setUsernameError('');
        }
    };

    const checkPassword = function () {
        if (password.current.value.trim() === '') {
            setPasswordError('Please enter a password.');
        }
        else {
            setPasswordError('');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (username.current.value?.trim() === '' || password.current.value?.trim() === '') {
            return;
        }

        const res = await fetch('${sessionStorage.server}/Tokens', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username.current.value,
                password: password.current.value
            })
        })
        switch (res.status) {
            case 200:
                const token = await res.text();
                sessionStorage.token = token;
                const res2 = await fetch(`${sessionStorage.server}/Users/${username.current.value}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                sessionStorage.user = JSON.stringify(await res2.json());
                navigate('/chat');
                break;
            case 404:
                alert('Incorrect username or password.');
                break;
            default:
                alert('Something went wrong, please try again.');
                break;
        }
    };
    return (

        <form id="login-form" onSubmit={handleSubmit}>
            Username: <input ref={username} onKeyUp={checkUsername} type="text" name="username" placeholder='Enter your username' />
            <span id="username-error" className="error-msg">{usernameError}</span><br />
            Password: <input ref={password} onKeyUp={checkPassword} type="password" name="password" placeholder='Enter your password' />
            <span id="password-error" className="error-msg">{passwordError}</span><br />
            <input type="submit" value="Login" className="btn" />
            <p id="register-link">Not regeistered? <Link to="/register">Click here</Link> to register.</p>

        </form>
    );
}

export default LoginForm