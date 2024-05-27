import { LoginDto } from "@/model/Login";
import callApi from "./baseService";
import { methods } from "./methodsEnum";
import { redirect } from 'next/navigation'



export function doLogin(dto: LoginDto) {
    const response = callApi(methods.POST, 'Users/login', dto)
        .then(r => {
            //store user
        });

    return response;
}