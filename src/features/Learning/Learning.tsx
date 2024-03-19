'use client'
import {useEffect, useRef, useState} from "react";
import { Socket, io } from "socket.io-client";
import {DefaultEventsMap} from "@socket.io/component-emitter";
interface dataProps {
    cardId: number;
    word: string;
    translation: string;
    image: string | undefined;
    audio: string| undefined;
}
const initialState: dataProps = {
    word: '',
    cardId: 0,
    image: undefined,
    audio: undefined,
    translation: ''

}
export default function Learning() {
    const [card, setCard] = useState<dataProps>(initialState)


    const socketRef = useRef<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null);
    useEffect(() => {

        console.log('useEffect started')
        socketRef.current = io('ws://localhost:5002', {
            transportOptions: {
                withCredentials: true,
                polling: {
                    extraHeaders: {
                        'user-id': '1'
                    }

                }
            },

        });

        socketRef.current.connect()
        console.log(socketRef.current)
        socketRef.current.on('connect', () => {
            console.log('Connected to WebSocket server');
        });
        socketRef.current.on('connect', () => {
            socketRef.current?.emit('hello')
        });

        socketRef.current.on('newCard', (data) => {
                setCard(data[0])


        });
       socketRef.current?.on('endLesson', (message) => {
           alert(message)
           setCard(initialState)
       })

        return () => {
            socketRef.current?.disconnect(); // Отключаем сокет при размонтировании компонента
        };
    }, []);

    const clk = () => {
        console.log('req for cards')

        socketRef.current?.emit('startLearning', {
            "limit": 0,
            "newLimit": 11,
            "userId": 1
        });
    };
    const clk1 = () => {
        console.log(card)

    };

    const handleRate = (grade: number| undefined) => {

        if(grade) {
            socketRef.current?.emit('rateCard', {
                "grade": grade,
                "cardId": card.cardId,

            });
        } else {
            console.log('ошибка отправки рейтинга')
        }


    }


    return (
        <div>

            <div >
                <h1 >Страница обучения</h1>
                {/*<img src={a} alt=""/>*/}

                <span >`слово {card?.word}`</span><input type="text"/>
                <button  onClick={clk}>start learning</button>
                <button onClick={clk1}>fffff</button>
                <button  onClick={()=>handleRate(1)}>1</button>
                <button onClick={()=>handleRate(3)}>2</button>
                <button  onClick={()=>handleRate(5)}>3</button>
                {
                    card.image?
                        <div>11</div>
                        :
                        <div>22</div>
                }


            </div>

        </div>
    );
}
