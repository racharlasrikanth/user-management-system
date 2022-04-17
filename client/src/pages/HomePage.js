import React from 'react'
import { useUserContext } from '../context/userContext';

const HomePage = () => {

  // fetching values from context
  const { user } = useUserContext();
  console.log(user);

  return (
    <div>HomePage</div>
  )
}

export default HomePage;