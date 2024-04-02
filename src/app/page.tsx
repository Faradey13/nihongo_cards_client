'use client'

import AuthModal from "@/features/AuthByEmail/ui/AuthModal/AuthModal";
import {useState} from "react";
import $api from "@/http";
import { useQuery} from "@apollo/client";
import GetAllCards from '@/shared/lib/graphQL/Query&Mutation/Cards/getAllCardsQuery.graphql'
import CreateRole from "@/features/Administration/UsersManage/CreateRole/ui/CreateRole";

import CardsList from "@/features/Administration/CardsManage/CardsList/ui/CardsList";
import {useUserStore} from "@/entities/User/model/store/UserStore";





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


    interface GetAllCardsData {
        getAllCards: Card[];
    }
    const {user} = useUserStore(state => state)
    const { loading, error, data } = useQuery<GetAllCardsData>(GetAllCards);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    return (
   <div>

       <button onClick={showModal}>AUTH</button>
       <AuthModal isOpen={isModal} onClose={closeModal}/>
       <button onClick={getUser}>getUser</button>
       <div>
           {user && <div>{user.email}</div>}
           <CreateRole/>
           <CardsList/>
       </div>

   </div>
  );
}
