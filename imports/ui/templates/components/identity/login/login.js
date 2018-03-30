import { Meteor } from 'meteor/meteor';
import { Router } from 'meteor/iron:router';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

import { animatePopup } from '/imports/ui/modules/popup';
import './login.html';
import './auth0Login.js';
import './auth0Login.html';
import './profile/profile.js';
import './logger.js';

Template.cardNavigation.helpers({
  main() {
    if (Session.get('cardNavigation')) {
      return false;
    }
    return true;
  },
});

Template.login.events({
  'click #logout'() {
    animatePopup(false, `login-${Meteor.userId()}`);
    Meteor.logout();
    Router.go('/');
  },
});

Template.cardNavigation.events({
  'click #card-back'() {
    const data = Meteor.user().profile;
    Session.set('newCountry', undefined);
    data.configured = true;
    Meteor.users.update(Meteor.userId(), { $set: { profile: data } });
    Session.set('cardNavigation', false);
  },
});
