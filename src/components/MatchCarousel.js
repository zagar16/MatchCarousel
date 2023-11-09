import React, { Component } from "react";
import Card from "./Card";
import "./MatchCarousel.css";

class MatchCarousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      matches: [],
      currentIndex: 0,
      matchArraysWithData:[],
      maxCards: props.max || 10,
      sportsId: props.sportId || 0,
    };
  }

  componentDidMount() {
    this.fetchData();

    this.interval = setInterval(() => {
      const { currentIndex, maxCards } = this.state;
      if (currentIndex === maxCards - 1) {
        this.setState({ currentIndex: 0 });
      } else {
        this.setState((prevState) => ({
          currentIndex: prevState.currentIndex + 1,
        }));
      }
    }, 3000);
  }

  resetAutoPlayTimer() {
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      const { currentIndex, maxCards } = this.state;
      if (currentIndex === maxCards - 1) {
        this.setState({ currentIndex: 0 });
      } else {
        this.setState((prevState) => ({
          currentIndex: prevState.currentIndex + 1,
        }));
      }
    }, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  async fetchData() {
    try {
      const response = await fetch(
        "https://lmt.fn.sportradar.com/demolmt/en/Etc:UTC/gismo/event_fullfeed/0/1/12074"
      );
      const data = await response.json();
      this.setState({ matches: data });

      const matchesArray = Object.values(data);
      matchesArray.forEach((match) => {
        const rc = match?.[0]?.data?.[this.state.sportsId]?.realcategories;
  
        if (rc) {
          rc.forEach((category) => {
            const tournaments = category?.tournaments;
            const categoryName = category?.name;
  
            if (tournaments) {
              tournaments.forEach((tournament) => {
                const tournamentName = tournament?.name;
                const tournamentSeasonTypeName = tournament?.seasontypename;
                const matches = tournament?.matches;
  
                if (matches) {
                  matches.forEach((match) => {
                    const awayTeamName = match?.teams?.away?.name;
                    const homeTeamName = match?.teams?.home?.name;
                    const matchStatusId = match?.status._id;
                    const matchStatusName = match?.status.name;
                    const matchDate = match?._dt.date;
                    const matchTime = match?._dt.time;
                    const resultAway = match?.result.away;
                    const resultHome = match?.result.home;
                    const awayTeamFlagID = match?.teams?.away?.uid;
                    const homeTeamFlagID = match?.teams?.home?.uid;
  
                    const matchArray = [
                      homeTeamName,
                      awayTeamName,
                      matchStatusId,
                      matchStatusName,
                      matchDate,
                      matchTime,
                      resultAway,
                      resultHome,
                      tournamentName,
                      tournamentSeasonTypeName,
                      categoryName,
                      homeTeamFlagID,
                      awayTeamFlagID,
                    ];
  
                    this.state.matchArraysWithData.push(matchArray);
                  });
                }
              });
            }
          });
        }
      });
      this.setState({ maxCards: Math.min(this.state.maxCards, this.state.matchArraysWithData.length) });
    } catch (error) {
      console.log(error);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.max !== prevProps.max) {
      this.setState({ maxCards: this.props.max });
      this.setState({ currentIndex: 0 });
    }
    if (this.props.sportId !== prevProps.sportId) {
      this.setState({ sportsId: this.props.sportId });
      this.setState({ currentIndex: 0 });
    }
  }

  render() {
    const { currentIndex } = this.state;

    const selectedMatches = this.state.matchArraysWithData.slice(0, this.state.maxCards);

    // v primeru ce je razpoložljivih manj kot 10 tekm določenega sporta
    if(selectedMatches.length > this.state.maxCards){
      this.setState({ maxCards: selectedMatches.length });
    }

    const handleClick = (componentNumber) => {
      this.setState({ currentIndex: componentNumber });
    };

    return (
      <div>
        <div className="container">
          {selectedMatches.map((match, index) => {
            return (
              <Card
                match={match}
                key={index}
                index={index}
                homeTeamName={match[0]}
                awayTeamName={match[1]}
                matchStatusId={match[2]}
                matchStatusName={match[3]}
                matchDate={match[4]}
                matchTime={match[5]}
                resultAway={match[6]}
                resultHome={match[7]}
                tournamentName={match[8]}
                tournamentSeasonTypeName={match[9]}
                categorieName={match[10]}
                homeTeamFlagID={match[11]}
                awayTeamFlagID={match[12]}
                show={index === currentIndex}
              />
            );
          })}
        </div>

        <div className="dot-container">
          {selectedMatches.map((item, index) => {
            return (
              <button
                key={index}
                onClick={() => {
                  handleClick(index);
                  this.resetAutoPlayTimer();
                }}
              >
                <span
                  className={`dot ${index === currentIndex ? "active" : ""}`}
                ></span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }
}

export default MatchCarousel;
