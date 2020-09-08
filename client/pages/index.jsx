import React from "react";

export const getServerSideProps = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        nihao: 123
      })
    }, 100)
  })
}

export default ({nihao}) => (<div className="homePage">home{nihao}</div>)
