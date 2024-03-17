import React, { useRef, useEffect, useState } from "react";
import "bulma/css/bulma.min.css";
import jsQR from "jsqr";

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
  const [qrCode, setQrCode] = useState<string | null>(null);

  const activateCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        scanQRCode();
      }
    } catch (err) {
      console.error("Error accessing the camera", err);
    }
  };

  const scanQRCode = () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (context && videoRef.current) {
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const qrCodeResult = jsQR(imageData.data, canvas.width, canvas.height);
      if (qrCodeResult) {
        setQrCode(qrCodeResult.data);
      } else {
        requestAnimationFrame(scanQRCode); // Keep scanning for QR codes
      }
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
                    <video
                      ref={videoRef}
                      style={{
                        width: "100%",
                        aspectRatio: "1",
                        objectFit: "cover",
                      }}
                      autoPlay
                      playsInline
                      muted
                      className="my-custom-camera-area"
                    />
                    {qrCode && <p>QRコードの内容: {qrCode}</p>}
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
