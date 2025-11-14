import React from 'react';
import dmmLogo from '/dmm.png'
import { useRouteContext } from '../../providers/RouteProvider';

interface NavProps {
}

const Nav: React.FC<NavProps> = ({ }) => {

  const { addDummyStep } = useRouteContext();

  return (
    <>
      <img src={dmmLogo} className="logo" alt="DMM Annihilation" />
      <span>This is the nav</span>
      <button onClick={addDummyStep}>ADD STEP</button>
    </>

  );
};

export default Nav;