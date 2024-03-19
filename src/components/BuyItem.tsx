// import React, { useRef, useEffect, useState } from "react";
// import "bulma/css/bulma.min.css";
// import jsQR from "jsqr";
// import { useNavigate } from "react-router-dom";

// const BuyItem: React.FC = () => {
//   const navigate = useNavigate();
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const [qrCodeData, setQrCodeData] = useState<string | null>(null);

//   const activateCamera = async () => {
//     try {
//       const constraints: MediaStreamConstraints = {
//         video: { facingMode: "environment" },
//       };
//       const stream = await navigator.mediaDevices.getUserMedia(constraints);
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//         scanQRCode();
//       }
//     } catch (err) {
//       console.error("Error accessing the camera", err);
//     }
//   };

//   const scanQRCode = () => {
//     if (videoRef.current && canvasRef.current) {
//       const context = canvasRef.current.getContext("2d");
//       if (
//         context &&
//         videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA
//       ) {
//         canvasRef.current.width = videoRef.current.videoWidth;
//         canvasRef.current.height = videoRef.current.videoHeight;
//         context.drawImage(
//           videoRef.current,
//           0,
//           0,
//           canvasRef.current.width,
//           canvasRef.current.height
//         );
//         const imageData = context.getImageData(
//           0,
//           0,
//           canvasRef.current.width,
//           canvasRef.current.height
//         );
//         const code = jsQR(imageData.data, imageData.width, imageData.height, {
//           inversionAttempts: "dontInvert",
//         });
//         if (code) {
//           setQrCodeData(code.data);
//         } else {
//           requestAnimationFrame(scanQRCode); // QRコードが見つからなければ繰り返す
//         }
//       }
//     }
//   };

//   useEffect(() => {
//     activateCamera();
//     // コンポーネントのアンマウント時にカメラを停止
//     return () => {
//       if (videoRef.current?.srcObject) {
//         const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
//         tracks.forEach(track => track.stop());
//       }
//     };
//   }, []);

//   return (
//     <div className="container">
//       <div className="section">
//         <div className="columns is-centered">
//           <div className="column is-half">
//             <div className="card">
//               <div className="card-content">
//                 <div className="content">
//                   <h2 className="title">購入</h2>
//                   <div className="box has-text-centered">
//                     <video
//                       ref={videoRef}
//                       style={{
//                         width: "100%",
//                         aspectRatio: "1",
//                         objectFit: "cover",
//                       }}
//                       autoPlay
//                       playsInline
//                       muted
//                       className="my-custom-camera-area"
//                     />
//                     <canvas ref={canvasRef} style={{ display: "none" }} />
//                     {qrCodeData && <p>QRコードデータ: {qrCodeData}</p>}
//                   </div>
//                   <div className=" my-custom-button block">
//                     <button
//                       className=" my-custom-button button is-fullwidth "
//                       onClick={() => navigate("/ItemList")}
//                     >
//                       リストから選択する
//                     </button>
//                   </div>
//                 </div>
//                 <footer className="my-custom-button  card-footer is-flex is-justify-content-space-around">
//                   <button
//                     className="button"
//                     onClick={() => navigate("/GroupHome")}
//                   >
//                     ホーム
//                   </button>
//                   <button
//                     className="button"
//                     onClick={() => navigate("/BuyItem")}
//                   >
//                     購入
//                   </button>
//                   <button
//                     className="button "
//                     // onClick={() => navigateToPage("/profile")}
//                   >
//                     プロフィール
//                   </button>
//                   <button
//                     className="button"
//                     // onClick={() => navigateToPage("/settings")}
//                   >
//                     設定
//                   </button>
//                 </footer>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BuyItem;

import React, { useRef, useEffect, useState } from "react";
import Footer from "./Footer";
import "bulma/css/bulma.min.css";
import {
  BrowserMultiFormatReader,
  NotFoundException,
  ChecksumException,
  FormatException,
} from "@zxing/library";
import { useNavigate } from "react-router-dom";

const BuyItem: React.FC = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [barcodeData, setBarcodeData] = useState<string | null>(null);
  const barcodeReader = new BrowserMultiFormatReader();

  const activateCamera = async () => {
    try {
      const constraints: MediaStreamConstraints = {
        video: { facingMode: "environment" },
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        decodeFromVideoStream(stream);
      }
    } catch (err) {
      console.error("カメラへのアクセス中にエラーが発生しました", err);
    }
  };

  const decodeFromVideoStream = (stream: MediaStream) => {
    try {
      barcodeReader.decodeFromStream(
        stream,
        videoRef.current!,
        (result, error) => {
          if (result) {
            // バーコードデータが取得できたら、そのデータを用いて遷移する
            setBarcodeData(result.getText());
            navigate(`/ConfirmPurchasingItem?barcode=${result.getText()}`);
          } else if (error) {
            if (
              !(
                error instanceof NotFoundException ||
                error instanceof ChecksumException ||
                error instanceof FormatException
              )
            ) {
              console.error(error);
            }
          }
        }
      );
    } catch (err) {
      console.error("バーコードのデコード中にエラーが発生しました", err);
    }
  };

  useEffect(() => {
    activateCamera();
    return () => {
      barcodeReader.reset();
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
      if (barcodeData) {
        localStorage.setItem("barcodeData", barcodeData);
      }
    };
  }, [barcodeData]);

  return (
    <div className="container">
      <div className="section">
        <div className="columns is-centered">
          <div className="column is-half">
            <div className="card">
              <div className="card-content">
                <div className="content">
                  <h2 className="title">購入</h2>
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
                    {barcodeData && <p>バーコードデータ: {barcodeData}</p>}
                  </div>
                  <div className="my-custom-button block">
                    <button
                      className="my-custom-button button is-fullwidth"
                      onClick={() => navigate("/ItemList")}
                    >
                      リストから選択する
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
  );
};

export default BuyItem;
