import React, { useEffect, useState } from 'react';
import axios from 'axios';

function RandomNews() {
  const [randomPosts, setRandomPosts] = useState([]);

  // Fetch random posts from backend
  useEffect(() => {
    const fetchRandomPosts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/randomNews`);
        setRandomPosts(response.data); // Update state with random posts data
      } catch (error) {
        console.log("Error fetching random posts", error);
      }
    };

    fetchRandomPosts();
  }, []);

  return (
    <>
      {/* Random News */}
      <div className="widget widget-random-post">
        <div className="widget-title">
          <h3>ពត៌មានផ្សេងៗ</h3>
        </div>
        <div className="widget-body">
          {/* Render the random posts */}
          {randomPosts.map((post) => (
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
                    src={`${post.cover_url}`}
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

export default RandomNews;
