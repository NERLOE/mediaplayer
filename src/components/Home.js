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
      <div class="home">
        <h1 class="text-center header">
          Vælg den film / serie, du gerne vil se!
        </h1>
        <section id="new">
          <div className={"media-list fade" + (this.state.in ? " in" : "")}>
            <span>
              {data.map(media => {
                if (media.display != null && !media.display) return null;

                return (
                  <div class="ml-item">
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
                      <span className="mli-rating">IBM</span>
                      <img
                        class="thumb mli-thumb"
                        src={media.thumbnail}
                        alt=""
                      />
                    </Link>
                    <h1>{media.title}</h1>
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
