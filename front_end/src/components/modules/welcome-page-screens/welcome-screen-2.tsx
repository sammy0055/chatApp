import React from "react";
import InputField from "../../molecules/input/inputField";
import {
  AuthenticationCard,
  FormField,
  STWrapper,
} from "./styles/welcome-screen-2";

export const ScreenTwo: React.FC = () => (
  <STWrapper>
    <AuthenticationCard>
      <h1>create account</h1>
      <FormField>
        <InputField
          label="Name"
          value="hello"
          helperText="wrong entry"
          onChange={() => ""}
        />
        <InputField
          label="Email"
          value="hello"
          helperText="wrong entry"
          onChange={() => ""}
        />
        <InputField
          label="Password"
          value="hello"
          helperText="wrong entry"
          onChange={() => ""}
        />
        <button type="button">sign in / sign up</button>
      </FormField>
    </AuthenticationCard>
  </STWrapper>
);
