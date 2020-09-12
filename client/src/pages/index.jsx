import React from 'react';
import image from '@/assets/images/start_loading.svg';

export const getServerSideProps = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve({
      nihao: 123
    });
  }, 1000);
});

export default ({ nihao }) => (
  <div className="homePage">
    <p>
      home2
      {nihao}
    </p>
    <img src={image} alt="logo" />
  </div>
);
