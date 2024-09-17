
import React from 'react';
import { Card } from 'baseui/card';

const InfoCard = ({ title, number }) => {
  return (
    <Card
      title={title}
      overrides={{
        Root: {
          style: {
            width: '100%', 
            height: '111px',
            padding: '0',
            display: 'flex',
            flexDirection: 'column',
          },
        },
        Title: {
          style: {
            fontSize: '16px',
            fontWeight: '600',
            // marginBottom: '10px',
          },
        },
        Body: {
          style: {
            fontSize: '36px',
            fontWeight: '800',
          },
        },
      }}
    >
      <div>{number}</div>
    </Card>
  );
};

export default InfoCard;
