'use client'

import AuthModal from "@/features/AuthByEmail/ui/AuthModal/AuthModal";
import {useState} from "react";
import CreateCard from "@/features/FilesUploader/ui/CreateCard/CreateCard";
import UploadFiles from "@/features/FilesUploader/ui/UploadFiles/UploadFiles";
import $api from "@/http";

import UploadCsvForm from "@/features/FilesUploader/ui/UploadCSV/UploadCSV";




export default function Home() {
    const[isModal, setIsModal] =useState(false)
    const showModal = () => {
        setIsModal(true)
        console.log(isModal)
    }
    const closeModal = () => {
        setIsModal(false)
    }
    const getUser = async () => {
        const user = await $api.get('/users/21')
        console.log(user.data)
    }
    return (
   <div>
     <button onClick={showModal}>AUTH</button>
       <AuthModal isOpen={isModal} onClose={closeModal}/>
       <CreateCard/>
       <UploadFiles/>
       <br/>
       <UploadCsvForm/>

       <button onClick={getUser}>getUser</button>

   </div>
  );
}
