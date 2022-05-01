import styled from "styled-components";
import { useGlobalContext } from "./../context";

const Dashboard = () => {

  const { user } = useGlobalContext();
  const { name, userId, role, email } = user;

  return (
    <Wrapper className="page">
      <h2>Hello, {name} - hope you are doing well😍</h2>
      <p>
        Your ID : <span>{userId}</span>
      </p>
      <p>
        Your Role: <span>{role}</span>
      </p>
      <p>
        Your Email: <span>{email}</span>
      </p>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  p span {
    background: var(--primary-500);
    padding: 0.15rem 0.25rem;
    color: var(--white);
    border-radius: var(--borderRadius);
    letter-spacing: var(--letterSpacing);
  }
`

export default Dashboard;