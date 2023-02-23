import React from "react";
import { ScreenOne } from "../components/modules/welcome-page-screens/welcome-screen-1";
import { ScreenTwo } from "../components/modules/welcome-page-screens/welcome-screen-2";
import { WelcomePageWrapper } from "../styles/welcome";

const Welcome: React.FC = () => {
  return (
    <WelcomePageWrapper>
      <ScreenOne />
      <ScreenTwo />
    </WelcomePageWrapper>
  );
};

export default Welcome;
