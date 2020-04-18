import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';

import Shape from './Shape';

import { Locations } from '../api/locations.js';
import { Shapes } from '../api/shapes.js';

import interact from 'interactjs'

class Home extends Component {
  constructor() {
    super();
    // this.dragMoveListener = this.dragMoveListener.bind(this);

    interact('.resize-drag')
      .resizable({
        // resize from all edges and corners
        edges: {left: true, right: true, bottom: true, top: true},

        listeners: {
          move(event) {
            let target = event.target;
            let x = (parseFloat(target.getAttribute('data-x')) || 0);
            let y = (parseFloat(target.getAttribute('data-y')) || 0);

            // update the element's style
            target.style.width = event.rect.width + 'px';
            target.style.height = event.rect.height + 'px';

            // translate when resizing from top or left edges
            x += event.deltaRect.left;
            y += event.deltaRect.top;

            target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
          }
        },
        modifiers: [
          // keep the edges inside the parent
          interact.modifiers.restrictEdges({
            outer: 'parent'
          }),

          // minimum size
          interact.modifiers.restrictSize({
            min: { width: 100, height: 50 },
          })
        ],

        inertia: true
      })
      .draggable({
        listeners: { move: this.dragMoveListener.bind(this) },
        inertia: true,
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: 'parent',
            endOnly: true
          })
        ],
        autoscroll: false,
      })
  }

  dragMoveListener(event) {
    let target = event.target

    // keep the dragged position in the data-x/data-y attributes
    let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

    // translate the element
    target.style.webkitTransform =
      target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)'

    //update the position attributes
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
  }

  renderShapes() {
    let shapes = this.props.shapes;
    if (shapes) {
      return shapes.map((shape) => <Shape key={shape._id} shape={shape} />);
    }
  }

  render() {
    return (
      <div id="container">
        {this.renderShapes()}
      </div>
    );
  }
}


export default withTracker(() => {
  return {
    shapes: Shapes.find({}).fetch(),
  }
})(Home);
