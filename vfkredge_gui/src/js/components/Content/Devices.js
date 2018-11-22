import React from "react";

import {Card, Col, Row} from "react-materialize";

import Device from "./Device";

export default class Devices extends React.Component {
  constructor(props) {
	  super(props);
	  this.state = {
	    ids: {}
	  };
    this.update()
	}

  update() {
    $.get("http://192.168.10.101:5004/clients", function(data, status) {
      if (status == 'success') {
        this.setState({
          ids: data
        })
        console.log(data);
      }
    }.bind(this));

    setTimeout(this.update.bind(this), 1000);
  }

  render() {
  	const ids = Object.keys(this.state.ids)
    // console.log(ids)
    return (
      <div style={{
            display: "flex",
            flexWrap: "wrap",
            flexFlow: "row wrap",
            alignItems: "flex-start"
          }}>
        {
          ids.map((id) =>
          <div key={id} style={{
            flex: 1
          }}>
            <Device id={id} name={this.state.ids[id].name} host={this.state.ids[id].ip} emitter={this.props.emitter} />
          </div>)
        }
      </div>
    )
  }
}
