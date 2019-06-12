import React, { Component } from "react";
import Timeline from "./Timeline";
import LanguageButton from "./buttons/language/LanguageButton";
import AudioButton from "./buttons/audio/AudioButton";
import QualityButton from "./buttons/quality/QualityButton";
import FullscreenButton from "./buttons/fullscreen/FullscreenButton";

export class PlaybackControls extends Component {
  convert_time(seconds) {
    console.log(seconds);
    var s = seconds,
      h = Math.floor(s / 3600);
    s -= h * 3600;
    var m = Math.floor(s / 60);
    s -= m * 60;
    s = Math.floor(s);

    if (
      seconds >= 3600 ||
      this.props.props.mediaData == null ||
      this.props.props.player == null
    ) {
      return (
        "0" + h + "." + (m < 10 ? "0" + m : m) + "." + (s < 10 ? "0" + s : s)
      );
    } else {
      return (m < 10 ? "0" + m : m) + "." + (s < 10 ? "0" + s : s);
    }
  }
  render() {
    const { props, play } = this.props;
    return (
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
          {props.mediaData != null && (
            <LanguageButton
              props={props}
              switchSubtitle={this.props.switchSubtitle}
            />
          )}
          <AudioButton
            changeVolume={this.props.changeVolume}
            props={props}
            mute={this.props.mute}
          />
          <QualityButton />
          <FullscreenButton />
        </div>
      </div>
    );
  }
}

export default PlaybackControls;
