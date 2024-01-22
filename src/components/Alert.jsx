import React from 'react';

const AlertNotification = () => {
  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 fixed top-4 right-4 w-96 rounded-lg shadow-lg">
      <div className="flex items-center">
        <span className="text-2xl mr-2">
          <i className="fas fa-exclamation-circle"></i>
        </span>
        <span className="text-lg">Warning: This is a warning alert!</span>
        <button className="ml-auto focus:outline-none">
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
};

export default AlertNotification;
