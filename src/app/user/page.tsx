'use client'
import React, {useState} from 'react';
import cls from './user.module.scss'
import {Doughnut} from "react-chartjs-2";
import 'chart.js/auto'

const Page = () => {
    const [accSettings, setAccSettings] = useState(false)
    const [studySettings, setStudySettings] = useState(false)
    const [stats, setStats] = useState(true)
    const data = {
        labels: [
            'Red',
            'Green',
            'Yellow'
        ],
        datasets: [{

            data: [300, 50, 100],
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
            ],
            hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
            ],
            borderWidth: 0,
        }]
    };
    const handleSetStats = () => {
        setStats(true)
        setAccSettings(false)
        setStudySettings(false)
    }
    const handleSetAccSettings = () => {
        setStats(false)
        setAccSettings(true)
        setStudySettings(false)
    }
    const handleSetStudySettings = () => {
        setStats(false)
        setAccSettings(false)
        setStudySettings(true)
    }


    return (
        <div className={cls.user}>
            <div className={cls.profile}>
                <img className={cls.avatar} src="/images/photo_2023-11-02_09-08-41.jpg" alt=""/>
                <div className={cls.users_info}>
                    <span>Имя</span>
                    <span>email</span>

                </div>
                <div className={cls.settings}>
                    <button onClick={handleSetAccSettings}>настройки профиля</button>
                    <button onClick={handleSetStudySettings}>настройки обучения</button>
                    <button onClick={handleSetStats}>статистика</button>
                </div>
            </div>
            <div className={cls.accountManage}>
                {stats &&
                    <div className={cls.stats}>
                        <Doughnut data={data}/>
                    </div>}
                {accSettings &&
                    <div className={cls.accSettings}>
                        настройка акаунта
                    </div>}
                {studySettings &&
                    <div>
                        настройка учебы
                    </div>}

            </div>

        </div>
    );
};

export default Page;