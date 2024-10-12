import React, { useEffect, useState } from 'react';
import axios from 'axios';

function LatestPost() {
  const [latestPosts, setLatestPosts] = useState([]);

  // Fetch latest posts from backend
  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/latestNews`);
        setLatestPosts(response.data); // Update state with latest posts data
      } catch (error) {
        console.log("Error fetching latest posts", error);
      }
    };

    fetchLatestPosts();
  }, []);

  return (
    <>
      {/* Latest Post */}
      <div className="widget widget-latest-post">
        <div className="widget-title">
          <h3>ពត៌មានថ្មីៗ</h3>
        </div>
        <div className="widget-body">
          {/* Render the latest posts */}
          {latestPosts.map((post) => (
            <div className="latest-post-aside media" key={post._id}>
              <div className="lpa-left media-body">
                <div className="lpa-title">
                  <h5><a href={`/news/news_detail/${post._id}`}>{post.title}</a></h5>
                </div>
                <div className="lpa-meta">
                  <a className="name">
                    អនុវិទ្យាល័យមោង
                  </a>
                  <a className="date" href="#">
                    {new Date(post.date_published).getDate()} {new Date(post.date_published).toLocaleString('en-US', { month: 'short' }).toUpperCase()} {new Date(post.date_published).getFullYear()}
                  </a>
                </div>
              </div>
              <div className="lpa-right">
                <a href={`/news/news_detail/${post._id}`}>
                  <img
                    src={`${import.meta.env.VITE_API_URL}/content/${(post.cover_url).split('uploads\\content\\').pop()}`}
                    alt={post.title}
                    title={post.title}
                  />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </>
    
  );
}

export default LatestPost;

