import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bulma/css/bulma.min.css";


const ConfirmPurchasingItem: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <section className="section">
        <h1 className="title">購入確認</h1>
        <div className="card">
          <div className="card-content">
            <div className="media">
              <div className="media-left">
                <figure className="image is-48x48">

                </figure>
              </div>
              <div className="media-content">
                <p className="title is-4">testtesttest</p>
                <p className="subtitle is-6">￥200</p>
              </div>
            </div>
          </div>
        </div>
        <section className="section">
          <h2 className="subtitle">消費期限を選択</h2>
          <div className="card">
            <div className="card-content">
              <div className="media">
                <div className="media-left">
                  <figure className="image is-24x24">

                  </figure>
                </div>
                <div className="media-content">
                  <p className="title is-6">2024/01/01</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section">
          <h2 className="subtitle">数量</h2>
          <div className="level">
            <div className="lebel-item has-text-left">
              <button className="button">-</button>
            </div>
            <div className="lebel-item has-text-centered">
              <p className="title is-6">5</p>
            </div>
            <div className="lebel-item has-text-right">
              <button className="button">+</button>
            </div>
          </div>
        </section>
        <div className="level">
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">計</p>
              <p className="title is-4">￥200</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">購入後の残高</p>
              <p className="title is-4">￥2,000</p>
            </div>
          </div>
        </div>
        <div className="buttons is-grouped is-centered">
          <p className="control">
            <button className="button is-primary">購入する</button>
          </p>
          <p className="control">
            <button className="button">戻る</button>
          </p>
        </div>
      </section>
    </div>
  );
};

export default ConfirmPurchasingItem;
