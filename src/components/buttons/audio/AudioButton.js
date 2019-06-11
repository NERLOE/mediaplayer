import React, { Component } from "react";
import AudioSlider from "./AudioSlider";

export class AudioButton extends Component {
  constructor() {
    super();
    this.state = {
      hovering: false
    };
  }

  handleMouseEnter = e => {
    this.setState(state => {
      return {
        ...state,
        hovering: true
      };
    });
  };

  handleMouseLeave = e => {
    this.setState(state => {
      return {
        ...state,
        hovering: false
      };
    });
  };

  render() {
    var { props } = this.props;
    return (
      <div
        className="ui-cell control-btn"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <span>
          {this.state.hovering && (
            <AudioSlider changeVolume={this.props.changeVolume} props={props} />
          )}
        </span>
        <button
          onClick={this.props.mute}
          className={"audio-control" + (props.muted ? " muted" : "")}
        />
      </div>
    );
  }
}

export default AudioButton;
