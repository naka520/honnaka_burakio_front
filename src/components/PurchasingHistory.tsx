import React, { useRef, useEffect, useState } from "react";
import Footer from './Footer'
import "bulma/css/bulma.min.css";
import { useNavigate } from "react-router-dom";

const PurchasingHistory: React.FC = () =>{
    return (
        <div className="container">
            <section className="section">
            <div className="columns is-centered">
                <div className="column is-half my-custom-background">
                <div className="level-left">
                    <h1 className="title">購入履歴</h1>
                </div>

                {/* <div>
                    <h2 className="title is-4">あなたが管理しているグループ</h2>
                    {managedGroups.map(group => (
                    <div
                        key={group.uuid}
                        className="card my-custom-list"
                        style={{ marginBottom: "10px" }}
                    >
                        <div className="card-content">
                        <p className="title is-5">{group.display_name}</p>
                        </div>
                    </div>
                    ))}
                </div>

                <div>
                    <h2 className="title is-4">あなたが参加しているグループ</h2>
                    {joinedGroups.map(group => (
                    <div
                        key={group.uuid}
                        className="card my-custom-list"
                        style={{ marginBottom: "10px" }}
                    >
                        <div className="card-content">
                        <p className="title is-5">{group.display_name}</p>
                        </div>
                    </div>
                    ))}
                </div> */}
                </div>
            </div>
            </section>
        </div>
    );
};

export default PurchasingHistory