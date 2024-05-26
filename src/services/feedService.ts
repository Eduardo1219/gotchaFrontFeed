import { FeedEntity } from "@/model/Feed";
import callApi from "./baseService";

export function getCurrentFeed() : Promise<FeedEntity> {
    const response = callApi('GET', 'Feed').then(r => {
        return r;
    });

    console.log('THIS IS MY RESPONSEEEEEE', response);

    return response;
}