import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import MediaPlayer from "./components/MediaPlayer";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <div className="react-mount">
        <Route exact path="/" component={Home} />
        <Route path="/player/film/:title" component={MediaPlayer} />
        <Route path="/film/:title" component={MediaPlayer} />
        <Route
          path="/player/serier/:title/saeson-:season/afsnit-:episode"
          component={MediaPlayer}
        />
        <Route path="/serier/:title/" component={MediaPlayer} />
        <Route
          path="/serier/:title/saeson-:season/afsnit-:episode"
          component={MediaPlayer}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
