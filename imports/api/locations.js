import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Locations = new Mongo.Collection('locations');

// Meteor.methods({
//   'locations.setLocation'(locationId, )
// })
