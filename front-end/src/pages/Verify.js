import React, { useState, useEffect } from 'react';
import { useLocation, Link } from "react-router-dom";
import { useGlobalContext } from "./../context";
import axios from 'axios';
import styled from "styled-components";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Verify = () => {

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isLoading } = useGlobalContext();
  const query = useQuery();

  const verifyToken = async () => {
    setLoading(true);
    try {
      await axios.post("/api/v1/auth/verify-email", {
        verificationToken: query.get('token'),
        email: query.get('email')
      })
    } catch (error) {
      setError(true)
    }
    setLoading(false);
  }

  useEffect(() => {
    if (!isLoading) {
      verifyToken();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

  if (loading) {
    return (
      <Wrapper className='page'>
        <h2>Loading...</h2>
      </Wrapper>
    )
  }

  if (error) {
    return (
      <Wrapper className='page'>
        <h4>There was an error, please double check your verification link</h4>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <h2>Account Confirmed</h2>
      <Link to="/login" className='btn'>Please Login</Link>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  
`

export default Verify;