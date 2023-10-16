import React from 'react';
import Card from './card.jsx';


const CardContainer = ({ data }) => {
  return (
    <div>
      {data.map(item => (
        <Card
          key={item.id}
          title={item.title}
          description={item.description}
          // ...
        />
      ))}
    </div>
  );
};

export default CardContainer;
