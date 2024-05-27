"use client"

import { GotchaPostDto } from "@/model/GotchaPostDto";
import { User } from "@/model/User";
import { postGotcha } from "@/services/feedService";
import { useUserStore } from "@/store/user/userStore";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";

export default function GotchaPub({ callback }: { callback: () => void }) {
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { data } = useUserStore();

    const onClickBtn = () => {
        const gotcha: GotchaPostDto = {
            userId: data.id,
            description: content
        }
        setIsLoading(true);
        postGotcha(gotcha).then(s => {
            setIsLoading(false);
            setContent('');
            callback();
        });
    }

    return (
        <section>
            <div className="header-feed">
                <h4>Home</h4>
                <i className="bi-lightbulb"></i>
            </div>
            <form className="gotcha-post">
                <div>
                    <img src="https://github.com/mdo.png" alt="hugenerd" width="40" height="40" className="rounded-circle" />
                    <textarea className="form-control" value={content} onChange={(v) => setContent(v.target.value)} placeholder="What's happening" id="exampleFormControlTextarea1" rows={2}></textarea>
                </div>
                {isLoading ?
                    (<Skeleton />) :
                    (
                        <button type="submit" className="btn btn-primary" disabled={content.length > 1 ? false : true} onClick={() => onClickBtn()}>tweet</button>
                    )}
            </form>
        </section>
    )
}
