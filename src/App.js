// https://www.youtube.com/watch?v=06pWsB_hoD4&ab_channel=BenAwad
import React, { useEffect } from "react";
import Html5Qrcode from "./Html5Qrcode";

const App = (props) => {
  const onNewScanResult = (decodedText, decodedResult) => {
    // Handle the result here.
    console.log(decodedText, decodedResult);
  }

  return (
  <div><Html5Qrcode></Html5Qrcode></div>
  );


};

export default App;
