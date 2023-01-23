// https://www.youtube.com/watch?v=06pWsB_hoD4&ab_channel=BenAwad
import React, { useEffect } from "react";
import Html5QrcodePlugin from "./Html5QrcodePlugin";
// function App() {
//   useEffect(() => {
//     // code to get data from backend database
//     fetch("/api/packages", {
//       method: 'GET',
//       mode: 'cors'
//     }).then(response =>
//       response.json().then(data => {
//         console.log(data.packages);
//       })
//     );
//   }, []);

//   return (
//     <div className="App">Hello World!</div>
//   );
// }

const App = () => {
  let html5QrCode;
  
  useEffect(() => {
      // Anything in here is fired on component mount.
      if(!html5QrCode?.getState()){
          html5QrCode = new Html5QrcodePlugin(qrcodeId);
          const qrCodeSuccessCallback = (decodedText, decodedResult) => {
              /* handle success */
          };
          const config = { fps: 10, qrbox: { width: 250, height: 250 }, aspectRatio: 1.777778};

          // If you want to prefer back camera
          html5QrCode.start(
              { facingMode: "environment" },
              config,
              qrCodeSuccessCallback
          );
      }

      return () => {
          // Anything in here is fired on component unmount.

      };
  }, []);

  return <div id={qrcodeId}></div>;
};

export default App;
