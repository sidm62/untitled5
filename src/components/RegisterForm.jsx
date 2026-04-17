import useForm from '../hooks/formHooks';
import { useUser } from '../hooks/apiHooks';

const RegisterForm = ({ setToggle }) => {
    const { postUser } = useUser();

    const doRegister = async () => {
        try {
            // eslint-disable-next-line react-hooks/immutability
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