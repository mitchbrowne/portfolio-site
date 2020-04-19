import { Meteor } from 'meteor/meteor';
import { Locations } from '../imports/api/locations.js';
import { Shapes, Shapes_Small, Shapes_Medium, Shapes_Large } from '../imports/api/shapes.js';

Meteor.startup(() => {
  // code to run on server at startup
    if(Meteor.isServer) {

     Meteor.publish('allowedData', function() {
       return [
         Shapes.find(),
         Shapes_Small.find(),
         Shapes_Medium.find(),
         Shapes_Large.find()
       ];
     });
  }
});
