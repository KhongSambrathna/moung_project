import LatestPost from './LatestPost';
import RandomNews from './RandomNews';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom'; 
import moungLogo from '../../../src/assets/logo/moung.jpg';
import './newDetails.css'

function NewDetails() {
  const { contentId } = useParams(); // Make sure this matches the URL parameter

  const [conDetail, setContent] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching content with ID:", contentId); // Log the ID
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/news_detail/${contentId}`);
        setContent(response.data); 
      } catch (error) {
        console.log("Error while fetching news details:", error.response ? error.response.data : error.message);
        setError("Failed to load content.");
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, [contentId]); // Only run when contentId changes

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>{error}</div>; 
  }

  return (
    <div className="blog-single gray-bg">
      <div className="container">
        <div className="row align-items-start">
          <div className="col-lg-8 m-15px-tb">
            {conDetail && (
              <article className="article">
                <div className="article-img">
                <img src={`${conDetail.image_url}` || "https://via.placeholder.com/800x350/87CEFA/000000"} />
                </div>
                <div className="article-title koulen">
                  <h3>{conDetail.title}</h3>
                  <div className="media">
                    <div className="avatar">
                      <img src={moungLogo || "https://bootdey.com/img/Content/avatar/avatar1.png"} alt="Avatar" />
                    </div>
                    <div className="media-body">
                      <label>អនុវិទ្យាល័យមោង</label>
                      <span>កាលបរិច្ឆេទ : {new Date(conDetail.date_published).toLocaleDateString() || "Unknown Date"}</span>
                    </div>
                    <div className="media-body">
                      <span className='float-right'>ចំនួនអ្នកមើល : {conDetail.views} នាក់</span>
                    </div>
                  </div>
                </div>
                <div className="article-content battambang" dangerouslySetInnerHTML={{ __html: conDetail.content }} />
              </article>
            )}
          </div>
          {/* <LatestPost /> */}
          <div className="col-lg-4 m-15px-tb blog-aside float-right">
          <LatestPost />
          <RandomNews/>
          </div>
        </div>

      </div>
    </div>
  );
}

export default NewDetails;
