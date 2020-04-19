import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Shapes = new Mongo.Collection('shapes');
export const Shapes_Small = new Mongo.Collection('shapes_small');
export const Shapes_Medium = new Mongo.Collection('shapes_medium');
export const Shapes_Large = new Mongo.Collection('shapes_large');

Meteor.methods({
  'shapes.setAttributes'(shapeId, shapeAttributes) {
    Shapes.update(shapeId, { $set: {
      width: shapeAttributes.width,
      height: shapeAttributes.height,
      data_x: shapeAttributes.data_x,
      data_y: shapeAttributes.data_y,
      fontSize: shapeAttributes.fontSize,
    }});
    console.log("updated");
  },
  'shapes_small.setAttributes'(shapeId, shapeAttributes) {
    Shapes_Small.update(shapeId, { $set: {
      width: shapeAttributes.width,
      height: shapeAttributes.height,
      data_x: shapeAttributes.data_x,
      data_y: shapeAttributes.data_y,
      fontSize: shapeAttributes.fontSize,
    }});
    console.log("updated");
  },
  'shapes_medium.setAttributes'(shapeId, shapeAttributes) {
    Shapes_Medium.update(shapeId, { $set: {
      width: shapeAttributes.width,
      height: shapeAttributes.height,
      data_x: shapeAttributes.data_x,
      data_y: shapeAttributes.data_y,
      fontSize: shapeAttributes.fontSize,
    }});
    console.log("updated");
  },
  'shapes_large.setAttributes'(shapeId, shapeAttributes) {
    Shapes_Large.update(shapeId, { $set: {
      width: shapeAttributes.width,
      height: shapeAttributes.height,
      data_x: shapeAttributes.data_x,
      data_y: shapeAttributes.data_y,
      fontSize: shapeAttributes.fontSize,
    }});
    console.log("updated");
  }
})
