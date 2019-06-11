import React, { Component } from "react";
import LanguageContainer from "./LanguageContainer";

export class LanguageButton extends Component {
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
    const { props } = this.props;

    if (props.mediaData.subtitles !== null) {
      return (
        <div
          className="ui-cell control-btn"
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          <span>
            {this.state.hovering && (
              <LanguageContainer
                switchSubtitle={this.props.switchSubtitle}
                props={props}
              />
            )}
          </span>
          <button className="language subtitlesAvailable" />
        </div>
      );
    } else {
      return (
        <div className="ui-cell control-btn">
          <span />
          <button className="language" />
        </div>
      );
    }
  }
}

export default LanguageButton;
