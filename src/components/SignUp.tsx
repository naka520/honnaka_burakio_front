import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bulma/css/bulma.min.css";
import axios, { AxiosResponse } from "axios";
import "../Myfont.css";

interface Users {
  username: string;
  password: string;
  display_name: string;
}

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [display_name, setDisplay_name] = useState<string>("");
  const EndpoinUrl =
    "https://brachiocup-honnaka-backend.azurewebsites.net/api/v1/signup";
  const handleCheck = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // フォームのデフォルトの送信を防止

    if (!username || !password || !display_name) {
      console.error("All fields are required");
      return;
    }
    const requestData: Users = {
      username: username,
      password: password,
      display_name: display_name,
    };

    try {
      const response: AxiosResponse<any> = await axios.post(
        EndpoinUrl,
        requestData
      );
      console.log("Success:", response.status);
      navigate("/SignIn");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <div className="section">
        <div className="columns is-centered">
          <div className="column is-4">
            <div className="box">
              <h1 className="myComponentClass title has-text-centered">
                ちいみせ
              </h1>
              <form onSubmit={handleCheck}>
                <div className="field">
                  <label className="label" htmlFor="username">
                    ユーザーID
                  </label>
                  <div className="control">
                    <input
                      id="username"
                      name="username"
                      className="input"
                      type="text"
                      placeholder="ユーザーID"
                      value={username}
                      onChange={e => {
                        setUsername(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label" htmlFor="password">
                    パスワード
                  </label>
                  <div className="control">
                    <input
                      id="password"
                      name="password"
                      className="input"
                      type="password"
                      placeholder="パスワード"
                      value={password}
                      onChange={e => {
                        setPassword(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label" htmlFor="display_name">
                    表示名
                  </label>
                  <div className="control">
                    <input
                      id="display_name"
                      name="display_name"
                      className="input"
                      type="text"
                      placeholder="表示名"
                      value={display_name}
                      onChange={e => {
                        setDisplay_name(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <button
                      type="submit"
                      className="button is-fullwidth is-dark"
                    >
                      サインアップ
                    </button>
                  </div>
                </div>
                <div className="has-text-centered">
                  <Link to="/SignIn">サインインはこちら</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
