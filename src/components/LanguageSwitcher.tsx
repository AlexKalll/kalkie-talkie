import React from 'react';

const LanguageSwitcher: React.FC<{ onSwitch: () => void }> = ({ onSwitch }) => (
  <button onClick={onSwitch} className='px-3 py-1 border rounded-md'>Switch Language</button>
);

export default LanguageSwitcher;
