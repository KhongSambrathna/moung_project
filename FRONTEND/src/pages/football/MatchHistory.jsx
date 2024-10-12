import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MatchHistory() {
  const [histories, setHistories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async (search = '', currentPage = 1) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/getMatchHistories`, {
        params: { search, page: currentPage },
      });
      setHistories(response.data);
      setTotalPages(Math.ceil(response.data.length / 10)); // Adjust for real pagination if backend returns count
    } catch (error) {
      console.log('Error while fetching data match histories', error);
    }
  };

  useEffect(() => {
    fetchData(searchTerm, page);
  }, [searchTerm, page]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const getWinLoseBackgroundClass = (winlose) => {
    switch (winlose) {
      case 'ឈ្នះ':
        return 'text-primary';
      case 'ចាញ់':
        return 'text-danger';
      case 'ស្មើ':
        return 'text-warning';
      default:
        return 'text-light';
    }
  };

  return (
    <>
      <div className="container battambang text-nowrap">
        <div className="container">
          <h3 className="koulen text-center mt-3">ប្រវត្តិប្រកួត</h3>
        </div>
        <div>
          <div className="card-tools">
            <form>
              <div className="input-group input-group-sm float-right my-2" style={{ width: '250px' }}>
                <input
                  type="text"
                  name="table_search"
                  className="form-control float-right"
                  placeholder="គូរប្រកួត"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </form>
          </div>
        </div>
        <div className="table-responsive-md table-responsive-sm">
          <table className="table table-striped">
            <thead className="bg-primary text-white">
              <tr>
                <th style={{ textAlign: 'center' }} scope="col">ល.រ</th>
                <th style={{ textAlign: 'center' }} scope="col">កាលបរិច្ឆេទ</th>
                <th style={{ textAlign: 'center' }} scope="col">ការប្រកួត</th>
                <th scope="col">ប្រកួតរវាង</th>
                <th scope="col">គូរប្រកួត</th>
                <th style={{ textAlign: 'center' }} scope="col">លទ្ធផល</th>
                <th style={{ textAlign: 'center' }} scope="col">ឈ្នះ/ចាញ់</th>
                <th scope="col">ទីលាន</th>
              </tr>
            </thead>
            <tbody>
              {histories.length > 0 ? (
                histories.map((history, index) => (
                  <tr key={index}>
                    <th style={{ textAlign: 'center' }} scope="col">{index + 1}</th>
                    <th style={{ textAlign: 'center' }} scope="col">{new Date(history.date).toISOString().split('T')[0]}</th>
                    <th style={{ textAlign: 'center' }} scope="col">{history.league}</th>
                    <th scope="col">{history.team}</th>
                    <th scope="col">{history.opponent}</th>
                    <th style={{ textAlign: 'center' }} scope="col">{history.result}</th>
                    <th style={{ textAlign: 'center' }} scope="col">
                      <span className={`p-1 ${getWinLoseBackgroundClass(history.winlose)}`}>
                        {history.winlose}
                      </span>
                    </th>
                    <th scope="col">{history.location}</th>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">No matches found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="card-footer clearfix">
          <ul className="pagination pagination-sm m-0 float-right">
            <li className="page-item" onClick={() => handlePageChange(page - 1)}>
              <a className="page-link" href="#">«</a>
            </li>
            {[...Array(totalPages)].map((_, idx) => (
              <li key={idx} className={`page-item ${page === idx + 1 ? 'active' : ''}`} onClick={() => handlePageChange(idx + 1)}>
                <a className="page-link" href="#">{idx + 1}</a>
              </li>
            ))}
            <li className="page-item" onClick={() => handlePageChange(page + 1)}>
              <a className="page-link" href="#">»</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default MatchHistory;
