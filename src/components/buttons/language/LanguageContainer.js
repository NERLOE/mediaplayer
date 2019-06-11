import React, { Component } from "react";

export class LanguageContainer extends Component {
  handleSwitchSubtitleLanguage = e => {
    this.props.switchSubtitle(e.target.closest("li").getAttribute("data-key"));
  };
  render() {
    return (
      <div className="language-container">
        <div className="subtitle-tracks">
          <div className="subtitle-languages">
            <h3>Undertekster</h3>
            <ul>
              {this.props.props.mediaData.subtitles.map((sub, i) => {
                return (
                  <li
                    onClick={this.handleSwitchSubtitleLanguage}
                    key={i}
                    data-key={i}
                    className={
                      this.props.props.selectedSubtitle == i ? "enabled" : ""
                    }
                  >
                    <span>{sub.langName}</span>
                  </li>
                );
              })}
              <li
                onClick={this.handleSwitchSubtitleLanguage}
                data-key={-1}
                className={
                  this.props.props.selectedSubtitle == -1 ? "enabled" : ""
                }
              >
                <span>Ingen</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default LanguageContainer;
