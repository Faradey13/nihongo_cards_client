import React, {ReactNode, useCallback, useEffect, useRef, useState} from 'react';
import {Portal} from "@/widgets/Portal/ui/Portal";
import cls from './Modal.module.scss'

import cx from 'classnames'

export interface ModalProps {
    children: ReactNode;
    isOpen?: boolean;
    onClose: () => void;
    lazy?: boolean;
}


const Modal = (props: ModalProps) => {

    const {
        children,
        lazy,
        onClose,
        isOpen
    } = props

    const [isClosing, serIsClosing] = useState(false)
    const [isMounted, setIsMounted] = useState(false)
    const timerRef = useRef<ReturnType<typeof setTimeout>>()

    const closeHandler = useCallback(() => {
        console.log(onClose)
        if (onClose) {
            serIsClosing(true)
            timerRef.current = setTimeout(() => {
                onClose()
                serIsClosing(false)
            }, 300)
        }
    }, [onClose])

    const onContentClick = (event: React.MouseEvent) => {
        event.stopPropagation()
    }
    const onOverlayClick = (event: React.MouseEvent) => {
        closeHandler()
    }

    const onKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            closeHandler()
        }
    }, [closeHandler])



    useEffect(()=> {
        if(isOpen) {
            window.addEventListener('keydown', onKeyDown)
        }
        return () => {
            clearTimeout(timerRef.current)
            window.removeEventListener('keydown', onKeyDown)
        }
    },[isOpen, onKeyDown])


    const ModalClass = cx({
        [cls.Modal]: true,
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing
    })

    useEffect(() => {
        if(isOpen){
            setIsMounted(true)
        }}, [isOpen]);

    if(lazy && !isMounted)
        return null

    return (
        <Portal>
            <div className={ModalClass}>
                <div className={cls.overlay} onClick={onOverlayClick}>
                    <div className={cls.content} onClick={onContentClick}>
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    );
};

export default Modal;