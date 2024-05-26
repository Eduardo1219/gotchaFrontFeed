"use client"

import { FeedEntity, FeedGotcha } from "@/model/Feed";
import { useEffect } from "react";

export default function GotchaFeed({ gotchaFeed }: { gotchaFeed: FeedEntity }) {
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
                                        {/* <span>- {item.creationDate.toDateString()}</span> */}
                                    </div>
                                    <div className="p-2 gotcha-content">
                                        <span>{item.content}</span>
                                    </div>
                                    {!item.isRepost && (
                                        <div>
                                            <i className="bi-send">{item.repostedGotcha?.qntdRepost ?? 0}</i>
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
                        </section>
                    )
                })
            }
        </>

    )
}
