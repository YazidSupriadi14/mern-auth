import React from 'react';

const Input = ({ icon: Icon, ...props }) => {
  return (
    <div className='relative mb-6'>
      {/* Container for the icon */}
      <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
        <Icon className="w-5 h-5 text-sky-500" />
      </div>

      {/* Input field */}
      <input
        className='w-full pl-10 pr-4 py-2 text-sm text-white bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500'
        {...props}
      />
    </div>
  );
};

export default Input;
