import React from 'react'
import Header from '../components/Header';
import { useParams } from "react-router-dom";
import Html5Qrcode from '../components/Html5Qrcode'

const AddPackage = () => {
  const { lockerId } = useParams();

  return (
    <div>
      <Header text={"Locker " + lockerId} root={false} />
      Add Package Here!
      <Html5Qrcode />
    </div>
  )
}

export default AddPackage
