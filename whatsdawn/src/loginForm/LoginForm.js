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

    const handleSubmit = (event) => {
        event.preventDefault();
        if (username.current.value?.trim() === '' || password.current.value?.trim() === '') {
            return;
        }

        if (window.usersList[username.current.value] !== undefined) {
            const user = window.usersList[username.current.value];
            if (user.password === password.current.value) {
                window.activeUser = user;
                navigate('/chat');
            }
        }
        else {
            alert('Incorrect username or password.');
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