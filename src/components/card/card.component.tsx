import React from 'react';

import { Monster } from '../../App';

import './card.styles.css';

type CardProps = {
  monster: Monster;
};

const Card = ({ monster }: CardProps) => {
  const { name, email, id } = monster;
        
  return (
    <div className="card-container" key={id}>
      <img alt={`monster ${name}`} src={`https://robohash.org/${id}?set=set2`} />
      <h2>{name}</h2>
      <p>{email}</p>
    </div>
  );
};

export default Card;
