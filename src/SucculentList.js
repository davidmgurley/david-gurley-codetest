import React from 'react';
import SucculentCard from './SucculentCard';

function SucculentList({ succulents }) {
  return (
    <div>
      {succulents.map(succulent => (
        <SucculentCard key={succulent.id} succulent={succulent} />
      ))}
    </div>
  );
}

export default SucculentList;