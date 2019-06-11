import React, { Component } from "react";

class Timeline extends Component {
  constructor() {
    super();
    this.state = {
      scrubbing: false,
      hoverScrub: false,
      scrubCSS: false,
      dragTime: 0,
      primaryTimelineCss: {
        width: "0%"
      },
      timelineLeftCss: {
        left: "0%"
      },
      mouseX: 0
    };
  }

  convert_time(seconds) {
    var s = seconds,
      h = Math.floor(s / 3600);
    s -= h * 3600;
    var m = Math.floor(s / 60);
    s -= m * 60;

    if (seconds >= 3600) {
      return (
        "0" + h + "." + (m < 10 ? "0" + m : m) + "." + (s < 10 ? "0" + s : s)
      );
    } else {
      return (m < 10 ? "0" + m : m) + "." + (s < 10 ? "0" + s : s);
    }
  }

  componentDidMount() {
    document.addEventListener("mouseup", this.handleMouseUp);
    document.addEventListener("mousemove", this.handleMouseMove);
  }
  componentWillUnmount() {
    document.removeEventListener("mouseup", this.handleMouseUp);
    document.removeEventListener("mousemove", this.handleMouseMove);
  }

  handleMouseOver = e => {
    if (this.state.scrubbing) return;

    var t = this.refs.timeline;
    let [per, calc_fix] = this.getPercentage(t, e.pageX);

    this.enterScrubState(per, calc_fix, false, true);
  };

  handleMouseOut = e => {
    if (!this.state.hoverScrub) return;

    this.leaveScrubState();
  };

  handleMouseMove = e => {
    this.setState(state => {
      return {
        ...state,
        mouseX: e.pageX
      };
    });

    if (!this.state.scrubbing) return;

    var t = this.refs.timeline;
    let [per, calc_fix] = this.getPercentage(t, e.pageX);

    this.updateScrubState(per, calc_fix);
  };

  handleMouseDown = e => {
    var t = this.refs.timeline;
    let [per, calc_fix] = this.getPercentage(t, e.pageX);

    this.props.style.player.pause();

    this.enterScrubState(per, calc_fix, true, false);
  };

  handleMouseUp = e => {
    if (!this.state.scrubbing) return;

    var t = this.refs.timeline;
    let [per, calc_fix] = this.getPercentage(t, e.pageX);

    this.props.style.player.currentTime = calc_fix;
    this.props.play();

    this.leaveScrubState();
  };

  updateScrubState(per, calc_fix) {
    this.setState(state => {
      return {
        ...state,
        primaryTimelineCss: {
          width: per + "%"
        },
        timelineLeftCss: {
          left: per + "%"
        },
        dragTime: calc_fix
      };
    });
  }

  enterScrubState(per, calc_fix, css, hover) {
    clearTimeout(this.timeoutID);
    this.setState(state => {
      return {
        ...state,
        scrubbing: true,
        scrubCSS: css,
        hoverScrub: hover,
        primaryTimelineCss: {
          width: per + "%"
        },
        timelineLeftCss: {
          left: per + "%"
        },
        dragTime: calc_fix
      };
    });
  }

  leaveScrubState() {
    this.setState(state => {
      return {
        ...state,
        scrubbing: false
      };
    });

    this.timeoutID = setTimeout(() => {
      this.setState(state => {
        return {
          ...state,
          scrubCSS: false
        };
      });
    }, 1000);
  }

  getPercentage(t, pageX) {
    var widthClicked = pageX - t.getBoundingClientRect().left;
    var totalWidth = t.offsetWidth;

    var calc = (widthClicked / totalWidth) * this.props.style.duration;
    var calc_fix = calc.toFixed(0);

    if (calc_fix > this.props.style.duration) {
      calc_fix = this.props.style.duration.toFixed(0);
    } else if (calc_fix < 0) {
      calc_fix = 0;
    }
    let per = (widthClicked / totalWidth) * 100;
    per = per > 100 ? 100 : per < 0 ? 0 : per;

    return [per, calc_fix];
  }

  render() {
    const { style } = this.props;
    return (
      <div className="ui-cell timeline">
        <div className="timeline-mask">
          <div
            ref="timeline"
            className="slider horizontal"
            onMouseDown={this.handleMouseDown}
            onMouseOver={this.handleMouseOver}
            onMouseOut={this.handleMouseOut}
          >
            <div
              className="primary"
              style={
                this.state.scrubCSS
                  ? this.state.primaryTimelineCss
                  : style.primaryTimelineCss
              }
            />
            <button
              className="target-btn"
              style={
                this.state.scrubCSS
                  ? this.state.timelineLeftCss
                  : style.timelineLeftCss
              }
            >
              <div className="handle" />
            </button>
          </div>
          <div
            className={
              "timeline-tooltip" +
              (this.state.scrubbing ? " scrubbing " : " ") +
              "vod"
            }
            style={this.state.timelineLeftCss}
          >
            <label className="ui-cell time-label">
              {this.convert_time(this.state.dragTime)}
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default Timeline;
