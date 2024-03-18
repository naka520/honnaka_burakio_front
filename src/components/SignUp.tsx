// import React, { useState, FormEvent } from "react";
// import "bulma/css/bulma.min.css";

// interface FormState {
//   username: string;
//   hashed_password: string;
// }

// const SignUp: React.FC = () => {
//   const [isSignIn, setIsSignIn] = useState(true);
//   const [formState, setFormState] = useState<FormState>({
//     username: "",
//     hashed_password: "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormState({ ...formState, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     // Authentication logic would go here
//     console.log(formState);
//   };
//   return (
//     <div className="container">
//       <div className="section">
//         <div className="columns is-centered">
//           <div className="column is-4">
//             <div className="my-custom-background box">
//               <h1 className="title has-text-centered">サービス名</h1>
//               <form onSubmit={handleSubmit}>
//                 <div className="field">
//                   <label className="label" htmlFor="userId">
//                     ユーザーID
//                   </label>
//                   <div className="control">
//                     <input
//                       id="userId"
//                       name="userId"
//                       className="input"
//                       type="text"
//                       placeholder="ユーザーID"
//                       value={formState.username}
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
//                       name="password"
//                       className="input"
//                       type="password"
//                       placeholder="パスワード"
//                       value={formState.hashed_password}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </div>
//                 <div className="field">
//                   <div className="control">
//                     <button
//                       type="submit"
//                       className="button is-fullwidth is-dark"
//                       onMouseDown={e =>
//                         e.currentTarget.classList.add("is-light")
//                       }
//                       onMouseUp={e =>
//                         e.currentTarget.classList.remove("is-light")
//                       }
//                       onMouseLeave={e =>
//                         e.currentTarget.classList.remove("is-light")
//                       }
//                     >
//                       {isSignIn ? "サインイン" : "サインアップ"}
//                     </button>
//                   </div>
//                 </div>
//                 <div className="field">
//                   <div className="control">
//                     <button
//                       type="button"
//                       className="button is-fullwidth"
//                       onClick={() => setIsSignIn(!isSignIn)}
//                     >
//                       {isSignIn ? "サインアップ" : "サインイン"}
//                     </button>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bulma/css/bulma.min.css";
import axios, { AxiosResponse } from "axios";

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
  // const [formUsers, setFormUsers] = useState<Users>({
  //   username: "",
  //   password: "",
  //   display_name: "",
  // });

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
