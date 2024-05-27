"use client"

import { LoginDto } from "@/model/Login";
import { doLogin } from "@/services/loginService";
import { useState } from "react";
import { useRouter } from 'next/navigation'
import { useUserStore } from "@/store/user/userStore";

export default function Home() {
  const [nickName, setNickName] = useState('');
  const router = useRouter();
  const { data, changeLoginData } = useUserStore();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const onLogin = () => {
    const dto: LoginDto = { nickName }
    setLoading(true);
    doLogin(dto).then(r => {
      changeLoginData(r);
      router.push('/feed');
    })
      .catch(err => {
        setErrorMessage(err.message.split(':')[1] ?? 'Erro')
        setLoading(false);
      })
  }


  return (
    <div className="login-page vh-100 d-flex justify-content-center align-items-center">
      <div className="login-modal">
        <h2> Welcome to Gotcha! </h2>

        <div className="login-align">
          <div className="d-flex flex-row">
            <input value={nickName} onChange={(e) => setNickName(e.target?.value)} type="text" placeholder="Nickname" />
            <i className="fs-4 bi-person"></i>
          </div>
          {(errorMessage?.length > 0 ?? 0) && (
            <small>{errorMessage}</small>
          )}
        </div>
        <button onClick={() => onLogin()} disabled={nickName.length > 0 ? false : true}
          className="btn btn-primary">
          {!loading ?
            (<>LOGIN</>) :
            (
              <div className="spinner-border" role="status">
                <span className="sr-only"></span>
              </div>
            )}


        </button>

      </div>
    </div>
  );
}
