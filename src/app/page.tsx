"use client"

import { FeedEntity } from "@/model/Feed";
import { LoginDto } from "@/model/Login";
import { doLogin } from "@/services/loginService";
import { useState } from "react";
import { useRouter } from 'next/navigation'

export default function Home() {
  const [nickName, setNickName] = useState('');
  const router = useRouter()

  const onLogin = () => {
    const dto: LoginDto = { nickName }
    doLogin(dto).then(r => {
      console.log('ok')
      router.push('/feed')
    })
  }


  return (
    <div className="login-page vh-100 d-flex justify-content-center align-items-center">
      <div className="login-modal">
        <h2> Welcome to Gotcha! </h2>

        <div className="d-flex flex-row">
          <input value={nickName} onChange={(e) => setNickName(e.target?.value)} type="text" placeholder="Nickname" />
          <i className="fs-4 bi-person"></i>
        </div>
        <button onClick={() => onLogin()} disabled={nickName.length > 0 ? false : true} className="btn btn-primary">LOGIN</button>
      </div>
    </div>
  );
}
