import React, { Component, useLayoutEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';

import Shape from './Shape';

import { Shapes, Shapes_Small, Shapes_Medium, Shapes_Large } from '../api/shapes.js';

import interact from 'interactjs';
import $ from 'jquery';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      width: 0,
      height: 0,
      editMode: false,
     };
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
            // target.style.fontSize = (event.rect.height / 10) + 'px';
            target.style.fontSize = (event.rect.width / 10) + 'px';
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
    let shapes;
    console.log(window.innerWidth);
    if (window.innerWidth < 700) {
      console.log("Small window");
      shapes = this.props.shapes_small;
    } else if (window.innerWidth < 1150) {
      console.log("Medium window");
      shapes = this.props.shapes_medium;
    } else {
      console.log("Large window");
      shapes = this.props.shapes_large;
    }
    if (shapes) {
      return shapes.map((shape) => <Shape key={shape._id} shape={shape} editMode={this.state.editMode}/>);
    }
  }

  updateDimensions = () => {
      this.setState({ width: window.innerWidth, height: window.innerHeight });
    };
    componentDidMount() {
      window.addEventListener('resize', this.updateDimensions);
    }
    componentWillUnmount() {
      window.removeEventListener('resize', this.updateDimensions);
    }

    handleEdit(event) {
      console.log("HEY");
      this.setState({editMode: !this.state.editMode});
    }

  render() {
    return (
      <div id="container">
        <div id="edit-button" onMouseDown={this.handleEdit.bind(this)}>Let's Work Together!</div>
        {this.renderShapes()}
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    shapes: Shapes.find({}).fetch(),
    shapes_small: Shapes_Small.find({}).fetch(),
    shapes_medium: Shapes_Medium.find({}).fetch(),
    shapes_large: Shapes_Large.find({}).fetch(),
  }
})(Home);
