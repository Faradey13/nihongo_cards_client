'use client'

import AuthModal from "@/features/AuthByEmail/ui/AuthModal/AuthModal";
import {useState} from "react";
import $api from "@/http";
import {gql, useQuery} from "@apollo/client";
import GetAllCards from '@/features/Administration/CardsManage/graphQL/cardsQuery.graphql'





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

    const { loading, error, data } = useQuery<GetAllCardsData>(GetAllCards);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    return (
   <div>
       <button onClick={showModal}>AUTH</button>
       <AuthModal isOpen={isModal} onClose={closeModal}/>
       <button onClick={getUser}>getUser</button>
       <div>
           111111111111111eeee66ee
           {data?.getAllCards.map(({ id, word}) => (
               <div key={id}>
                   <h3>{word}</h3>

               </div>
           ))}
       </div>

   </div>
  );
}
