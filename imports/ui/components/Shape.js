import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import { Shapes } from '../../api/shapes.js';

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
      fontSize: event.target.style.fontSize,
    }
    console.log(shapeAttributes);
    Meteor.call('shapes.setAttributes',
                  shapeId,
                  shapeAttributes,
                );
    if (window.innerWidth < 700) {
      console.log("Small window update");
      Meteor.call('shapes_small.setAttributes',
                    shapeId,
                    shapeAttributes,
                  );
    } else if (window.innerWidth < 1150) {
      console.log("Medium window update");
      Meteor.call('shapes_medium.setAttributes',
                    shapeId,
                    shapeAttributes,
                  );
    } else {
      console.log("Large window update");
      Meteor.call('shapes_large.setAttributes',
                    shapeId,
                    shapeAttributes,
                  );
    }
  }

  render() {
    const shape = this.props.shape;
    // add href link for each shape i.e. 'about' or 'projects' to then add to href
    const shapeStyle = {
      width: `${shape.width}px`,
      height: `${shape.height}px`,
      fontSize: `${shape.fontSize}`,
      // -webkit-transform: 'translate(20px, 20px)',
      transform: `translate(${shape.data_x}px, ${shape.data_y}px)`
    }
    const isEditMode = this.props.editMode;
    console.log(isEditMode);
    return (
      <div
        key={shape._id}
        className={isEditMode ? shape.className : 'resize-drag-off'}
        id={shape.name}
        style={shapeStyle}
        data-x={shape.data_x}
        data-y={shape.data_y}
        onMouseUp={isEditMode ? this.handleUpdateAttributes : ''}
      >
        {isEditMode
          ? <>
          {shape.text}
          </>
          : <a href="/about">
            {shape.text}
          </a>
        }

      </div>
    )
  }
}
