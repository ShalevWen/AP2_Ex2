import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function RegisterForm() {
    const username = useRef(null);
    const password = useRef(null);
    const passwordagain = useRef(null);
    const displayname = useRef(null);
    const picture = useRef(null);

    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordagainError, setPasswordagainError] = useState('');
    const [displaynameError, setDisplaynameError] = useState('');
    const [pictureError, setPictureError] = useState('');

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
        else if (password.current.value.length < 8) {
            setPasswordError('Password must be at least 8 characters long.');
        }
        else {
            setPasswordError('');
        }
        if (passwordagain.current.value !== '') {
            checkPasswordagain();
        }
    };

    const checkPasswordagain = function () {
        if (passwordagain.current.value.trim() === '') {
            setPasswordagainError('Please enter your password again.');
        }
        else if (passwordagain.current.value !== password.current.value) {
            setPasswordagainError('Passwords do not match.');
        }
        else {
            setPasswordagainError('');
        }
    };

    const checkDisplayname = function () {
        if (displayname.current.value.trim() === '') {
            setDisplaynameError('Please enter a display name.');
        }
        else {
            setDisplaynameError('');
        }
    };

    const checkPicture = function () {
        if (picture.current.value === null) {
            setPictureError('Please choose a picture.');
        }
        else {
            if (picture.current.value.endsWith('.jpg') || picture.current.value.endsWith('.jpeg')
                || picture.current.value.endsWith('.png') || picture.current.value.endsWith('.gif')) {
                setPictureError('');
            }
            else {
                setPictureError('Please choose a picture.');
            }
        }
    };

    const chackValidity = function () {
        // check that all fields are filled in and valid
        if (username.current.value.trim() === '' || password.current.value.trim() === '' || passwordagain.current.value.trim() === '' || displayname.current.value.trim() === '' || picture.current.value === ''
            || usernameError !== '' || passwordError !== '' || passwordagainError !== '' || displaynameError !== '' || pictureError !== '') {
            return false;
        }
        return true;
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        if (chackValidity() === false) {
            alert('Please fill in the form correctly.');
            return;
        }

        const file = document.getElementById('picture').files[0];
        const reader = new FileReader();
        reader.onloadend = async () => {
            const res = await fetch(`${sessionStorage.server}/Users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'username': username.current.value,
                    'password': password.current.value,
                    'displayName': displayname.current.value,
                    'profilePic': reader.result
                })
            })
            switch (res.status) {
                case 200:
                    alert('Registration successful.');
                    navigate('/');
                    break;
                case 409:
                    setUsernameError('Username already exists.');
                    break;
                default:
                    alert('Something went wrong, please try again.');
                    break;
            }
        };
        reader.readAsDataURL(file);

    };

    return (
        <form id="register-form" onSubmit={handleSubmit}>
            <table>
                <tbody>
                    <tr>
                        <td>Username:</td>
                        <td>
                            <input ref={username} onChange={checkUsername} type="text" placeholder="Choose a username" name="username" /><br />
                            <span id="username-error" className="error-msg">{usernameError}</span>
                        </td>
                        <td>Password:</td>
                        <td>
                            <input ref={password} onChange={checkPassword} type="password" placeholder="Choose a password" name="password" /><br />
                            <span id="password-error" className="error-msg">{passwordError}</span>
                        </td>
                    </tr>
                    <tr>
                        <td>Display name:</td>
                        <td>
                            <input ref={displayname} onChange={checkDisplayname} type="text" placeholder="Choose a display name" name="displayname" /><br />
                            <span id="displayname-error" className="error-msg">{displaynameError}</span>
                        </td>
                        <td>Password again:</td>
                        <td>
                            <input ref={passwordagain} onChange={checkPasswordagain} type="password" placeholder="Type your password again" name="passwordagain" /><br />
                            <span id="passwordagain-error" className="error-msg">{passwordagainError}</span>
                        </td>
                    </tr>
                    <tr>
                        <td>Picture:</td>
                        <td>
                            <input ref={picture} onChange={checkPicture} type="file" id="picture" name="picture" /><br />
                            <span id="picture-error" className="error-msg">{pictureError}</span>
                        </td>
                    </tr>
                </tbody>
            </table>
            <input type="submit" value="Register" className="btn" />
            <p id="login-link">
                Already registered? <Link to="/">Click here</Link> to login.
            </p>
        </form>
    );
}

export default RegisterForm;