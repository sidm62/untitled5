import useForm from '../hooks/formHooks';
import { useAuth } from '../hooks/apiHooks';
import { useNavigate } from 'react-router';

const LoginForm = () => {
    const { postLogin } = useAuth();
    const navigate = useNavigate();

    const doLogin = async () => {
        try {
            const userData = await postLogin(inputs);
            localStorage.setItem('token', userData.token);
            navigate('/');
        } catch (error) {
            alert(error.message);
        }
    };

    const { inputs, handleInputChange, handleSubmit } = useForm(doLogin, { username: '', password: '' });

    return (
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div>
                <label htmlFor="loginuser">Username</label>
                <input name="username" type="text" id="loginuser" onChange={handleInputChange} />
            </div>
            <div>
                <label htmlFor="loginpassword">Password</label>
                <input name="password" type="password" id="loginpassword" onChange={handleInputChange} />
            </div>
            <button type="submit">Login</button>
        </form>
    );
};
export default LoginForm;