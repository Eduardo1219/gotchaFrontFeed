import { FeedEntity, FeedGotcha } from "@/model/Feed";
import callApi from "./baseService";
import { GotchaPostDto } from "@/model/GotchaPostDto";
import { methods } from "./methodsEnum";
import { RepostGotchaDto } from "@/model/RepostGotchaDto";

export function getCurrentFeed(): Promise<FeedEntity> {
    const response = callApi(methods.GET, 'Feed').then(r => {
        return r;
    });

    return response;
}

export function postGotcha(dto: GotchaPostDto) {
    const response = callApi(methods.POST, 'Gotcha', dto).then(r => {
        return r;
    }).catch(err => {
        throw err;
    });

    return response;
}

export function repostGotcha(dto: RepostGotchaDto) {

    const response = callApi(methods.POST, 'Repost', dto).then(r => {
        return r;
    }).catch(err => { throw err });

    return response;
}