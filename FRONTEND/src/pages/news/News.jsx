import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LatestPost from "./LatestPost";
import RandomNews from "./RandomNews";

function News() {
  const [contents, setContent] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch data with search term and pagination
  const fetchData = async (page = 1, search = "") => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/news`, {
        params: {
          search, // Send search term to the backend
          page,
          limit: 8, // Adjust the limit of results per page as needed
        },
      });
      setContent(response.data.contents);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
    } catch (error) {
      console.log("Error while fetching content", error);
    }
  };

  // Debounce the fetchData function to avoid multiple rapid calls during typing
  const debounceFetchData = useCallback(debounce(fetchData, 500), []);

  useEffect(() => {
    debounceFetchData(); // Fetch all data when the component mounts
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Update the search term state
    debounceFetchData(1, e.target.value); // Fetch data with the new search term
  };

  const handlePageChange = (page) => {
    fetchData(page, searchTerm); // Fetch data for the new page with the current search term
  };

  return (
    <section className="blog-listing gray-bg">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="col-lg-12 col-md-12 col-sm-12 p-0 float-right mt-4">
              <input
                type="text"
                placeholder="ស្វែងរកចំណងជើង..."
                className="form-control"
                id="search"
                name="search"
                value={searchTerm}
                onChange={handleSearchChange} // Fetch as the user types
              />
            </div>
          </div>
        </div>

        <div className="row align-items-start">
          <div className="col-lg-8 m-15px-tb">
            <div className="row">
              {contents.map((content) => (
                <div className="col-sm-6" key={content._id}>
                  <div className="blog-grid">
                    <div className="blog-img">
                      <div className="date text-center">
                        <span>
                          {new Date(content.date_published).getDate()}
                        </span>
                        <label>
                          {new Date(content.date_published)
                            .toLocaleString("en-US", { month: "short" })
                            .toUpperCase()}
                        </label>
                      </div>
                      <Link to={`/news/news_detail/${content._id}`}>
                        <img style={{"width":"100%"}}
                          src={`${content.cover_url}`}
                          alt={content.title}
                        />
                      </Link>
                    </div>
                    <div className="blog-info">
                      <h5>
                        <Link to={`/news/news_detail/${content._id}`}>
                          {content.title}
                        </Link>
                      </h5>
                      <p>{content.summary}</p>
                      <div className="btn-bar">
                        <Link
                          to={`/news/news_detail/${content._id}`}
                          className="px-btn-arrow"
                        >
                          <span>អានបន្ថែម</span>
                          <i className="arrow"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="row">
              <div className="col-lg-12">
                <nav aria-label="Page navigation example">
                  <ul className="pagination job-pagination justify-content-center mt-5 mb-5">
                    <li
                      className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(currentPage - 1)}
                      >
                        &lt;
                      </button>
                    </li>
                    {Array.from({ length: totalPages }, (_, index) => (
                      <li
                        key={index + 1}
                        className={`page-item ${
                          currentPage === index + 1 ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(index + 1)}
                        >
                          {index + 1}
                        </button>
                      </li>
                    ))}
                    <li
                      className={`page-item ${
                        currentPage === totalPages ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(currentPage + 1)}
                      >
                        &gt;
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
          <div className="col-lg-4 m-15px-tb blog-aside float-right">
          <LatestPost />
          <RandomNews/>
          </div>
          
        </div>
      </div>
    </section>
  );
}

export default News;

// Utility function to debounce calls
function debounce(fn, delay) {
  let timeoutId;
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
