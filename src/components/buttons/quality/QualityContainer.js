import React, { Component } from 'react'

export class QualityContainer extends Component {
    render() {
        return (
            <div className="quality-levels">
                <div className="inner">
                    <h3>Videokvalitet</h3>
                    <ul>
                        <li><span>Højest</span></li>
                        <li><span>Høj</span></li>
                        <li><span>Mellem</span></li>
                        <li><span>Lav</span></li>
                        <li className="active"><span>Automatisk</span></li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default QualityContainer
