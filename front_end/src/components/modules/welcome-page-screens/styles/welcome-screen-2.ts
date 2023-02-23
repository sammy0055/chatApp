import styled from "styled-components";

export const STWrapper = styled.div`
  width: 60%;
  border: 1px solid rebeccapurple;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const AuthenticationCard = styled.div`
  width: 33rem;
  height: 35rem;
  background-color: black;
  border-radius: 5px;
  & h1 {
    padding: 12px;
    text-align: center;
    background-color: #40196d;
    color: #ffffff;
    border-radius: 4px 4px 0px 0px;
  }
`;

export const FormField = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
