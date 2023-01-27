import React, { useState } from "react";
import Header from "./components/Header";
import Html5Qrcode from "./components/Html5Qrcode";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

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
  const [packages, setPackages] = useState([
    {
      "available": false,
      "email": "jd1@calvin.edu",
      "locker_id": 1,
      "name": "John Doe1",
      "package_id": "11111",
      "student_id": "207990694991"
    },
    {
      "available": false,
      "email": "jd2@calvin.edu",
      "locker_id": 2,
      "name": "John Doe2",
      "package_id": "22222",
      "student_id": "700094754666"
    },
    {
      "available": false,
      "email": "jd3@calvin.edu",
      "locker_id": 3,
      "name": "John Doe3",
      "package_id": "33333",
      "student_id": "123456789012"
    },
    {
      "available": true,
      "email": "",
      "locker_id": 4,
      "name": "",
      "package_id": "",
      "student_id": ""
    },
    {
      "available": true,
      "email": "",
      "locker_id": 5,
      "name": "",
      "package_id": "",
      "student_id": ""
    }
  ]);

  return (
    <div>
      <Header />

      <List>
        {packages.map((item) => {
          return (
            <>
              <ListItem
                secondaryAction={
                  <IconButton edge="end" aria-label="add">
                    {item.available ? <AddCircleOutlineIcon /> : <DeleteIcon />}
                  </IconButton>
                }
              >
                <ListItemButton disabled={item.available}>
                  <ListItemIcon>
                    {item.locker_id}
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
              <Divider />
            </>

          )
        })}
      </List>


      {/* <Html5Qrcode /> */}
    </div>
  );
};

export default App;
