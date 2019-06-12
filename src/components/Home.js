import React, { Component } from "react";
import { Link } from "react-router-dom";
import data from "../data.json";

export class Home extends Component {
  constructor() {
    super();

    let imdbJson = [];
    data.map((media, id) => {
      fetch("http://www.omdbapi.com/?t=" + media.title + "&apikey=817d4750")
        .then(res => res.json())
        .then(function(data) {
          imdbJson.push(data);
        });
    });

    console.log(imdbJson);

    this.state = {
      in: false,
      imdbJSON: imdbJson
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState(state => {
        return {
          ...state,
          in: true
        };
      });
    }, 100);
  }
  render() {
    return (
      <div className="home">
        <h1 className="text-center header">
          Vælg den film / serie, du gerne vil se!
        </h1>
        <section id="new">
          <div className={"media-list fade" + (this.state.in ? " in" : "")}>
            <span>
              {data.map((media, i) => {
                if (media.display != null && !media.display) return null;

                let imdb = this.state.imdbJSON[i];
                return (
                  <div className="ml-item" key={i}>
                    <Link
                      className="ml-mask"
                      to={
                        "/player/film/" +
                        media.title
                          .toLowerCase()
                          .split(" ")
                          .join("-")
                          .replace(/[^0-9a-z-]/gi, "")
                      }
                    >
                      {imdb != null && (
                        <span className="mli-rating">
                          IMDB {imdb.imdbRating}
                        </span>
                      )}
                      <img
                        className="thumb mli-thumb"
                        src={media.thumbnail}
                        alt=""
                      />
                      <span className="mli-info">
                        <h2>{media.title}</h2>
                      </span>
                    </Link>
                  </div>
                );
              })}
            </span>
          </div>
        </section>
      </div>
    );
  }
}

export default Home;
