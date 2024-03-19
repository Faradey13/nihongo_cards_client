import {Card, UploadedFiles} from "@/features/FilesUploader/model/types/types";
import $api from "@/http";


export const uploadFiles = async (files: FormData) =>{
    try {
       return await $api.post('/files/upload', files, {
            headers: {
                'content-type': 'multipart/form-data'
            }})

    } catch (e) {
        console.log(e)
    }


}
export const uploadCard = async (card: Card) => {
    try {
        return await $api.post('/cards/create', card, {
            headers: {
                'content-type': 'multipart/form-data'

            }})

    } catch (e) {
        console.log(e)
    }

}

export const uploadCSV = async (csv: FormData) => {
    try {
        console.log(csv)
        return await $api.post('/csv/upload_table', csv)
    } catch (e) {
        console.log(e)
    }
}

