import LoginForm from './loginForm/LoginForm';
import RegisterForm from './registerForm/RegisterForm';
import ChatScreen from './chatScreen/ChatScreen';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    window.usersList = {};
    window.activeUser = null;
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
