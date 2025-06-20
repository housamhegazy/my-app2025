import React from 'react';
import './maincon.css'
const MainComp = ({pageName , color}) => {
  return (
    <main style={{ color: color}}>{pageName}</main>
  );
}

export default MainComp;
