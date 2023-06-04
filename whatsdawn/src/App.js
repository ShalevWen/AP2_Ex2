import LoginForm from './loginForm/LoginForm';
import RegisterForm from './registerForm/RegisterForm';
import ChatScreen from './chatScreen/ChatScreen';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    const port = 5000
    sessionStorage.server = "http://" + window.location.hostname + ":" + port + "/api"
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path='/register' element={<RegisterForm />} />
                <Route path='/chat' element={<ChatScreen />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
