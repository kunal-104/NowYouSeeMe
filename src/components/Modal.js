import React from 'react';

const Modal = ({ requestLocation }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 my-auto">
      <div className="bg-white p-6 rounded-lg shadow-lg mx-2 ">
        <h2 className="text-xl font-semibold mb-4">Access Required</h2>
        <p className="mb-6">
          To view the Police Identity Card and other information, please allow access.
        </p>
        <button
          onClick={requestLocation}
          className="mx-auto bg-green-500 hover:bg-green-400 text-white font-semibold py-2 px-4 rounded flex justify-end"
        >
          Allow Access
        </button>
      </div>
    </div>
  );
};

export default Modal;
