"use client"

import { GotchaPostDto } from "@/model/GotchaPostDto";
import { User } from "@/model/User";
import { postGotcha } from "@/services/feedService";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useRouter } from 'next/navigation';

export default function GotchaPub({ user, callback }: { user: User, callback: () => void }) {
    const [content, setContent] = useState('');
    const router = useRouter()
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const onClickBtn = () => {
        const gotcha: GotchaPostDto = {
            userId: user.userId,
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
                    <input type="email" className="form-control" id="inputEmail3" placeholder="What's happening"
                        value={content} onChange={(v) => setContent(v.target.value)} />
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
