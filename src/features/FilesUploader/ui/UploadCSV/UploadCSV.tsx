import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { AxiosError } from 'axios';
import {uploadCSV} from "@/features/FilesUploader/model/service/filesService";
import $api from "@/http";

const UploadCsvForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const { getRootProps, getInputProps } = useDropzone({
        accept: {'text/csv': []},
        onDrop: async (acceptedFiles) => {
            if (acceptedFiles.length === 0) {
                return;
            }

            const file: File = acceptedFiles[0];

            setIsSubmitting(true);
            setUploadError(null);

            try {
                const formData = new FormData();
                formData.append('csv', file);

                const response = await uploadCSV(formData)
                console.log(response)

            } catch (error) {
                const axiosError = error as AxiosError;
                if (axiosError.message) {
                    setUploadError(axiosError.message);
                } else {
                    setUploadError('Неизвестная ошибка');
                }
            } finally {
                setIsSubmitting(false);
            }
        }
    });

    return (
        <div>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Перетащите CSV-файл сюда или нажмите, чтобы выбрать</p>
            </div>
            {uploadError && <span>{uploadError}</span>}
            {isSubmitting && <span>Загрузка...</span>}
        </div>
    );
};

export default UploadCsvForm;