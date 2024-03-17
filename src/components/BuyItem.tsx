import React, { useRef, useEffect } from "react";
import "bulma/css/bulma.min.css";

interface Item {
  id: number;
  name: string;
  price: number;
  // 商品の画像パスを追加する
  imageUrl: string;
}

const BuyItem: React.FC = () => {
  const navigateToPage = (path: string) => {
    // React RouterのuseNavigateを使うか、window.locationを使ってページを移動します。
    console.log("Navigating to:", path);
  };
  const videoRef = useRef<HTMLVideoElement>(null);

  const activateCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing the camera", err);
    }
  };

  useEffect(() => {
    activateCamera();
    return () => {
      // コンポーネントのアンマウント時にカメラを停止
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);
  return (
    <div className="container">
      <div className="section">
        <div className="columns is-centered">
          <div className="column is-half">
            <div className="card">
              <div className="card-content">
                <div className="content">
                  <h2 className="title">購入</h2>
                  {/* 商品リストをカード形式で表示 */}
                  <div className="box has-text-centered">
                    {/* カメラの映像を表示するビデオ要素 */}
                    <video
                      ref={videoRef}
                      style={{
                        width: "100%", // 親要素に合わせて幅を設定
                        aspectRatio: "1", // アスペクト比を1:1に設定
                        objectFit: "cover", // コンテンツがボックスに収まるように調整
                      }}
                      autoPlay
                      className="my-custom-camera-area"
                      onClick={activateCamera} // ビデオをクリックするとカメラが再起動
                    />
                  </div>
                  <footer className="my-custom-button card-footer is-flex is-justify-content-space-around">
                    <button
                      className="button"
                      onClick={() => navigateToPage("/home")}
                    >
                      ホーム
                    </button>
                    <button
                      className="button"
                      onClick={() => navigateToPage("/explore")}
                    >
                      購入
                    </button>
                    <button
                      className="button "
                      onClick={() => navigateToPage("/profile")}
                    >
                      プロフィール
                    </button>
                    <button
                      className="button"
                      onClick={() => navigateToPage("/settings")}
                    >
                      設定
                    </button>
                  </footer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyItem;
