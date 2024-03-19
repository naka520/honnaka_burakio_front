import React, { useRef, useEffect, useState } from "react";
import Footer from './Footer'
import "bulma/css/bulma.min.css";
import {
  BrowserMultiFormatReader,
  NotFoundException,
  ChecksumException,
  FormatException,
} from "@zxing/library";
import { useNavigate } from "react-router-dom";

const ItemAdd: React.FC = () => {
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
            setBarcodeData(result.getText());
            navigate(`/ConfirmAddingItem?barcode=${result.getText()}`);
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
                  <h2 className="title">商品を購入</h2>
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
                      onClick={() => navigate("/ItemEditList")}
                    >
                      リストから編集する
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

export default ItemAdd;
