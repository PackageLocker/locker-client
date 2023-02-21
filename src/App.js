import React from 'react'
import Home from './routes/Home'

const App = () => {

  return (
    <Home />
  )
}

export default App

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
