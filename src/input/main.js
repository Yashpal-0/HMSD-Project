import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './css/main.css'; // Import external CSS for styling

const Input = () => {
    const [file, setFile] = useState(null);
    const [parameters, setParameters] = useState({
        dateRange: '',
        otherParameter: ''
    });

    const onDrop = (acceptedFiles) => {
        if (acceptedFiles[0]?.type !== 'image/tiff') {
            alert("Only TIFF files are allowed.");
            return;
        }
        setFile(acceptedFiles[0]);
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setParameters((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!file) {
            alert("Please upload a TIFF file.");
            return;
        }
        const formData = new FormData();
        formData.append("file", file);
        formData.append("dateRange", parameters.dateRange);
        formData.append("otherParameter", parameters.otherParameter);

        console.log("Submitting:", formData);
    };

    return (
        <div className="input-container">
            <h2 className="heading">Upload Your Data</h2>
            <p className="description">Upload a .TIFF file to proceed.</p>

            <div {...getRootProps()} className="dropzone">
                <input {...getInputProps()} />
                <p className="dropzone-text">
                    {file ? file.name : "Drag & drop your .TIFF file here or click to upload"}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="form">
                <button type="submit" className="submit-button">Submit</button>
            </form>
        </div>
    );
};

export default Input;
