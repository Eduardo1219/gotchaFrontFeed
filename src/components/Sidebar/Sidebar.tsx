import { FeedGotcha } from "@/model/Feed";
import { User } from "@/model/User";
import styles from "./styles.module.css"





export default function Sidebar(props: any) {
    return (
        <div className="d-flex flex-column justify-content-between align-items-center" style={{ minHeight: "100vh" }}>
            <div className="container-fluid">
                <div className="row flex-nowrap">
                    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-white navbar">
                        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 min-vh-100 min-vw-20">
                            <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-decoration-none">
                                <i className="fs-4 bi-twitter" />
                            </a>
                            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                                <li className="nav-item">
                                    <a href="#" className="nav-home px-0 align-middle">
                                        <i className="fs-4 bi-house"></i>
                                        <span className="ms-1 d-none d-sm-inline">Home</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="nav-link px-0 align-middle">
                                        <i className="fs-4 bi-hash"></i>
                                        <span className="ms-1 d-none d-sm-inline">Explore</span></a>
                                </li>
                                <li>
                                    <a href="#" className="nav-link px-0 align-middle">
                                        <i className="fs-4 bi-bell"></i>
                                        <span className="ms-1 d-none d-sm-inline">Notifications</span></a>
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