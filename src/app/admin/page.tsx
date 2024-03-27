'use client'
import cls from './admin.module.scss'
import {useState} from "react";
import UploadCsvForm from "@/features/Administration/FilesUploader/ui/UploadCSV/UploadCSV";

const Page = () => {
    const [csv, setCsv] = useState(false)
    const [activeTab, setActiveTab] = useState<string | null>(null)
    const handleTabClick = (tab: string) => {
        setActiveTab(activeTab === tab ? null : tab)
    }

    return (
        <div className={cls.admin}>
            <div className={cls.sidebar}>
                <div className={cls.tab} onClick={() => handleTabClick('users')}>
                    Пользователи
                    {activeTab === 'users' && (
                        <div className={cls.submenu}>
                            <div>Список польщователей</div>
                            <div>Найти пользователя</div>
                            <div>Забанить пользователя</div>
                            <div>Выдать роль</div>
                            <div>Создать роль</div>
                        </div>
                    )}

                </div>
                <div className={cls.tab} onClick={() => handleTabClick('cards')}>
                    Карты
                    {activeTab === 'cards' && (
                        <div className={cls.submenu}>
                            <div>Список карт</div>
                            <div>Найти карту</div>
                            <div>Удалить карту</div>
                            <div>Добавить карту</div>
                            <div>Редактировать карту</div>
                            <div onClick={() => {setCsv(true)}}>Загрузить таблицу</div>
                            <div>Загрузить медиафайлы</div>
                        </div>
                    )}

                </div>
                <div className={cls.tab} onClick={() => handleTabClick('settings')}>
                    настройки
                    {activeTab === 'settings' && (
                        <div className={cls.submenu}>
                            <div>Настройки обучения</div>
                            <div>Настройки сайта</div>
                        </div>
                    )}

                </div>
            </div>
            <div className={cls.workArea}>
                <UploadCsvForm/>
            </div>
        </div>
    );
};

export default Page;