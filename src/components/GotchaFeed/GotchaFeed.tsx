"use client"

import "bootstrap/dist/js/bootstrap"
import { FeedEntity, FeedGotcha } from "@/model/Feed";
import { useEffect, useState } from "react";
import { repostGotcha } from "@/services/feedService";
import { RepostGotchaDto } from "@/model/RepostGotchaDto";
import { useUserStore } from "@/store/user/userStore";

export default function GotchaFeed({ gotchaFeed }: { gotchaFeed: FeedEntity }) {

    const [gotchaRepost, setGotchaRepost] = useState<FeedGotcha>()
    const [contentRepost, setContentRepost] = useState('');
    const { data } = useUserStore();

    const onRepost = () => {
        const dto: RepostGotchaDto = {
            gotchaId: gotchaRepost!?.gotchaId,
            userId: data.id,
            repostContent: contentRepost
        }

        repostGotcha(dto);
    }



    return (
        <>
            {
                gotchaFeed.feed.map((item: FeedGotcha, index) => {
                    return (
                        <section className="d-flex flex-column mt-10" key={index} style={{ marginTop: 35 }}>
                            <div className="d-flex flex-row feed-top-border">
                                <div className="d-flex flex-column p-2">
                                    <img src="https://github.com/mdo.png" alt="hugenerd" width="40" height="40" className="rounded-circle" />
                                </div>
                                <div className="d-flex flex-column align-items-start">
                                    <div className="d-flex flex-row p-2">
                                        <span><b>{item.userName + ' ' + item.userLastName} </b></span>
                                        <span className="nick-name"> @{item.userNickname}</span>
                                    </div>
                                    <div className="p-2 gotcha-content">
                                        <span>{item.content}</span>
                                    </div>
                                    {!item.isRepost && (
                                        <div className="resend-gotcha">
                                            <i onClick={() => setGotchaRepost(item)} className="bi-send" data-bs-toggle="modal" data-bs-target="#repostModal">{item.repostedGotcha?.qntdRepost ?? 0}</i>
                                        </div>
                                    )}
                                    {item.isRepost && (
                                        <div className="d-flex flex-row feed-top-border-chield" >
                                            <div className="d-flex flex-column p-2">
                                                <img src="https://github.com/mdo.png" alt="hugenerd" width="40" height="40" className="rounded-circle" />
                                            </div>
                                            <div className="d-flex flex-column align-items-start">
                                                <div className="d-flex flex-row p-2">
                                                    <span><b>{(item.repostedGotcha?.userName ?? '') + ' ' + (item.repostedGotcha?.userLastName ?? '')}</b></span>
                                                    <span className="nick-name"> @{item.repostedGotcha?.userNickname ?? ''}</span>
                                                    {/* <span>- {item.repostedGotcha?.creationDate.toDateString() ?? ''}</span> */}
                                                </div>
                                                <div className="p-2">
                                                    <span>{item.repostedGotcha?.content}</span>
                                                </div>
                                                <div>
                                                    <i className="bi-send">{item.repostedGotcha?.qntdRepost ?? 0}</i>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="modal fade" id="repostModal" tabIndex={-1} aria-labelledby="repostModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="repostModalLabel">Repsot Gotcha!</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="gotcha-post">
                                                <div>
                                                    <img src="https://github.com/mdo.png" alt="hugenerd" width="40" height="40" className="rounded-circle" />
                                                    <textarea value={contentRepost} onChange={(v) => setContentRepost(v.target.value)} className="form-control" placeholder="Say something about it" id="exampleFormControlTextarea1" rows={1}></textarea>
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row feed-top-border-chield-repost" >
                                                <div className="d-flex flex-column p-2">
                                                    <img src="https://github.com/mdo.png" alt="hugenerd" width="40" height="40" className="rounded-circle" />
                                                </div>
                                                <div className="d-flex flex-column align-items-start">
                                                    <div className="d-flex flex-row p-2">
                                                        <span><b>{(gotchaRepost?.userName ?? '') + ' ' + (gotchaRepost?.userLastName ?? '')}</b></span>
                                                        <span className="nick-name"> @{gotchaRepost?.userNickname ?? ''}</span>
                                                    </div>
                                                    <div className="p-2">
                                                        <span>{gotchaRepost?.content ?? ''}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-primary" onClick={() => onRepost()} disabled={contentRepost.length > 1 ? false : true}>Tweet</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )
                })
            }
        </>

    )
}
