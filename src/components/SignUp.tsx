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
import { Link } from "react-router-dom";
import "bulma/css/bulma.min.css";

interface Users {
  username: string;
  password: string;
  display_name: string;
}

const SignUp: React.FC = () => {
  const [formUsers, setFormUsers] = useState<Users>({
    username: "",
    password: "",
    display_name: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormUsers({ ...formUsers, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formUsers);
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
                      value={formUsers.username}
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
                      value={formUsers.password}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label" htmlFor="password">
                    表示名
                  </label>
                  <div className="control">
                    <input
                      id="password"
                      name="hashed_password"
                      className="input"
                      type="password"
                      placeholder="表示名"
                      value={formUsers.display_name}
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
                      サインアップ
                    </button>
                  </div>
                </div>
                <div className="has-text-centered">
                  <Link to="/signin">サインインはこちら</Link>
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
