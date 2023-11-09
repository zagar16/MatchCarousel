import "./Card.css";
import bgPre from "../assets/bg-prematch.jpg";
import bgLive from "../assets/bg-live.jpg";
import bgPost from "../assets/bg-postmatch.jpg";

const Card = (props) => {
  let backgroundImage = bgLive;
  if (props.matchStatusId === 0) {
    backgroundImage = bgPre;
  } else if (props.matchStatusId === 100) {
    backgroundImage = bgPost;
  }

  let startingCss;
  if (props.show === true) {
    startingCss = "match-show";
  } else {
    startingCss = "match-hide";
  }

  const textTournament = props.tournamentName + " - " + props.tournamentSeasonTypeName;
  
  return (
    <div className={startingCss}>
      <div className="image-container">
  
        <img src={backgroundImage} alt="Match" width="100%" height="100%" />

        <div className="image-text-tournament">
          <p
            className={
              textTournament.length > 50
                ? "long-text"
                : textTournament.length > 70
                ? "even-longer-text"
                : "short-text"
            }
          >
            {textTournament}
          </p>
          <p className="gametype">{props.categorieName}</p>
        </div>

        <div className="image-teams-left">
          <img
            src={`https://img.sportradar.com/ls/crest/medium/${props.homeTeamFlagID}.png`}
            alt="Home team flag"
          />
          <p>{props.homeTeamName}</p>
        </div>

        <div>
          {props.matchStatusId === 0 ? (
            <div className="notstarted">
              <p className="textVS">VS</p>
              <p className="textTime">{props.matchTime}</p>
              <p className="textDate"> {props.matchDate}</p>
            </div>
          ) : (
            <p className="image-text-score">
              <span style={{ padding: "0 5px" }}>{props.resultHome}</span>:
              <span style={{ padding: "0 5px" }}>{props.resultAway}</span>
            </p>
          )}
        </div>

        <div className="image-teams-right">
          <img
            src={`https://img.sportradar.com/ls/crest/medium/${props.awayTeamFlagID}.png`}
            alt="Away team flag"
          />

          <p>{props.awayTeamName}</p>
        </div>

        <div className="matchstatus">{props.matchStatusName.toUpperCase()}</div>
        <div
          className={`matchstatus ${
            props.matchStatusName === "Not started"
              ? "statusnotstarted"
              : props.matchStatusName === "Ended"
              ? "statusended"
              : "statuslive"
          }`}
        >
          {props.matchStatusName.toUpperCase()}
        </div>
      </div>
    </div>
  );
};

export default Card;
