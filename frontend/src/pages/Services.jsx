import React from 'react'
import { services } from '../assets/data/services'
import SericeCard from '../components/services/SericeCard'
const Services = () => {
  return (
    <section>
      <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-[30px] ">
        {
            services.map((item,index)=><SericeCard item={item} index={index} key={index}/>)
        }
    </div>
      </div>
    </section>
  )
}

export default Services