import React, { useEffect, useState } from 'react';
import PlayerCard from "./PlayerCard";
import PlayerPosition from "./PlayerPosition";
import axios from 'axios';
function Players() {
  // Fetch Data With Position GK
  const [playersGK, setPlayersGK] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/player/getGoalkeepers`);
        setPlayersGK(response.data);
      } catch (error) {
        console.log("Error while fetching data with position GK", error);
      }
    };
    fetchData();
  }, []);
  // Fetch Data With Position DF
  const [playersDF, setPlayersDF] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/player/getDefenders`);
        setPlayersDF(response.data);
      } catch (error) {
        console.log("Error while fetching data with position DF", error);
      }
    };
    fetchData();
  }, []);
  // Fetch Data With Position MF
  const [playersMF, setPlayersMF] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/player/getMidfielders`);
        setPlayersMF(response.data);
      } catch (error) {
        console.log("Error while fetching data with position MF", error);
      }
    };
    fetchData();
  }, []);
  // Fetch Data With Position AT
  const [playersAT, setPlayersAT] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/player/getAttackers`);
        setPlayersAT(response.data);
      } catch (error) {
        console.log("Error while fetching data with position AT", error);
      }
    };
    fetchData();
  }, []);
  // Fetch Data With Position COACH
  const [Coach, setCoach] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/player/getCoach`);
        setCoach(response.data);
      } catch (error) {
        console.log("Error while fetching data with position Coach", error);
      }
    };
    fetchData();
  }, []);
  return (
    //
    <div className="container">
      <PlayerPosition position="អ្នកចាំទី" />
      <div className="row battambang">
        {playersGK.map((player, index) => (
          <PlayerCard 
            key={index}
            PlayerRole={player.position}
            PlayerImage={player.photo} 
            PlayerNumber={player.number} 
            PlayerName={player.name}
          />
        ))}
      </div>

      <PlayerPosition position="ខ្សែរការពារ" />
      <div className="row battambang">
        {playersDF.map((player, index) => (
          <PlayerCard 
            key={index}
            PlayerRole={player.position}
            PlayerImage={player.photo} 
            PlayerNumber={player.number} 
            PlayerName={player.name}
          />
        ))}
      </div>

      <PlayerPosition position="ខ្សែរបម្រើ" />
      <div className="row battambang">
        {playersMF.map((player, index) => (
          <PlayerCard 
            key={index}
            PlayerRole={player.position}
            PlayerImage={player.photo} 
            PlayerNumber={player.number} 
            PlayerName={player.name}
          />
        ))}
      </div>

      <PlayerPosition position="ខ្សែរប្រយុទ្ធ" />
      <div className="row battambang">
        {playersAT.map((player, index) => (
          <PlayerCard 
            key={index}
            PlayerRole={player.position}
            PlayerImage={player.photo} 
            PlayerNumber={player.number} 
            PlayerName={player.name}
          />
        ))}
      </div>

      <PlayerPosition position="គ្រូបង្វឹក" />
      <div className="row battambang">
        {Coach.map((player, index) => (
          <PlayerCard 
            key={index}
            PlayerRole={player.position}
            PlayerImage={player.photo} 
            PlayerNumber={player.number} 
            PlayerName={player.name}
          />
        ))}
      </div>

    </div>
  );
}

export default Players;
