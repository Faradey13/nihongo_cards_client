'use client'

import AuthModal from "@/features/AuthByEmail/ui/AuthModal/AuthModal";
import {useState} from "react";
import $api from "@/http";
import {useUserStore} from "@/entities/User/model/store/UserStore";
import CreateRole from "@/features/Administration/UserRolesManagement/CreateRole/ui/CreateRole";
import CardsManagement from "@/features/Administration/CardsManagement/ui/CardsManagement";
import UsersManagement from "@/features/Administration/UsersManagement/ui/UsersManagement";






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
    interface Card {
        id: string;
        word: string;

    }



    const {user} = useUserStore(state => state)



    return (
   <div>

       <button onClick={showModal}>AUTH</button>
       <AuthModal isOpen={isModal} onClose={closeModal}/>
       <button onClick={getUser}>getUser</button>
       <div>
           {user && <div>{user.email}</div>}
           <CreateRole/>

       </div>
        <CardsManagement/>
   </div>
  );
}
