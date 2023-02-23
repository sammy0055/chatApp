import React from "react";
import { SOWrapper, TextBlock } from "./styles/welcome-screen-1";

export const ScreenOne: React.FC = () => (
  <SOWrapper>
    <TextBlock>
      <h1>welcome back!</h1>
      <p>
        to keep connection with us please log in or register if you don't have
        an account.
      </p>
    </TextBlock>
  </SOWrapper>
);
