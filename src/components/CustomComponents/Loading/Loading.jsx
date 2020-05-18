import React from 'react';
import './loading.css';

const Loading = ({ height }) => {
  return (
    <div className="loading" style={{ height: height }}>
      <div className="lds-dual-ring" />
    </div>
  );
};

export default Loading;
