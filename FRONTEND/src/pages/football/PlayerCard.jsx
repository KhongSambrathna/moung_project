import React from "react";
import imgPlayers from "../../assets/player/teacher.jpg"; // Default image
import './playerCard.css';

function PlayerCard(props) {
  const { PlayerRole, PlayerImage, PlayerNumber, PlayerName } = props;

  return (
    <div className="col-6 col-sm-6 col-lg-3">
      <div className="player-card wow fadeInUp" data-wow-delay="0.2s">
        <div className="player-image" style={{ backgroundImage: `url(${PlayerImage || imgPlayers})` }}>
          <div className="player-details">
            <h1 className="player-number">{PlayerNumber}</h1>
            <h6 className="player-name">{PlayerName}</h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerCard;
