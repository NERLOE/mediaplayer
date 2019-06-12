import React, { Component } from "react";

export class Subtitles extends Component {
  constructor() {
    super();
    this.state = {
      language: "",
      subtitles: [],
      mounted: false
    };
  }

  getSubtitle() {
    if (!this.state.mounted) return null;

    if (this.getSubtitleLanguage().lang != this.state.language) {
      this.loadSrt();
      return;
    }

    let line;
    this.state.subtitles.map(sub => {
      let i = this.convertStampToTime(sub.i);
      let o = this.convertStampToTime(sub.o);

      if (this.props.time >= i && this.props.time <= o) {
        line = sub.t;
      }
    });

    return line;
  }

  convertStampToTime(stamp) {
    let split = String(stamp).split(":");
    let total =
      parseInt(split[0]) * 60 * 60 +
      parseInt(split[1]) * 60 +
      parseInt(split[2]);

    return total;
  }

  getSubtitleLanguage() {
    return this.props.mediaData.subtitles[this.props.selectedSubtitle];
  }

  componentDidMount() {
    this.loadSrt();
  }

  loadSrt = () => {
    var subtitles = [];
    var client = new XMLHttpRequest();
    client.open("GET", this.getSubtitleLanguage().path);
    client.onreadystatechange = function() {
      let data = client.responseText;
      function strip(s) {
        return s.replace(/^\s+|\s+$/g, "");
      }

      var srt = data.replace(/\r\n|\r|\n/g, "\n");
      srt = strip(srt);
      var srt_ = srt.split("\n\n");
      var x = 0;
      for (let s in srt_) {
        let st = srt_[s].split("\n");
        if (st.length >= 2) {
          let n = st[0];
          let a = st[1].split(" --> ");
          let i = a[0];
          let o = a[1];
          let t = st[2];

          if (st.length > 2) {
            for (let j = 3; j < st.length; j++) {
              t += "\n" + st[j];
            }
          }

          subtitles.push({
            n,
            i,
            o,
            t
          });
        }
        x++;
      }
    };

    client.send();

    this.setState(state => {
      return {
        ...state,
        subtitles: subtitles,
        language: this.getSubtitleLanguage().lang,
        mounted: true
      };
    });
  };

  render() {
    function formatSub(sub) {
      if (sub == null) return null;

      let out;
      if (sub.split("\n").length > 1) {
        let subSplit = sub.split("\n");
        if (
          subSplit[0].indexOf("<i>") != -1 &&
          subSplit[0].indexOf("</i>") != -1
        ) {
          let string1 = subSplit[0].replace("<i>", "").replace("</i>", "");

          if (
            subSplit[1].indexOf("<i>") != -1 &&
            subSplit[1].indexOf("</i>") != -1
          ) {
            let string2 = subSplit[1].replace("<i>", "").replace("</i>", "");
            out = (
              <p>
                <i>{string1}</i>
                <br />
                <i>{string2}</i>
              </p>
            );
          } else {
            out = (
              <p>
                <i>{string1}</i>
                <br />
                {subSplit[1]}
              </p>
            );
          }
        } else if (
          subSplit[1].indexOf("<i>") != -1 &&
          subSplit[1].indexOf("</i>") != -1
        ) {
          let string2 = subSplit[1].replace("<i>", "").replace("</i>", "");

          if (
            subSplit[0].indexOf("<i>") != -1 &&
            subSplit[0].indexOf("</i>") != -1
          ) {
            let string1 = subSplit[0].replace("<i>", "").replace("</i>", "");
            out = (
              <p>
                <i>{string1}</i>
                <br />
                <i>{string2}</i>
              </p>
            );
          } else {
            out = (
              <p>
                {subSplit[0]}
                <br />
                <i>{string2}</i>
              </p>
            );
          }
        } else if (
          subSplit[0].indexOf("<i>") != -1 &&
          subSplit[1].indexOf("</i>") != -1
        ) {
          let string1 = subSplit[0].replace("<i>", "");
          let string2 = subSplit[1].replace("</i>", "");
          out = (
            <p>
              {string1}
              <br />
              {string2}
            </p>
          );
        } else {
          out = (
            <p>
              {subSplit[0]}
              <br />
              {subSplit[1]}
            </p>
          );
        }
      } else {
        if (sub.indexOf("<i>") != -1) {
          let string = sub.replace("<i>", "").replace("</i>", "");
          sub = <i>{string}</i>;
          out = <p>{sub}</p>;
        } else {
          out = <p>{sub}</p>;
        }
      }

      return out;
    }

    var sub = formatSub(this.getSubtitle());

    return sub;
  }
}

export default Subtitles;
