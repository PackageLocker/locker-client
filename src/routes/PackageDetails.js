import React from 'react'
import { useParams } from "react-router-dom";
import Header from '../components/Header';

const PackageDetails = () => {
  const { lockerId } = useParams();

  return (
    <div>
      <Header text={"Locker " + lockerId} root={false} />
    </div >
  )
}

export default PackageDetails
