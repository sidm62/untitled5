import { useState } from 'react';
import { useNavigate } from 'react-router';
import useForm from '../hooks/formHooks';
import { useFile, useMedia } from '../hooks/apiHooks';

const Upload = () => {
    const [file, setFile] = useState(null);
    const { postFile } = useFile();
    const { postMedia } = useMedia();
    const navigate = useNavigate();

    const doUpload = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token || !file) {
                alert('Kirjaudu sisään ja valitse tiedosto');
                return;
            }


            const fileData = await postFile(file, token);


            // eslint-disable-next-line react-hooks/immutability
            await postMedia(fileData.data, inputs, token);

            // 3. Palataan kotisivulle
            navigate('/');
        } catch (e) {
            console.error(e.message);
            alert('Lataus epäonnistui');
        }
    };

    const { inputs, handleInputChange, handleSubmit } = useForm(doUpload, {
        title: '',
        description: '',
    });

    const handleFileChange = (evt) => {
        if (evt.target.files && evt.target.files[0]) {
            setFile(evt.target.files[0]);
        }
    };

    return (
        <>
            <h1>Upload</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        name="title"
                        type="text"
                        id="title"
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        name="description"
                        id="description"
                        onChange={handleInputChange}
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="file">File</label>
                    <input
                        name="file"
                        type="file"
                        id="file"
                        accept="image/*, video/*"
                        onChange={handleFileChange}
                    />
                </div>

                {file && (
                    <img
                        src={URL.createObjectURL(file)}
                        alt="preview"
                        width="200"
                    />
                )}

                <button
                    type="submit"
                    disabled={!file || inputs.title.length < 3}
                >
                    Upload
                </button>
            </form>
        </>
    );
};

export default Upload;