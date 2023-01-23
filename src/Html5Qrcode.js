import Html5QrcodePlugin from "./Html5QrcodePlugin";

const Html5Qrcode = (props) => {
    const onNewScanResult = (decodedText, decodedResult) => {
      // Handle the result here.
      console.log(decodedText, decodedResult);
    }
  
    return (<div>
          <h1>Html5Qrcode React example!</h1>
          <Html5QrcodePlugin 
              fps={10}
              qrbox={500}
              disableFlip={false}
              qrCodeSuccessCallback={onNewScanResult}/>
      </div>);
  
  
  };
  
  export default Html5Qrcode;