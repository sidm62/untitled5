import useForm from '../hooks/formHooks';
import { primeUser } from '../hooks/apiHooks';

const RegisterForm = ({ setToggle }) => {
    const { postUser } = primeUser();

    const doRegister = async () => {
        try {
            await postUser(inputs);
            setToggle(true);
        } catch (error) {
            alert(error.message);
        }
    };

    const { inputs, handleInputChange, handleSubmit } = useForm(doRegister, { username: '', password: '', email: '' });

    return (
        <form onSubmit={handleSubmit}>
            <h1>Register</h1>
            <div>
                <label htmlFor="reguser">Username</label>
                <input name="username" type="text" id="reguser" onChange={handleInputChange} />
            </div>
            <div>
                <label htmlFor="regemail">Email</label>
                <input name="email" type="email" id="regemail" onChange={handleInputChange} />
            </div>
            <div>
                <label htmlFor="regpass">Password</label>
                <input name="password" type="password" id="regpass" onChange={handleInputChange} />
            </div>
            <button type="submit">Register</button>
        </form>
    );
};
export default RegisterForm;