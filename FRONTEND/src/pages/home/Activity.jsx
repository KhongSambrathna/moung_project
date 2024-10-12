import React from 'react'
import './activity.css'
function Activity() {
    return (
        <div className="container mt-4">
          {/* Learning Activity Section */}
          <div className="row">
            <div className="col-12">
              <h2 className="text-center mb-4 koulen act_head">សកម្មភាពបង្រៀន</h2>
            </div>
            <div className="col-12 col-md-4">
              <div className="card">
                <img
                  src={`${import.meta.env.VITE_API_URL}/activity/learning-1.png`}
                  className="card-img-top"
                  alt="Sport activity 1"
                />
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="card">
                <img
                  src={`${import.meta.env.VITE_API_URL}/activity/learn-ict.png`}
                  className="card-img-top"
                  alt="Sport activity 2"
                />
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="card">
                <img
                  src={`${import.meta.env.VITE_API_URL}/activity/learning-ict.png`}
                  className="card-img-top"
                  alt="Sport activity 3"
                />
              </div>
            </div>
          </div>
    
          <hr className="my-5" />
    
          {/* Sport Activity Section */}
          <div className="row">
            <div className="col-12">
              <h2 className="text-center mb-4 koulen act_head">សកម្មភាពកីឡា</h2>
            </div>
            <div className="col-12 col-md-4">
              <div className="card">
                <img
                  src={`${import.meta.env.VITE_API_URL}/activity/football.png`}
                  className="card-img-top"
                  alt="Learning activity 1"
                />
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="card">
                <img
                  src={`${import.meta.env.VITE_API_URL}/activity/volleyball.png`}
                  className="card-img-top"
                  alt="Learning activity 2"
                />
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="card">
                <img
                  src={`${import.meta.env.VITE_API_URL}/activity/boat.png`}
                  className="card-img-top"
                  alt="Learning activity 3"
                />
              </div>
            </div>
          </div>
    
          <hr className="my-5" />
    
          {/* Cleaning Activity Section */}
          <div className="row">
            <div className="col-12">
              <h2 className="text-center mb-4 koulen act_head">សកម្មភាពអភិវឌ្ឍន៍</h2>
            </div>
            <div className="col-12 col-md-4">
              <div className="card">
                <img
                  src={`${import.meta.env.VITE_API_URL}/activity/ilovemoung.png`}
                  className="card-img-top"
                  alt="Cleaning activity 1"
                />
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="card">
                <img
                  src={`${import.meta.env.VITE_API_URL}/activity/fence.png`}
                  className="card-img-top"
                  alt="Cleaning activity 2"
                />
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="card">
                <img
                  src={`${import.meta.env.VITE_API_URL}/activity/room.png`}
                  className="card-img-top"
                  alt="Cleaning activity 3"
                />
              </div>
            </div>
          </div>
        </div>
      );
    };

export default Activity
