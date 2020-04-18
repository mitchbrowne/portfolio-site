import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Shapes = new Mongo.Collection('shapes');

Meteor.methods({
  'shapes.setAttributes'(shapeId, shapeAttributes) {
    Shapes.update(shapeId, { $set: {
      width: shapeAttributes.width,
      height: shapeAttributes.height,
      data_x: shapeAttributes.data_x,
      data_y: shapeAttributes.data_y
    }});
    console.log("updated");
  }
})
