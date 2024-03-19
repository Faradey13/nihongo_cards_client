import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import $api from "@/http";
import {uploadFiles} from "@/features/FilesUploader/model/service/filesService";

const UploadFiles: React.FC = () => {
    const [files, setFiles] = useState<File[]>([]);

    const { getRootProps, getInputProps } = useDropzone({

        maxFiles: 1000,
        onDrop: (acceptedFiles) => {
            setFiles(acceptedFiles.map((file) => file));
        },
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        files.forEach((file) => formData.append('files', file));

        try {
            const response = uploadFiles(formData)
        } catch (error) {
            console.log(error);
        }
    };



    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Перетащите файлы сюда или нажмите кнопку "Выбрать файлы"</p>
                </div>
                <button type="submit">Отправить</button>
            </form>
            {files.length > 0 && (
                <ul>
                    {files.map((file) => (
                        <li key={file.name}>{file.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UploadFiles;