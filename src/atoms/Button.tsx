import React from 'react';

interface MyButtonProps {
  onClick: () => void;
}

const MyButton: React.FC<MyButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      Haz click
    </button>
  );
};

export default MyButton;




