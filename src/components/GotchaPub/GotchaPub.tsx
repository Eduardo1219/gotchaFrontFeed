"use client"

import { GotchaPostDto } from "@/model/GotchaPostDto";
import { User } from "@/model/User";
import { postGotcha } from "@/services/feedService";
import { useUserStore } from "@/store/user/userStore";
import { useState } from "react";

export default function GotchaPub({ callback }: { callback: () => void }) {
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { data, changeLoginData } = useUserStore();
    const [errorMessage, setErrorMessage] = useState('');

    const onClickBtn = () => {
        const gotcha: GotchaPostDto = {
            userId: data.id,
            description: content
        }
        setIsLoading(true);

        postGotcha(gotcha).then(s => {
            setIsLoading(false);
            data.postsDay += 1;
            console.log('erro')
            changeLoginData(data);
            setContent('');
            callback();
        }).catch(err => {
            console.log(err.message)
            setErrorMessage(err.message.split(':')[1] ?? 'Error')
            setIsLoading(false);
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
                    <img src={`${process.env.NEXT_PUBLIC_GOTCHA_API}/users/image/${data.imgBase64}`} alt="hugenerd" width="40" height="40" className="rounded-circle" />
                    <textarea maxLength={777} className="form-control" value={content} onChange={(v) => setContent(v.target.value)} placeholder="What's happening" id="exampleFormControlTextarea1" rows={2}></textarea>
                </div>
                {
                    content.length > 0 && data.postsDay >= 5 && (
                        <small className="small-warning">You have reached your daily limit! Wait until tomorrow.</small>
                    )
                }
                {
                    errorMessage.length > 0 && (
                        <small className="small-warning">{errorMessage}</small>
                    )
                }
                {!isLoading ?
                    (<button type="submit" className="btn btn-primary" disabled={content.length > 1 && data.postsDay < 5 && errorMessage.length <= 0 ? false : true} onClick={() => onClickBtn()}>gotcha</button>) :
                    (
                        <div className="spinner-border" role="status">
                            <span className="sr-only"></span>
                        </div>
                    )}
            </form>
        </section>
    )
}
