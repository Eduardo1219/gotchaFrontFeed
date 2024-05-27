import { FeedGotcha } from "@/model/Feed";
import { User } from "@/model/User";
import styles from "./styles.module.css"





export default function Sidebar(props: any) {
    return (
        <div className="d-flex flex-column justify-content-between align-items-center" style={{ minHeight: "100vh" }}>
            <div className="container-fluid">
                <div className="row flex-nowrap">
                    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-white navbar">
                        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2"
                            style={{
                                maxHeight: '80%',
                                minHeight: '95%',
                                position: 'fixed',
                                top: 0,
                            }}>
                            <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-decoration-none">
                                <i className="fs-4 bi-twitter" />
                            </a>
                            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                                <li className="nav-link">
                                    <i className="fs-4 bi-house"></i>
                                    <span className="ms-1 d-none d-sm-inline">Home</span>
                                </li>
                                <li className="nav-link">
                                    <i className="fs-4 bi-bell"></i>
                                    <span className="ms-1 d-none d-sm-inline">Notifications</span>
                                </li>
                                <li className="nav-link">
                                    <i className="fs-4 bi-envelope"></i>
                                    <span className="ms-1 d-none d-sm-inline">Messages</span>
                                </li>
                                <li className="nav-link">
                                    <i className="fs-4 bi-bookmark"></i>
                                    <span className="ms-1 d-none d-sm-inline">Bookmarks</span>
                                </li>
                                <li className="nav-link">
                                    <i className="fs-4 bi-chat-left-text"></i>
                                    <span className="ms-1 d-none d-sm-inline">Lists</span>
                                </li>
                                <li className="nav-link">
                                    <i className="fs-4 bi-person"></i>
                                    <span className="ms-1 d-none d-sm-inline">Profile</span>
                                </li>
                                <li className="nav-link">
                                    <i className="fs-4 bi-three-dots"></i>
                                    <span className="ms-1 d-none d-sm-inline">More</span>
                                </li>
                                <li className="align-self-center">
                                    <button className="btn btn-primary align-midle">Tweet</button>
                                </li>
                            </ul>
                            <hr />
                            <div className="d-flex flex-row align-items-center justify-content-between">
                                <img src="https://github.com/mdo.png" alt="hugenerd" width="30" height="30" className="rounded-circle" />
                                <div className='d-flex flex-column align-items-center justify-content-evenly'>
                                    <span className="d-none d-sm-inline">{(props.user.userName ?? '') + ' ' + (props.user.userLastName ?? '')}</span>
                                    <span className="d-none d-sm-inline nick-name">@{props.user.nickName ?? ''}</span>
                                </div>
                                <div className='d-none d-sm-inline'>
                                    <i className="bi-three-dots dots" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`col py-0 px-0 col-12 col-md-8 col-lg-6 ${styles.sideBorder}`}>
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    );
}