import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import './ContentEditor.css';

function ContentEditor() {
  const [contents, setContents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/content?title=${searchTerm}`);
        setContents(response.data);
      } catch (error) {
        console.log("Can't Get Content", error);
      }
    };

    fetchData();
  }, [searchTerm]);

  const totalPages = Math.ceil(contents.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = contents.slice(indexOfFirstItem, indexOfLastItem);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  //Delete USer
  const deleteContent = async (contentId) => {
    await axios.delete(`${import.meta.env.VITE_API_URL}/api/delete/${contentId}`)
    .then((response)=>{
        setContents((prevContents) => prevContents.filter((content) => content._id !== contentId));
        // toast.success(response.data.message, {position: "top-right"})
    })
    
    .catch((err)=>{
        console.log("Delete unsuccessfully.");
    })
}

  return (
    <div className="container">
      <div className="row align-items-center d-flex justify-content-around">
        <div className="col-lg-9">
          <div className="col-lg-6 col-md-6 col-sm-12 p-0 float-left mt-4">
            <Link to={"/admin/editor/create/"} className="btn btn-outline btn-sm text-light border-primary bg-primary">បង្កើតមាតិកាថ្មី</Link>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 p-0 float-right mt-4">
            <input
              type="text"
              placeholder="ស្វែងរកតាមរយៈចំណងជើង..."
              className="form-control"
              id="search"
              name="search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>

      <div className="row d-flex justify-content-around">
        <div className="col-lg-9">
          <div className="candidates-listing-item">
            {currentItems.map((content) => (
              <div className="list-grid-item mt-4 p-2" key={content._id}>
                <div className="row">
                  <div className="col-md-9">
                    <div className="candidates-img float-left mr-4">
                      {/* Ensure to use forward slashes and correct file extension */}
                      <img
                        src={`${content.cover_url}`} // Always use forward slashes
                        className="img-fluid d-block rounded"
                        alt={content.title}
                      />
                    </div>
                    <div className="candidates-list-desc job-single-meta pt-2">
                      <h5 className="mb-2 f-19">
                        <Link to={`/admin/editor/update/${content._id}`} className="text-dark">{content.title}</Link>
                      </h5>
                      <p className="text-muted mt-1 mb-0">Published Date: {new Date(content.date_published).toISOString().split('T')[0]}</p>
                      <p className="text-muted mt-1 mb-0">Views: {content.views}</p>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="candidates-list-fav-btn text-right">
                      <button onClick={()=>deleteContent(content._id)} type="button" className="btn btn-danger ml-2">
                          Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <nav aria-label="Page navigation example">
            <ul className="pagination job-pagination justify-content-center mt-5 mb-5">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <a className="page-link" onClick={() => handlePageChange(currentPage - 1)}>&lt;</a>
              </li>
              {Array.from({ length: totalPages }, (_, index) => (
                <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                  <a className="page-link" onClick={() => handlePageChange(index + 1)}>{index + 1}</a>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <a className="page-link" onClick={() => handlePageChange(currentPage + 1)}>&gt;</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default ContentEditor;
