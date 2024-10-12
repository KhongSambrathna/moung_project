import React, { useState, useEffect } from "react";
import axios from "axios";

function PlayerRanking() {
  // State for player goals
  const [playerGoals, setPlayerGoals] = useState([]);
  const [playerAssists, setPlayerAssists] = useState([]);
  const [pageGoals, setPageGoals] = useState(1);
  const [totalPagesGoals, setTotalPagesGoals] = useState(0);
  const [searchTermGoals, setSearchTermGoals] = useState("");

  // State for player assists
  const [pageAssists, setPageAssists] = useState(1);
  const [totalPagesAssists, setTotalPagesAssists] = useState(0);
  const [searchTermAssists, setSearchTermAssists] = useState("");

  // Fetch Data By Goal
  const fetchPlayerGoals = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/player/getPlayers`,
        {
          params: { page: pageGoals, limit: 8, search: searchTermGoals },
        }
      );
      const sortedPlayers = response.data.players.sort((a, b) => b.goals - a.goals);
      setPlayerGoals(sortedPlayers);
      setTotalPagesGoals(response.data.totalPages);
    } catch (error) {
      console.log("Error While Fetching Data Sorted By Goals", error);
    }
  };

  // Fetch Data By Assist
  const fetchPlayerAssists = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/player/getAssists`,
        {
          params: { page: pageAssists, limit: 8, search: searchTermAssists },
        }
      );
      setPlayerAssists(response.data.players);
      setTotalPagesAssists(response.data.totalPages);
    } catch (error) {
      console.log("Error While Fetching Data Sorted By Assists", error);
    }
  };

  useEffect(() => {
    fetchPlayerGoals();
  }, [pageGoals, searchTermGoals]);

  useEffect(() => {
    fetchPlayerAssists();
  }, [pageAssists, searchTermAssists]);

  const handleSearchChangeGoals = (e) => {
    setSearchTermGoals(e.target.value);
    setPageGoals(1); // Reset to page 1 on new search
  };

  const handleSearchChangeAssists = (e) => {
    setSearchTermAssists(e.target.value);
    setPageAssists(1); // Reset to page 1 on new search
  };

  const handlePageChangeGoals = (newPage) => {
    setPageGoals(newPage);
  };

  const handlePageChangeAssists = (newPage) => {
    setPageAssists(newPage);
  };

  // Fetch All players
  const [AllPlayers, setAllPlayers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/player/getAllPlayers`
        );
        setAllPlayers(response.data);
      } catch (error) {
        console.log("Error while fetching data with position GK", error);
      }
    };
    fetchData();
  }, []);
  
  
  return (
    <div className="container battambang text-nowrap">
      {/* Player Goals Section */}
      <div className="container">
        <h3 className="koulen text-center mt-3">កីឡាកររកគ្រាប់បាល់បានច្រើន</h3>
      </div>
      <div className="card-tools">
        <form>
          <div
            className="input-group input-group-sm float-right my-2"
            style={{ width: "250px" }}
          >
            <input
              type="text"
              className="form-control float-right"
              placeholder="ស្វែងរកកីឡាករ"
              value={searchTermGoals}
              onChange={handleSearchChangeGoals}
            />
          </div>
        </form>
      </div>
      <div className="table-responsive-md table-responsive-sm">
        <table className="table table-striped">
          <thead className="bg-primary text-white">
            <tr style={{ textAlign: "center" }}>
              <th scope="col">ចំណាត់ថ្នាក់</th>
              <th style={{ textAlign: "left" }} scope="col">
                កីឡាករ
              </th>
              <th scope="col">តួនាទី</th>
              <th scope="col">ភូមិ</th>
              <th scope="col">បង្ហាញខ្លួន</th>
              <th scope="col">គ្រាប់បាល់</th>
            </tr>
          </thead>
          <tbody>
            {playerGoals.map((player) => {

              let PlayerR = 0;
              for(let j=0; j<playerGoals.length; j++){
                if(player._id === AllPlayers[j]._id){
                  PlayerR = j+1;
                  break;
                }
              }
              return (
                <tr style={{ textAlign: "center" }} key={player.id}>
                  <td scope="row">{PlayerR}</td> {/* Display ranking */}
                  <td style={{ textAlign: "left" }}>{player.name}</td>
                  <td>{player.position}</td>
                  <td>{player.Village}</td>
                  <td>{player.appearances}</td>
                  <td>{player.goals}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="card-footer clearfix">
          <ul className="pagination pagination-sm m-0 float-right">
            <li
              className="page-item"
              onClick={() => handlePageChangeGoals(pageGoals - 1)}
              disabled={pageGoals === 1}
            >
              <a className="page-link">«</a>
            </li>
            {[...Array(totalPagesGoals)].map((_, idx) => (
              <li
                key={idx}
                className={`page-item ${pageGoals === idx + 1 ? "active" : ""}`}
                onClick={() => handlePageChangeGoals(idx + 1)}
              >
                <a className="page-link">{idx + 1}</a>
              </li>
            ))}
            <li
              className="page-item"
              onClick={() => handlePageChangeGoals(pageGoals + 1)}
              disabled={pageGoals === totalPagesGoals}
            >
              <a className="page-link">»</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Player Assists Section */}
      <div className="container battambang text-nowrap">
        <div className="container">
          <h3 className="koulen text-center mt-3">
            កីឡាករបញ្ជូនបាល់ឱ្យមិត្តរួមក្រុមស៊ុត
          </h3>
        </div>
        <div className="card-tools">
          <form>
            <div
              className="input-group input-group-sm float-right my-2"
              style={{ width: "250px" }}
            >
              <input
                type="text"
                className="form-control float-right"
                placeholder="ស្វែងរកកីឡាករ"
                value={searchTermAssists}
                onChange={handleSearchChangeAssists}
              />
            </div>
          </form>
        </div>

        <div className="table-responsive-md table-responsive-sm">
          <table className="table table-striped">
            <thead className="bg-primary text-white">
              <tr style={{ textAlign: "center" }}>
                <th scope="col">ចំណាត់ថ្នាក់</th>
                <th style={{ textAlign: "left" }} scope="col">
                  កីឡាករ
                </th>
                <th scope="col">តួនាទី</th>
                <th scope="col">ភូមិ</th>
                <th scope="col">បង្ហាញខ្លួន</th>
                <th scope="col">អាស៊ីស</th>
              </tr>
            </thead>
            <tbody>
              {playerAssists.map((player, index) => (
                <tr style={{ textAlign: "center" }} key={player.id}>
                  <td scope="row">{(pageAssists - 1) * 8 + index + 1}</td>
                  <td style={{ textAlign: "left" }}>{player.name}</td>
                  <td>{player.position}</td>
                  <td>{player.Village}</td>
                  <td>{player.appearances}</td>
                  <td>{player.assists}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="card-footer clearfix">
            <ul className="pagination pagination-sm m-0 float-right">
              <li
                className="page-item"
                onClick={() => handlePageChangeAssists(pageAssists - 1)}
                disabled={pageAssists === 1}
              >
                <a className="page-link">«</a>
              </li>
              {[...Array(totalPagesAssists)].map((_, idx) => (
                <li
                  key={idx}
                  className={`page-item ${pageAssists === idx + 1 ? "active" : ""}`}
                  onClick={() => handlePageChangeAssists(idx + 1)}
                >
                  <a className="page-link">{idx + 1}</a>
                </li>
              ))}
              <li
                className="page-item"
                onClick={() => handlePageChangeAssists(pageAssists + 1)}
                disabled={pageAssists === totalPagesAssists}
              >
                <a className="page-link">»</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerRanking;
