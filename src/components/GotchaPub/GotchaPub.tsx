"use client"

import { User } from "@/model/User";

export default function GotchaPub({ user }: { user: User }) {

    return (
        <section>
            <div className="header-feed">
                <h4>Home</h4>
                <i className="bi-lightbulb"></i>
            </div>
            <form className="gotcha-post">
                <div>
                    <img src="https://github.com/mdo.png" alt="hugenerd" width="40" height="40" className="rounded-circle" />
                    <input type="email" className="form-control" id="inputEmail3" placeholder="What's happening" />
                </div>
                <button type="submit" className="btn btn-primary" disabled>tweet</button>
            </form>
        </section>
    )
}
