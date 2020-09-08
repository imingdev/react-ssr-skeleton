import React from "react";
import image from '@/assets/images/start_loading.svg'

export const getServerSideProps = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        nihao: 123
      })
    }, 100)
  })
}

export default ({nihao}) => (
  <div className="homePage">
    <p>home {nihao}</p>
    <img src={image}/>
  </div>
)
