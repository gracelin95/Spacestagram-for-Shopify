import React from "react";
import "./Home.css";

import { TiHeartOutline } from "react-icons/ti";
import { TiHeart } from "react-icons/ti";

import { useState, useEffect } from "react";

function Home() {
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [likes, setLikes] = useState({});

  useEffect(() => {
    const fetchNasaData = async () => {
      setLoading(true);
      const res = await fetch(process.env.REACT_APP_NASA_API_KEY);
      const json = await res.json();

      setEventData(json);
      setLoading(false);
    };

    fetchNasaData();
  }, []);

  const addLikes = (idx) => {
    let copyOfLikes = { ...likes };

    if (likes[idx]) {
      delete copyOfLikes[idx];
    } else {
      copyOfLikes[idx] = true;
    }
    setLikes(copyOfLikes);
  };

  return (
    <div>
      {eventData.map((event, idx) => (
        <div className="event-card" key={idx}>
          <h2>{event.title}</h2>
          <h5>
            {event.copyright + " "}
            {event.date}
          </h5>
          <div className="image-div">
            <img className="image" src={event.url} alt={event.title} />
          </div>
          <p>{event.explanation}</p>
          <div className="like-button">
            <button className="button" onClick={() => addLikes(idx)}>
              {!likes[idx] ? "Like" : "Unlike"}
              {!likes[idx] ? (
                <TiHeartOutline style={{ fontSize: "20px" }} />
              ) : (
                <TiHeart style={{ color: "red", fontSize: "20px" }} />
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
