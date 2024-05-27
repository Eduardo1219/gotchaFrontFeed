import { FeedEntity } from "@/model/Feed";
import callApi from "./baseService";
import { GotchaPostDto } from "@/model/GotchaPostDto";
import { methods } from "./methodsEnum";

export function getCurrentFeed(): Promise<FeedEntity> {
    const response = callApi(methods.GET, 'Feed').then(r => {
        return r;
    });

    return response;
}

export function postGotcha(dto: GotchaPostDto) {
    const response = callApi(methods.POST, 'Gotcha', dto).then(r => {
        return r;
    });

    console.log('THIS IS MY RESPONSEEEEEE', response);

    return response;
}