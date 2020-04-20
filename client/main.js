import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { renderRoutes } from '../imports/startup/client/routes';

// import App from '../imports/ui/containers/App';

Meteor.startup(() => {
  if (Meteor.isClient) {
     Meteor.subscribe('allowedData');
  };
  render(renderRoutes(), document.getElementById('render-target'));
  // render(<App />, document.getElementById('render-target'));
})
