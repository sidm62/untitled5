import { useState } from 'react';

const useForm = (callback, initState) => {
    const [inputs, setInputs] = useState(initState);

    const handleSubmit = (event) => {
        if (event) {
            event.preventDefault();
        }
        callback();
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInputs((prevInputs) => ({
            ...prevInputs,
            [name]: value,
        }));
    };

    return {
        handleSubmit,
        handleInputChange,
        inputs,
    };
};

export default useForm;