import React, { Component } from "react";
import Timeline from "./Timeline";
import LanguageButton from "./buttons/language/LanguageButton";
import AudioButton from "./buttons/audio/AudioButton";
import QualityButton from "./buttons/quality/QualityButton";
import FullscreenButton from "./buttons/fullscreen/FullscreenButton";

class BottomUI extends Component {
  convert_time(seconds) {
    var s = seconds,
      h = Math.floor(s / 3600);
    s -= h * 3600;
    var m = Math.floor(s / 60);
    s -= m * 60;
    s = Math.floor(s);

    if (seconds >= 3600) {
      return (
        "0" + h + "." + (m < 10 ? "0" + m : m) + "." + (s < 10 ? "0" + s : s)
      );
    } else {
      return (m < 10 ? "0" + m : m) + "." + (s < 10 ? "0" + s : s);
    }
  }
  render() {
    let { play, props } = this.props;
    return (
      <div className="bottom-ui">
        <div className="metadata">
          <div className="ui-cell image" style={props.coverImg} />
          <div className="text">
            <div className="text-container">
              <h1
                className="title"
                style={
                  props.mediaData.subTitle === "" ? { display: "block" } : null
                }
              >
                {props.mediaData.title}
              </h1>
              {props.mediaData.subTitle !== "" && (
                <h2 className="subtext">{props.mediaData.subTitle}</h2>
              )}
            </div>
          </div>
        </div>
        <div>
          <div className="ui-row playback-controls">
            <div className="ui-cell control-btn">
              <span />
              <button className={props.playing ? "pause" : "play"} />
            </div>
            <Timeline play={play} style={props} />
            <label className="ui-cell time-label">
              {this.convert_time(props.duration - props.currentTime)}
            </label>
            <LanguageButton
              props={props}
              switchSubtitle={this.props.switchSubtitle}
            />
            <AudioButton
              changeVolume={this.props.changeVolume}
              props={props}
              mute={this.props.mute}
            />
            <QualityButton />
            <FullscreenButton />
          </div>
        </div>
      </div>
    );
  }
}

export default BottomUI;
