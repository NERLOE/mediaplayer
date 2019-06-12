import React, { Component } from "react";
import { PlaybackControls } from "./PlaybackControls";

class BottomUI extends Component {
  render() {
    let { play, props } = this.props;
    return (
      <div className="bottom-ui">
        {props.mediaData != null && (
          <div className="metadata">
            <div className="ui-cell image" style={props.coverImg} />
            <div className="text">
              <div className="text-container">
                {props.mediaData.showTitle == null ||
                  (props.mediaData.showTitle && (
                    <h1
                      className="title"
                      style={
                        props.mediaData.subTitle === ""
                          ? { display: "block" }
                          : null
                      }
                    >
                      {props.mediaData.title}
                    </h1>
                  ))}
                {props.mediaData.subTitle !== "" && (
                  <h2 className="subtext">{props.mediaData.subTitle}</h2>
                )}
              </div>
            </div>
          </div>
        )}
        <PlaybackControls
          props={props}
          play={play}
          switchSubtitle={this.props.switchSubtitle}
          changeVolume={this.props.changeVolume}
          mute={this.props.mute}
        />
      </div>
    );
  }
}

export default BottomUI;
