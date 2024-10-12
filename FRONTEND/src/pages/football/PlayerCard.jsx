import imgPlayers from "../../assets/player/teacher.jpg";
function PlayerCard(props) {
  const {PlayerRole, PlayerImage, PlayerNumber, PlayerName} = props;
  return (
        <div className="col-12 col-sm-6 col-lg-3">
          <div
            className="single_advisor_profile wow fadeInUp"
            data-wow-delay="0.2s"
            style={{
              visibility: "visible",
              animationDelay: "0.2s",
              animationName: "fadeInUp",
            }}
          >
            <div className="advisor_thumb">
              <img src={PlayerImage} />
              <h1 className="social-info m-0 p-0">
                <a style={{ fontSize: "50px", padding: "0", margin: "0" }}>
                  {PlayerNumber}
                </a>
              </h1>
            </div>
            <div className="single_advisor_details_info">
              <h6>{PlayerName}</h6>
              <p className="designation">{PlayerRole}</p>
            </div>
          </div>
        </div>
  );
}

export default PlayerCard;
