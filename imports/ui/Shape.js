import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import { Shapes } from '../api/shapes.js';

export default class Shape extends Component {
  constructor() {
    super();
    this.handleUpdateAttributes = this.handleUpdateAttributes.bind(this);
  }

  handleUpdateAttributes(event) {
    let shapeId = this.props.shape._id;

    const shapeAttributes = {
      width: event.target.style.width.replace('px', ''),
      height: event.target.style.height.replace('px', ''),
      data_x: event.target.getAttribute('data-x'),
      data_y: event.target.getAttribute('data-y'),
    }
    console.log(shapeAttributes);
    Meteor.call('shapes.setAttributes',
                  shapeId,
                  shapeAttributes,
                );
  }

  render() {
    const shape = this.props.shape;
    const shapeStyle = {
      width: `${shape.width}px`,
      height: `${shape.height}px`,
      // -webkit-transform: 'translate(20px, 20px)',
      transform: `translate(${shape.data_x}px, ${shape.data_y}px)`
    }
    return (
      <div
        key={shape._id}
        className={shape.className}
        id={shape.name}
        style={shapeStyle}
        data-x={shape.data_x}
        data-y={shape.data_y}
        onMouseUp={this.handleUpdateAttributes}
      >
        {shape.text}
      </div>
    )
  }
}
