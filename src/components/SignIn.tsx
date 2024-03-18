// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import "bulma/css/bulma.min.css";

// interface Users {
//   username: string;
//   password: string;
// }

// const SignIn: React.FC = () => {
//   const [formUsers, setFormUsers] = useState<Users>({
//     username: "",
//     password: "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormUsers({ ...formUsers, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     console.log(formUsers);
//   };

//   return (
//     <div className="container">
//       <div className="section">
//         <div className="columns is-centered">
//           <div className="column is-4">
//             <div className="box">
//               <h1 className="title has-text-centered">サービス名</h1>
//               <form onSubmit={handleSubmit}>
//                 <div className="field">
//                   <label className="label" htmlFor="userId">
//                     ユーザーID
//                   </label>
//                   <div className="control">
//                     <input
//                       id="userId"
//                       name="username"
//                       className="input"
//                       type="text"
//                       placeholder="ユーザーID"
//                       value={formUsers.username}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </div>
//                 <div className="field">
//                   <label className="label" htmlFor="password">
//                     パスワード
//                   </label>
//                   <div className="control">
//                     <input
//                       id="password"
//                       name="hashed_password"
//                       className="input"
//                       type="password"
//                       placeholder="パスワード"
//                       value={formUsers.password}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </div>

//                 <div className="field">
//                   <div className="control">
//                     <button
//                       type="submit"
//                       className="button is-fullwidth is-dark"
//                     >
//                       サインイン
//                     </button>
//                   </div>
//                 </div>
//                 <div className="has-text-centered">
//                   <Link to="/">サインアップはこちら</Link>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignIn;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bulma/css/bulma.min.css";
import axios, { AxiosResponse } from "axios";

interface Users {
  username: string;
  password: string;
}

interface TokenResponse {
  access_token: string;
}

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [accesstoken, setAccesstoken] = useState<string>("");
  // const [formUsers, setFormUsers] = useState<Users>({
  //   username: "",
  //   password: "",
  //   display_name: "",
  // });

  const EndpoinUrl =
    "https://brachiocup-honnaka-backend.azurewebsites.net/api/v1/signin";
  const handleCheck = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // フォームのデフォルトの送信を防止

    if (!username || !password) {
      console.error("All fields are required");
      return;
    }
    const requestData: Users = {
      username: username,
      password: password,
    };

    try {
      const response: AxiosResponse<TokenResponse> =
        await axios.post<TokenResponse>(EndpoinUrl, requestData, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });
      setAccesstoken(response.data.access_token); // response.data は string 型として扱われます
      localStorage.setItem("access_token", response.data.access_token);
      console.log("Success:", response);
      navigate("/GroupList");
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
              <h1 className="title has-text-centered">サービス名</h1>
              <form onSubmit={handleCheck}>
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
                  <Link to="/SignUp">サインアップはこちら</Link>
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
