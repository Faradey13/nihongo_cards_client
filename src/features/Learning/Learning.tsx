'use client'
import {useEffect, useRef, useState} from "react";
import {Socket, io} from "socket.io-client";
import {DefaultEventsMap} from "@socket.io/component-emitter";
import cls from './Learning.module.scss'
import cx from "classnames";
import Timer from "@/widgets/Timer/ui/Timer";

interface dataProps {
    cardId: number;
    word: string;
    translation: string;
    image: string | undefined;
    audio: string | undefined;
    timeForCard: number
}

const initialState: dataProps = {
    word: 'test_word',
    cardId: 0,
    image: '/image/a.gif',
    audio: undefined,
    translation: 'test_translation',
    timeForCard: 0

}
export default function Learning() {
    const [card, setCard] = useState<dataProps>(initialState)
    const [isFront, setIsFront] = useState(true)
    const [front, setFront] = useState(false)
    const [nextCard, setNextCard] = useState(false)
    const[stopTimer, setStopTimer] = useState(false)
    const [remainingTime, setRemainingTime] = useState(0);

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
            setStopTimer(false)



        });
        socketRef.current?.on('endLesson', (message) => {
            alert(message)
            setCard(initialState)
        })

        return () => {
            socketRef.current?.disconnect();
        };
    }, []);

    const clk =  () => {

        socketRef.current?.emit('startLearning', {
            "userId": 2
        });
    };
    const clk1 = () => {
        console.log(card)

    };

    const handleRate = (grade: number | undefined) => {
        handleNextCard()

        console.log(card.timeForCard)
        if (grade) {
            socketRef.current?.emit('rateCard', {
                "grade": grade,
                "time": card.timeForCard - remainingTime,
                "cardId": card.cardId,

            });
        } else {
            console.log('ошибка отправки рейтинга')
        }


    }
    const learnClasses = cx({
        [cls.card]: true,
        [cls.click]: front,
        [cls.slide]: nextCard
    })

    const handleAnswer = () => {
        setStopTimer(true)
        setFront(true)
        if (nextCard) {
            setNextCard(false)
        }

    }
    const handleNextCard = () => {
        setNextCard(true)

        setTimeout(() => {
            setFront(false)
            setNextCard(false)
        }, 500)

    }

    const handleTimerUpdate = (time: number) => {
        setRemainingTime(time)
    }


    return (
        <div className={learnClasses}>
            <div className={cls.front}>
                {isFront ? <div>
                        <span className={cls.word}>{card.word}</span>
                        <div className={cls.playSound}></div>
                        <div className={cls.examples}></div>
                        {
                            card?.timeForCard > 0 ?
                                <Timer onFinish={handleRate} remainingTime={handleTimerUpdate} finish={stopTimer} initialTime={card.timeForCard}/>
                                :
                                <div></div>
                        }
                        <button onClick={handleAnswer}>Посмотреть ответ</button>
                        <button onClick={clk}>start</button>
                    </div>
                    :
                    <div>
                        <span className={cls.word}></span>
                        <input type="text"/>
                        <div className={cls.examples}></div>
                        <button>Посмотреть ответ</button>
                    </div>}
            </div>

            <div className={cls.back}>
                <span className={cls.translation}>{card.translation}</span>
                <span className={cls.word}>{card.word}</span>
                <div className={cls.playSound}></div>
                <img className={cls.cardImage} src={`http://localhost:5000/${card.image}`} alt="img"/>
                <div className={cls.examples}></div>
                <div className={cls.grade}>
                    <button onClick={() => handleRate(1)}>плохо</button>
                    <button onClick={() => handleRate(3)}>средне</button>
                    <button onClick={() => handleRate(5)}>хорошо</button>
                </div>
            </div>
        </div>
    );
}
