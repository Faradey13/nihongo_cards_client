import React from 'react';
import Modal from "@/widgets/Modal/ui/Modal";
import AuthForm from "@/features/AuthByEmail/ui/AuthForm/AuthForm";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;

}

const AuthModal = ({isOpen, onClose}: AuthModalProps) => {
    return (
        <Modal onClose={onClose} isOpen={isOpen} lazy>
            <AuthForm/>
        </Modal>)
};

export default AuthModal;