import React, {useState} from 'react';
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import FormRow from "./../components/FormRow";
import axios from 'axios';
import useLocalState from "./../utils/localState";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const {
    alert,
    showAlert,
    loading,
    setLoading,
    success,
    setSuccess,
    hideAlert
  } = useLocalState();

  const query = useQuery();

  const handleChange = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    hideAlert();
    if (!password) {
      showAlert({
        text: "Please provide password"
      })
      setLoading(false);
      return;
    }

    try {
      const {data} = await axios.post("/api/v1/auth/reset-password", {
        password,
        token: query.get('token'),
        email: query.get('email')
      });
      console.log(data);
      showAlert({
        text: data.message,
        type: 'success'
      })
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      showAlert({
        text: error.response.data.message,
      })
      setSuccess(true);
    }
    setLoading(false)
  };

  return (
    <Wrapper className='page'>
      {alert.show && (
        <div className={`alert alert-${alert.type}`}>{alert.text}</div>
      )}
      {
        !success && (
          <form
            className={loading ? "form form-loading" : "form"}
            onSubmit={handleSubmit}
          >
            <h4>Reset Password</h4>

            {/* single form row */}
            <FormRow
              type="password"
              name="password"
              value={password}
              handleChange={handleChange}
            />

            <button type="submit" className='btn btn-block' disabled={loading}>
              {loading ? "Please wait..." : "Get Reset Password Link"}
            </button>
          </form>
        )
      }
    </Wrapper>
  )
}

const Wrapper = styled.section`
  h4,
  p {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
  }
`;

export default ResetPassword;