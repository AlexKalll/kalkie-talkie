import React from 'react';

const ControlButton: React.FC<{ label: string; onClick: () => void }> = ({ label, onClick }) => (
  <button onClick={onClick} className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'>
    {label}
  </button>
);

export default ControlButton;
