import React, { Component } from 'react'

export class FullscreenButton extends Component {
    handleClick = (e) => {
        if (document.fullscreenEnabled) {
            if (document.fullscreen) {
                this.closeFullscreen();
            } else {
                this.openFullscreen(document.getElementById("player-container"));
            }
        }
    }
    
    openFullscreen(elem) {
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { /* Firefox */
          elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
          elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE/Edge */
          elem.msRequestFullscreen();
        }
    }

    closeFullscreen() {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { /* Firefox */
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE/Edge */
          document.msExitFullscreen();
        }
    }

    render() {
        return (
            <div className="ui-cell control-btn">
                <span></span>
                <button onClick={this.handleClick} className="fullscreen"></button>
            </div>
        )
    }
}

export default FullscreenButton
