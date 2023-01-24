import React from "react";
import Html5Qrcode from "./Html5Qrcode";

const App = () => {
  // useEffect(() => {
  //   // code to get data from backend database
  //   fetch("/api/packages", {
  //     method: 'GET',
  //     mode: 'cors'
  //   }).then(response =>
  //     response.json().then(data => {
  //       console.log(data.packages);
  //     })
  //   );
  // }, []);

  return (
    <div>
      <Html5Qrcode />
    </div>
  );
};

export default App;
