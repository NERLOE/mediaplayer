import React, { Component } from 'react'
import QualityContainer from './QualityContainer';

export class QualityButton extends Component {
    constructor() {
        super();
        this.state = {
            hovering: false
        }
    }

    handleMouseEnter = (e) => {
        this.setState((state) => {
            return {
                ...state,
                hovering: true
            }
        });
    }

    handleMouseLeave = (e) => {
        this.setState((state) => {
            return {
                ...state,
                hovering: false
            }
        });
    }

    render() {
        var {props} = this.props;
        return (
            <div className="ui-cell control-btn" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                <span>
                    { this.state.hovering && <QualityContainer /> }
                </span>
                <button className="quality auto highest"></button>
            </div>
        )
    }
}

export default QualityButton
