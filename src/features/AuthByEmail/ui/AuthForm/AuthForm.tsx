'use client'
import {useAuthStore} from "@/features/AuthByEmail/model/store/AuthStore";
import {useState} from "react";

const AuthForm = () => {


    const state = useAuthStore(state=>state)

    return (
        <div>
            <input
                type="text"
                placeholder={"email"}
                value={state.email}
                onChange={e => state.setEmail(e.target.value)}
            />
            <input
                type="text"
                placeholder={"password"}
                value={state.password}
                onChange={e => state.setPassword(e.target.value)}
            />
            <button onClick={() => state.registration(state.email, state.password)}>Регистрация</button>
            <button onClick={() => state.login(state.email, state.password)}>Логин</button>

        </div>
    );
};

export default AuthForm;