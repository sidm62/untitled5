import useForm from '../hooks/formHooks';
import { useNavigate } from 'react-router';
import { useUserContext } from '../hooks/contextHooks';

const LoginForm = () => {

    const { handleLogin } = useUserContext();
    const navigate = useNavigate();

    const doLogin = async () => {
        try {

            // eslint-disable-next-line react-hooks/immutability
            await handleLogin(inputs);
            navigate('/');
        } catch (error) {
            console.error('Login error:', error.message);
            alert('Login failed: ' + error.message);
        }
    };

    const { inputs, handleInputChange, handleSubmit } = useForm(doLogin, {
        username: '',
        password: ''
    });

    return (
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div>
                <label htmlFor="loginuser">Username</label>
                <input
                    name="username"
                    type="text"
                    id="loginuser"
                    onChange={handleInputChange}
                    value={inputs.username}
                />
            </div>
            <div>
                <label htmlFor="loginpassword">Password</label>
                <input
                    name="password"
                    type="password"
                    id="loginpassword"
                    onChange={handleInputChange}
                    value={inputs.password}
                />
            </div>
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;