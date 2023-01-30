import React from 'react'
import Content from './routes/Home';
import Header from './components/Header'

const App = () => {

  return (
    <div>
      <Header text="Package Locker" root={true} />
      <Content />
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
