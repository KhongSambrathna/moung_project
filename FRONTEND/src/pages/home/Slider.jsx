import React from 'react'
import './slider.css'
import Wellcome1 from '../../assets/logo/banner/gotoschool.png';
import Wellcome2 from '../../assets/logo/banner/welcome-1.png';
function Slider() {
  return (
        <div className="container" style={{'padding': '10px'}}>
            <div id="carouselExampleSlidesOnly" className="pt-3 carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                <div className="carousel-item active">
                    <img className="d-block w-100" src={Wellcome1} alt="img/logo/banner/welcome-1.png"/>
                </div>
                <div className="carousel-item">
                    <img className="d-block w-100" src={Wellcome2} alt="img/logo/banner/gotoschool.png"/>
                </div>
                <div className="carousel-item">
                    <img className="d-block w-100" src={Wellcome1} alt="img/logo/banner/welcome-1.png"/>
                </div>
                </div>
            </div>
        </div>
  )
}

export default Slider;
