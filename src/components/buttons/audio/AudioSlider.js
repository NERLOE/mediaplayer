import React, { Component } from "react";

export class AudioSlider extends Component {
  constructor() {
    super();
    this.state = {
      scrubbing: false,
      scrubCSS: false,
      audioPrimaryCss: {
        height: "100%"
      },
      audioBottomCss: {
        bottom: "100%"
      },
      mouseY: 0
    };
  }

  componentDidMount() {
    document.addEventListener("mouseup", this.handleMouseUp);
    document.addEventListener("mousemove", this.handleMouseMove);
  }
  componentWillUnmount() {
    document.removeEventListener("mouseup", this.handleMouseUp);
    document.removeEventListener("mousemove", this.handleMouseMove);
  }

  handleMouseUp = e => {
    if (!this.state.scrubbing) return;

    var t = this.refs.slider;

    var heightClicked = e.pageY - t.getBoundingClientRect().top;
    var totalHeight = t.offsetHeight;

    var per = (heightClicked / totalHeight) * 100;
    per = -(per - 100);
    per = per > 100 ? 100 : per < 0 ? 0 : per;

    this.props.changeVolume(per / 100);

    this.setState(state => {
      return {
        ...state,
        scrubbing: false
      };
    });

    setTimeout(() => {
      this.setState(state => {
        return {
          ...state,
          scrubCSS: false
        };
      });
    }, 1000);
  };

  handleMouseMove = e => {
    this.setState(state => {
      return {
        ...state,
        mouseY: e.pageY
      };
    });

    if (!this.state.scrubbing) return;

    var t = this.refs.slider;

    var heightClicked = e.pageY - t.getBoundingClientRect().top;
    var totalHeight = t.offsetHeight;

    var per = (heightClicked / totalHeight) * 100;
    per = -(per - 100);
    per = per > 100 ? 100 : per < 0 ? 0 : per;

    this.props.changeVolume(per / 100);

    this.setState(state => {
      return {
        ...state,
        audioPrimaryCss: {
          height: per + "%"
        },
        audioBottomCss: {
          bottom: per + "%"
        }
      };
    });
  };

  handleMouseDown = e => {
    var t = this.refs.slider;

    var heightClicked = e.pageY - t.getBoundingClientRect().top;
    var totalHeight = t.offsetHeight;

    var per = (heightClicked / totalHeight) * 100;
    per = -(per - 100);
    per = per > 100 ? 100 : per < 0 ? 0 : per;

    this.setState(state => {
      return {
        ...state,
        scrubbing: true,
        scrubCSS: true,
        audioPrimaryCss: {
          height: per + "%"
        },
        audioBottomCss: {
          bottom: per + "%"
        }
      };
    });
  };

  render() {
    var { props } = this.props;
    return (
      <div className="audio-slider">
        <div
          ref="slider"
          className="slider vertical"
          onMouseDown={this.handleMouseDown}
        >
          <div
            className="primary"
            style={
              this.state.scrubCSS
                ? this.state.audioPrimaryCss
                : props.audioPrimaryCss
            }
          />
          <button
            className="target-btn"
            style={
              this.state.scrubCSS
                ? this.state.audioBottomCss
                : props.audioBottomCss
            }
          >
            <div className="handle" />
          </button>
        </div>
      </div>
    );
  }
}

export default AudioSlider;
