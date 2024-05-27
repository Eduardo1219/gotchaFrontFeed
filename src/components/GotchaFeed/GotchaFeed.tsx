"use client"

import "bootstrap/dist/js/bootstrap"
import { FeedEntity, FeedGotcha } from "@/model/Feed";
import { use, useEffect, useState } from "react";
import { repostGotcha } from "@/services/feedService";
import { RepostGotchaDto } from "@/model/RepostGotchaDto";
import { useUserStore } from "@/store/user/userStore";
import { useRouter } from "next/navigation";
import { convertDate } from "@/helper/utils";
import { Button, Modal } from "react-bootstrap";

export default function GotchaFeed({ gotchaFeed, filterFeed, filterOnType, callback }:
    {
        gotchaFeed: FeedGotcha[],
        filterFeed: (latest: boolean) => void,
        filterOnType: (type: string) => void,
        callback: () => void
    }) {

    const [gotchaRepost, setGotchaRepost] = useState<FeedGotcha>()
    const [contentRepost, setContentRepost] = useState('');
    const { data, changeLoginData } = useUserStore();
    const [filterLatest, setFilterLatest] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [show, setShow] = useState(false);
    const router = useRouter();

    const handleClose = () => setShow(false);
    const openModal = () => {
        setErrorMessage('');
        setContentRepost('');
        setShow(true);
    };
    const onRepost = () => {
        if (data.postsDay >= 5) {
            setErrorMessage('You have reached your daily posts limit');
            return;
        }

        const dto: RepostGotchaDto = {
            gotchaId: gotchaRepost!?.gotchaId,
            userId: data.id,
            repostContent: contentRepost
        }

        repostGotcha(dto).then(s => {
            data.postsDay += 1;
            changeLoginData(data);
            callback();
            handleClose();
        }).catch(err => {
            setErrorMessage(err.message.split(':')[1] ?? 'Error');
        });
    }

    useEffect(() => {
        filterFeed(filterLatest);
    }, [filterLatest])

    return (
        <section className="d-flex flex-column mt-10" style={{ marginTop: 35 }}>
            <div className="d-flex flex-row filter-gotchas">
                <div className="d-flex flex-row">
                    <input placeholder="Type your search" type="text" onChange={(v) => filterOnType(v.target.value)}></input>
                    <i className="fs-4 bi-search"></i>
                </div>
                <div className="d-flex flex-row">
                    <button onClick={() => setFilterLatest(!filterLatest)} className={`btn ${filterLatest ? 'btn-primary' : 'btn-outline-primary'}`}>Latest</button>
                    <button onClick={() => setFilterLatest(!filterLatest)} className={`btn ${!filterLatest ? 'btn-primary' : 'btn-outline-primary'}`}>Trend</button>
                </div>
            </div>
            {
                gotchaFeed.map((item: FeedGotcha, index) => {
                    return (

                        <div className="d-flex flex-row feed-top-border" key={index}>
                            <div className="d-flex flex-column p-2">
                                <img src={`${process.env.NEXT_PUBLIC_GOTCHA_API}/users/image/${item.userImg}`} alt="hugenerd" width="40" height="40" className="rounded-circle" />
                            </div>
                            <div className="d-flex flex-column align-items-start">
                                <div className="d-flex flex-row p-2">
                                    <span><b>{item.userName + ' ' + item.userLastName + ' '} </b></span>
                                    <span className="nick-name"> @{item.userNickname}</span>
                                    <span>- {convertDate(new Date(item.creationDate))}</span>
                                </div>
                                <div className="p-2 gotcha-content">
                                    <span>{item.content}</span>
                                </div>
                                {!item.isRepost && item.userId != data.id && (
                                    <div className="resend-gotcha">
                                        <i onClick={() => { setGotchaRepost(item); openModal(); }} className="bi-send">{item.qntdRepost ?? 0}</i>
                                    </div>
                                )}
                                {item.isRepost && (
                                    <div className="d-flex flex-row feed-top-border-chield" >
                                        <div className="d-flex flex-column p-2">
                                            <img src={`${process.env.NEXT_PUBLIC_GOTCHA_API}/users/image/${item.repostedGotcha?.userImg}`} alt="hugenerd" width="40" height="40" className="rounded-circle" />
                                        </div>
                                        <div className="d-flex flex-column align-items-start">
                                            <div className="d-flex flex-row p-2">
                                                <span><b>{(item.repostedGotcha?.userName ?? '') + ' ' + (item.repostedGotcha?.userLastName ?? '')}</b></span>
                                                <span className="nick-name"> @{item.repostedGotcha?.userNickname ?? ''}</span>
                                                <span>- {convertDate(new Date(item.repostedGotcha!?.creationDate))}</span>
                                            </div>
                                            <div className="p-2">
                                                <span>{item.repostedGotcha?.content}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                })
            }

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
                                    <img src={`${process.env.NEXT_PUBLIC_GOTCHA_API}/users/image/${data.imgBase64}`} alt="hugenerd" width="40" height="40" className="rounded-circle" />
                                    <textarea maxLength={777} value={contentRepost} onChange={(v) => setContentRepost(v.target.value)} className="form-control" placeholder="Say something about it" id="exampleFormControlTextarea1" rows={1}></textarea>
                                </div>
                                <small className="small-warning">{errorMessage}</small>
                            </div>
                            <div className="d-flex flex-row feed-top-border-chield-repost" >
                                <div className="d-flex flex-column p-2">
                                    <img src={`${process.env.NEXT_PUBLIC_GOTCHA_API}/users/image/${gotchaRepost?.userImg ?? ''}`} alt="hugenerd" width="40" height="40" className="rounded-circle" />
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
                            <button type="button" className="btn btn-primary" onClick={() => onRepost()} disabled={contentRepost.length > 1 && errorMessage.length <= 0 ? false : true}>gotcha</button>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Repsot Gotcha!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="gotcha-post">
                        <div>
                            <img src={`${process.env.NEXT_PUBLIC_GOTCHA_API}/users/image/${data.imgBase64}`} alt="hugenerd" width="40" height="40" className="rounded-circle" />
                            <textarea maxLength={777} value={contentRepost} onChange={(v) => setContentRepost(v.target.value)} className="form-control" placeholder="Say something about it" id="exampleFormControlTextarea1" rows={1}></textarea>
                        </div>
                        <small className="small-warning">{errorMessage}</small>
                    </div>
                    <div className="d-flex flex-row feed-top-border-chield-repost" >
                        <div className="d-flex flex-column p-2">
                            <img src={`${process.env.NEXT_PUBLIC_GOTCHA_API}/users/image/${gotchaRepost?.userImg ?? ''}`} alt="hugenerd" width="40" height="40" className="rounded-circle" />
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
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-primary" onClick={() => onRepost()} disabled={contentRepost.length > 1 && errorMessage.length <= 0 ? false : true}>gotcha</button>
                </Modal.Footer>
            </Modal>
        </section>

    )
}
