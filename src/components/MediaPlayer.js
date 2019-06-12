import React, { Component } from "react";
import BottomUI from "./BottomUI";

import data from "../data.json";
import { Subtitles } from "./Subtitles";
import { Chromecast } from "./Chromecast";

class MediaPlayer extends Component {
  constructor() {
    super();
    this.state = {
      mediaData: null,
      chromecast: false,
      playing: false,
      show: true,
      hide: false,
      played: false,
      pausing: false,
      loading: false,
      muted: false,
      selectedSubtitle: 0,
      currentTime: 0,
      duration: 0,
      lastVol: 0,
      visualCueTime: 0,
      volume: 1,
      player: null,
      primaryTimelineCss: {
        width: "0%"
      },
      timelineLeftCss: {
        left: "0%"
      },
      audioPrimaryCss: {
        height: "100%"
      },
      audioBottomCss: {
        bottom: "100%"
      },
      coverImg: {
        backgroundImage: `url("")`
      },
      playerCSS: {
        position: "absolute",
        top: "0px",
        zIndex: "0",
        width: "100%",
        height: "100%"
      }
    };
  }

  switchSubtitle(sub) {
    this.setState(state => {
      return {
        ...state,
        selectedSubtitle: sub
      };
    });
  }

  componentDidMount() {
    let title = this.props.match.params.title;
    var movieID = null;

    data.map((media, id) => {
      if (
        media.title
          .toLowerCase()
          .split(" ")
          .join("-")
          .replace(/[^0-9a-z-]/gi, "") == title
      ) {
        movieID = id;
      }
    });

    if (movieID == null) {
      return <h1>Kunne ikke finde det du ledte efter.</h1>;
    }

    const thumbnail = data[movieID].thumbnail;
    this.setState(state => {
      return {
        ...state,
        coverImg: {
          backgroundImage: `url(${thumbnail})`
        },
        mediaData: data[movieID],
        selectedSubtitle: data[movieID].subtitles == null ? -1 : 0
      };
    });

    setTimeout(() => {
      this.play();
      this.uiTransition();
    }, 200);
  }

  play() {
    if (!this.state.chromecast) {
      let player = this.refs.player;
      player.play();

      this.setState(state => {
        return {
          ...state,
          playing: true
        };
      });

      this.intervalID = setInterval(() => {
        let timelinePercentage = (player.currentTime / player.duration) * 100;
        this.setState(state => {
          return {
            ...state,
            primaryTimelineCss: {
              width: timelinePercentage + "%"
            },
            timelineLeftCss: {
              left: timelinePercentage + "%"
            },
            currentTime: player.currentTime,
            duration: player.duration,
            player: player
          };
        });

        if (!this.state.playing) {
          clearInterval(this.intervalID);
        }
      }, 500);
    }
  }

  handleMouseMove = e => {
    e.preventDefault();

    if (
      e.target.classList.contains("slider") ||
      e.target.classList.contains("handle") ||
      e.target.nodeName === "SPAN" ||
      e.target.nodeName === "BUTTON"
    ) {
      clearTimeout(this.timeout);
      return;
    }

    this.setState(state => {
      return {
        ...state,
        show: true,
        hide: false
      };
    });

    this.uiTransition();
  };

  uiTransition() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.setState(state => {
        return {
          ...state,
          show: false
        };
      });

      setTimeout(() => {
        this.setState(state => {
          return {
            ...state,
            hide: true
          };
        });
      }, 300);
    }, 2000);
  }

  getTime() {
    return this.refs.player ? this.refs.player.currentTime : 0;
  }

  handleDurationChange = e => {
    this.setState(state => {
      return {
        ...state,
        loading: true
      };
    });
  };

  handleOnCanPlay = e => {
    this.setState(state => {
      return {
        ...state,
        loading: false
      };
    });
  };

  changeVolume(vol) {
    this.refs.player.volume = vol;
    this.setState(state => {
      return {
        ...state,
        volume: vol,
        muted: vol === 0,
        audioPrimaryCss: {
          height: vol * 100 + "%"
        },
        audioBottomCss: {
          bottom: vol * 100 + "%"
        }
      };
    });
  }

  handleDoubleClick = e => {
    this.toggleFullscreen();
  };

  mute() {
    if (this.state.muted) {
      this.changeVolume(this.state.lastVol);
    } else {
      this.setState(state => {
        return {
          ...state,
          lastVol: this.state.volume
        };
      });
      this.changeVolume(0);
    }
  }

  openFullscreen(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE/Edge */
      elem.msRequestFullscreen();
    }
  }

  closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE/Edge */
      document.msExitFullscreen();
    }
  }

  toggleFullscreen() {
    if (document.fullscreenEnabled) {
      if (document.fullscreen) {
        this.closeFullscreen();
      } else {
        this.openFullscreen(document.getElementById("player-container"));
      }
    }
  }

  handleKeyPress = e => {
    let volChange = 0.05;

    // SEEK - FORWARD & BACKWARDS - 15 SECONDS
    let skipTime = 5;
    if (e.keyCode === 37) {
      // Left Arrow
      this.refs.player.currentTime -= skipTime;
    }

    if (e.keyCode === 39) {
      // Right Arrow
      this.refs.player.currentTime += skipTime;
    }

    // AUDIO
    if (e.keyCode === 38) {
      // Up Arrow
      let newVol =
        this.state.volume + volChange > 1 ? 1 : this.state.volume + volChange;
      this.changeVolume(newVol);
    }

    if (e.keyCode === 40) {
      // Down Arrow
      let newVol =
        this.state.volume - volChange < 0 ? 0 : this.state.volume - volChange;
      this.changeVolume(newVol);
    }

    // PAUSE & PLAY
    if (e.keyCode === 32) {
      // Space
      this.handlePausePlay();
    }

    // FULLSCREEN
    if (e.keyCode === 70) {
      // F
      this.toggleFullscreen();
    }

    // MUTE
    if (e.keyCode === 77) {
      // M
      this.mute();
    }

    // FRAME SKIPPING
    let frame = 0.05;
    if (e.keyCode === 188) {
      // COMMA (,)
      this.refs.player.currentTime = Math.max(
        0,
        this.refs.player.currentTime - frame
      );
    }

    if (e.keyCode === 190) {
      // DOT (.)
      this.refs.player.currentTime = Math.max(
        0,
        this.refs.player.currentTime + frame
      );
    }
  };

  handlePausePlay() {
    if (this.state.playing) {
      this.refs.player.pause();
      this.setState(state => {
        return {
          ...state,
          playing: false,
          pausing: true,
          played: false,
          visualCueTime: new Date().getTime()
        };
      });

      setTimeout(() => {
        this.setState(state => {
          return {
            ...state,
            pausing: false,
            visualCueTime: 0
          };
        });
      }, 500);
    } else {
      this.play();
      this.setState(state => {
        return {
          ...state,
          played: true,
          pausing: false,
          visualCueTime: new Date().getTime()
        };
      });

      setTimeout(() => {
        this.setState(state => {
          return {
            ...state,
            played: false,
            visualCueTime: 0
          };
        });
      }, 500);
    }
  }

  handlePPClick = e => {
    let target = e.target;
    if (
      target.classList.contains("browser-back") ||
      (target.closest(".playback-controls") &&
        !target.classList.contains("play") &&
        !target.classList.contains("pause"))
    ) {
      return;
    }

    e.target.blur();
    document.getElementById("player-container").focus();
    this.handlePausePlay();
  };

  handleBack = e => {
    e.preventDefault();
    this.props.history.push("/");
  };

  render() {
    return (
      <div
        onDoubleClick={this.handleDoubleClick}
        onKeyDown={this.handleKeyPress}
        tabIndex="0"
        id="player-container"
        className="player-container"
      >
        <div className="vask-container player-bg">
          <div
            className={this.state.show ? "scene" : "scene hide"}
            onMouseMove={this.handleMouseMove}
            onClick={this.handlePPClick}
          >
            <div className="backdrop" />
            <div className="top-ui">
              <div className="ui-cell control-btn">
                <span />
                <button className="browser-back" onClick={this.handleBack} />
              </div>
            </div>
            <span>
              {!this.state.hide != null && (
                <BottomUI
                  changeVolume={this.changeVolume.bind(this)}
                  props={this.state}
                  play={this.play.bind(this)}
                  mute={this.mute.bind(this)}
                  switchSubtitle={this.switchSubtitle.bind(this)}
                />
              )}
            </span>
          </div>
          {this.state.chromecast && <Chromecast />}
          <span>
            {this.state.loading ||
              (this.state.mediaData == null && (
                <div id="vp-spinner-container">
                  <div id="vp-spinner" />
                </div>
              ))}
            <div className="visual-cues">
              <span>
                {this.state.pausing &&
                  (new Date().getTime() - this.state.visualCueTime > 100 ? (
                    <div className="visual-cue pause fade-zoom-leave fade-zoom-leave-active" />
                  ) : new Date().getTime() - this.state.visualCueTime > 50 ? (
                    <div className="visual-cue pause" />
                  ) : (
                    <div className="visual-cue pause fade-zoom-enter fade-zoom-enter-active" />
                  ))}
                {this.state.played &&
                  (new Date().getTime() - this.state.visualCueTime > 100 ? (
                    <div className="visual-cue play fade-zoom-leave fade-zoom-leave-active" />
                  ) : new Date().getTime() - this.state.visualCueTime > 50 ? (
                    <div className="visual-cue play" />
                  ) : (
                    <div className="visual-cue play fade-zoom-enter fade-zoom-enter-active" />
                  ))}
              </span>
            </div>
          </span>
          {this.state.selectedSubtitle != -1 && this.state.mediaData != null && (
            <div className={"subtitle-cue" + (this.state.show ? " raise" : "")}>
              <Subtitles
                time={this.getTime()}
                mediaData={this.state.mediaData}
                selectedSubtitle={this.state.selectedSubtitle}
              />
            </div>
          )}

          {this.state.mediaData != null && !this.state.chromecast && (
            <video
              ref="player"
              style={this.state.playerCSS}
              onLoadStart={this.handleDurationChange}
              onSeeking={this.handleDurationChange}
              onDurationChange={this.handleDurationChange}
              onCanPlay={this.handleOnCanPlay}
            >
              <source src={this.state.mediaData.media} type="video/mp4" />
            </video>
          )}
        </div>
      </div>
    );
  }
}

export default MediaPlayer;
