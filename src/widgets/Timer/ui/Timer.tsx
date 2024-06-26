'use client'
import React, {useEffect, useState} from 'react';

interface TimerProps{
    initialTime: number;
    finish: boolean;
    remainingTime: (time: number) => void;
    onFinish: (grade: number | undefined) => void
}
const Timer: React.FC<TimerProps> = ({initialTime, finish, remainingTime, onFinish}) => {
    const [time, setTime] = useState<number>(initialTime)

    useEffect(() => {
        let Interval:any;

        if (!finish && time > 0) {
            console.log('го таймер')
            Interval = setInterval(() => {
                setTime(prevTime => {
                    const updatedTime = prevTime - 1;
                    remainingTime(updatedTime);
                    return updatedTime;
                });
            }, 1000);
        } else if(time === 0) {
            onFinish(1)
            setTime(initialTime)
            return () => clearInterval(Interval)
        } else if(finish) {
            console.log('cтоп таймер')
            setTime(initialTime)
            return () => clearInterval(Interval)

        }


        return () => clearInterval(Interval)
    }, [finish, time]);

    const formatTime = () => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        const lostTime = time
        if(finish) {
            return
        }
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };


    return (
        <div>
            {formatTime()}
        </div>
    );
};

export default Timer;