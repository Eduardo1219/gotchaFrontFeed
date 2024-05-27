//import { StorageValue, persist } from "zustand/middleware";
import { create } from 'zustand'
import { persist } from 'zustand/middleware';

export type LoginData = {
    id: string;
    name: string;
    lastName: string;
    nickname: string;
    email: string;
    postsDay: string;
}

type Action = {
    changeLoginData: (data: LoginData) => void,
    resetState: () => void
}

type LoginDataProps = {
    data: LoginData;
}

export const useUserStore = create<LoginDataProps & Action>((set) => ({
    data: {
        id: "",
        name: "",
        lastName: "",
        nickname: "",
        email: "",
        postsDay: "",
    },
    changeLoginData: (changeData) => set(() => ({
        data: changeData
    })),
    resetState: () => set(() => ({
        data: {
            id: "",
            name: "",
            lastName: "",
            nickname: "",
            email: "",
            postsDay: "",
        }
    })),
}));