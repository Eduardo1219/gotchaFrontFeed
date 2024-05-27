import { LoginDto } from "@/model/Login";
import callApi from "./baseService";
import { methods } from "./methodsEnum";
import { redirect } from 'next/navigation'
import { LoginData } from "@/store/user/userStore";



export function doLogin(dto: LoginDto) : Promise<LoginData> {
    const response = callApi(methods.POST, 'Users/login', dto)
        .then(r => {
            return r;
        });

    return response;
}