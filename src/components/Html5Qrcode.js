import React, { useState } from "react";
import Html5QrcodePlugin from "./Html5QrcodePlugin";

const Html5Qrcode = () => {
  const [value, setValue] = useState([]);

  const onNewScanResult = (decodedText, decodedResult) => {
    setValue(arr => [...arr, decodedText]);
    console.log(decodedText, decodedResult);
  }

  return (
    <div>
      <Html5QrcodePlugin
        fps={10}
        qrbox={250}
        disableFlip={false}
        qrCodeSuccessCallback={onNewScanResult}
      />
      <ul>
        {value.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    </div>
  );

};

export default Html5Qrcode;