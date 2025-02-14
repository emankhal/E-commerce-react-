
import { Helmet } from 'react-helmet'
import DisplayProducts from '../DisplayProducts/DisplayProducts'
import Mainslider from '../Mainslider/Mainslider'
import Slickslider from '../Slickslider/Slickslider'
import style from'./Home.module.css'

export default function Home() {
  <Helmet>
    <title>
      Home
    </title>
  </Helmet>
  return (
    
    <div>
      <div className='my-5'>
      <Mainslider/>
      </div>
      <div className='my-5'>
      <Slickslider/>
      </div>
      <DisplayProducts/>
    </div>
  )
}
