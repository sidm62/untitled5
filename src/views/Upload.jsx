import { useState } from 'react';
import useForm from '../hooks/formHooks';
import { useFile, useMedia } from '../hooks/apiHooks';
import { useNavigate } from 'react-router';

const Upload = () => {
    const [file, setFile] = useState(null);
    const { postFile } = useFile();
    const { postMedia } = useMedia();
    const navigate = useNavigate();

    const doUpload = async () => {
        try {
            const token = localStorage.getItem('token');
            // 1. Lataa tiedosto tiedostopalvelimelle
            const fileData = await postFile(file, token);
            // 2. Tallenna median tiedot Media API:iin
            // eslint-disable-next-line react-hooks/immutability
            await postMedia(fileData.data, inputs, token);

            navigate('/');
        } catch (e) {
            console.log(e.message);
            alert('Upload failed: ' + e.message);
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
                        rows={5}
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
                <img
                    src={
                        file
                            ? URL.createObjectURL(file)
                            : 'https://placehold.co/200?text=Choose+image'
                    }
                    alt="preview"
                    width="200"
                />
                <button
                    type="submit"
                    disabled={file && inputs.title.length > 3 ? false : true}
                >
                    Upload
                </button>
            </form>
        </>
    );
};

export default Upload;