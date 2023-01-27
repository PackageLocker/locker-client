import React from 'react'
import Content from './components/Content';
import Header from './components/Header'
import { getPackges } from './packages';

const App = () => {
  const packages = getPackges();

  return (
    <div>
      <Header />
      <Content packages={packages} />
    </div>
  )
}

export default App

//   // useEffect(() => {
//   //   // code to get data from backend database
//   //   fetch("/api/packages", {
//   //     method: 'GET',
//   //     mode: 'cors'
//   //   }).then(response =>
//   //     response.json().then(data => {
//   //       console.log(data.packages);
//   //     })
//   //   );
//   // }, []);
