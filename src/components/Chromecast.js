import React, { Component } from "react";

export class Chromecast extends Component {
  render() {
    return (
      <div
        className="chromecast-curtain"
        style={{
          "background-image":
            'url("https://i-viaplay-com.akamaized.net/viaplay-prod/112/436/1538727419-6b48e6a632313abb71c17a2f60ecb2ffaf6c1cd6.jpg?width=1280")'
        }}
      >
        <div className="chromecast-curtain-inner">
          <div className="ui-cell control-btn chromecast-connected">
            <button className="chromecast-connected-icon" />
          </div>
          <span className="chromecast-text">
            Connected to Marcus Chromecast
          </span>
        </div>
      </div>
    );
  }
}

export default Chromecast;
