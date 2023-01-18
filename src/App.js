// https://www.youtube.com/watch?v=06pWsB_hoD4&ab_channel=BenAwad
import React, { useEffect } from "react";

function App() {
  useEffect(() => {
    // code to get data from backend database
    fetch("/packages").then(response =>
      response.json().then(data => {
        console.log(data.packages);
      })
    );
  }, []);

  return (
    <div className="App">Hello World!</div>
  );
}

export default App;
