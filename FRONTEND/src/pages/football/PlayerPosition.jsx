import React from 'react'

function PlayerPosition(props) {
  return (
<>
  <div className="row koulen mt-5 mb-4">
    <div className="col-12 col-sm-8 col-lg-6">
      <div
        className="section_heading wow fadeInUp"
        data-wow-delay="0.2s"
        style={{
          visibility: "visible",
          animationDelay: "0.2s",
          animationName: "fadeInUp",
        }}
      >
        <h3>{props.position}</h3>
      </div>
    </div>
  </div>
 </>
  )
}

export default PlayerPosition;
