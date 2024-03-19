import React from "react";
import Footer from './Footer'
import "bulma/css/bulma.min.css";
import { useNavigate } from "react-router-dom";


const Setting: React.FC = () => {
    const navigate = useNavigate();


    return (
        <div className="container">
            <div className="section">
                <div className="columns is-centered">
                    <div className="column is-half">
                        <div className="card">
                            <div className="card-content">
                                <div className="content">
                                    <h2 className="title">こんにちは、○○さん</h2>
                                    <div className="my-custom-graycolor1 notification  has-text-centered">
                                        <p className="title is-4">あなたの残高</p>
                                        <p className="subtitle is-6">1200円</p>
                                        <div className="field">
                                        <div className="control">
                                            <button
                                                type="submit"
                                                className="button is-fullwidth is-dark"
                                            >
                                            チャージする
                                            </button>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="control">
                                            <button
                                                type="submit"
                                                className="button is-fullwidth is-dark"
                                            >
                                            グループ名を管理する
                                            </button>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="control">
                                            <button
                                                type="submit"
                                                className="button is-fullwidth is-dark"
                                            >
                                            グループ名からサインアウトする
                                            </button>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="control">
                                            <button
                                                type="submit"
                                                className="button is-fullwidth is-dark"
                                            >
                                            グループ名から退会する
                                            </button>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="control">
                                            <button
                                                type="submit"
                                                className="button is-fullwidth is-dark"
                                            >
                                            ユーザ名からサインアウトする
                                            </button>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="control">
                                            <button
                                                type="submit"
                                                className="button is-fullwidth is-dark"
                                            >
                                            サービス名から退会する
                                            </button>
                                        </div>
                                    </div>
                                    <Footer />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Setting;