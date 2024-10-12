import React from 'react'
import LatestPost from "../news/LatestPost";
import RandomNews from "../news/RandomNews";
function GMap() {
  return (
    <div className="container">
    <div class="row">
      <div class="col-lg-4 col-md-12">
        <div className="col-lg-12 blog-aside float-left" style={{"padding":"0px","margin":"0px"}}>
          <LatestPost />
        </div> 
      </div>
      <div class="col-lg-4 col-md-12">
        <div className="col-lg-12 blog-aside float-left" style={{"padding":"0px","margin":"0px"}}>
          <RandomNews/>
        </div> 
      </div>
      <div class="col-lg-4 col-md-12">
        <div className="col-lg-12 blog-aside float-left" style={{"padding":"0px","margin":"0px"}}>
          <iframe style={{'height':'515px','paddingTop': '20px'}} width="100%" height="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=100%25&amp;hl=en&amp;q=13.777390765778772,%20103.53993053590902+(moung%20secondary%20school)&amp;t=k&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.gps.ie/">gps systems</a></iframe>
        </div> 
      </div>
    </div>
  </div>
  )
}

export default GMap
