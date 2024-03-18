import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bulma/css/bulma.min.css";

interface FormState {
  username: string;
  hashed_password: string;
}

const SignIn: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    username: "",
    hashed_password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formState);
  };

  return (
    <div className="container">
      <div className="section">
        <div className="columns is-centered">
          <div className="column is-4">
            <div className="box">
              <h1 className="title has-text-centered">サービス名</h1>
              <form onSubmit={handleSubmit}>
                <div className="field">
                  <label className="label" htmlFor="userId">
                    ユーザーID
                  </label>
                  <div className="control">
                    <input
                      id="userId"
                      name="username"
                      className="input"
                      type="text"
                      placeholder="ユーザーID"
                      value={formState.username}
                      onChange={handleChange}
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
                      name="hashed_password"
                      className="input"
                      type="password"
                      placeholder="パスワード"
                      value={formState.hashed_password}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <button
                      type="submit"
                      className="button is-fullwidth is-dark"
                    >
                      サインイン
                    </button>
                  </div>
                </div>
                <div className="has-text-centered">
                  <Link to="/">サインアップはこちら</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
