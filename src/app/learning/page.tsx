'use client'
import React, {useState} from 'react';
import Learning from "@/features/Learning/Learning";
import cls from './learningPage.module.scss'
import cx from "classnames";

const Page = () => {

    const [learning, setLearning] = useState(true)
    const [show, setShow] = useState(false)

    const learnPageClasses = cx({
        [cls.learningBlock] : true,
        [cls.hide] : learning,
        [cls.show] : show
    })
    const learnButtonClasses = cx({
        [cls.hide] : !learning,
        [cls.btnLearning] : true
    })

    const handleStartLearning = () => {
        setLearning(false)
        setShow(true)
    }

    return (
        <div className={cls.learning}>
            <div className={learnPageClasses}>
                <Learning/>
            </div>
            <button onClick={handleStartLearning} className={learnButtonClasses} >Начать учебу</button>
        </div>

    );
};

export default Page;