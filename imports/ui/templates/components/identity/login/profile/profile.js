import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { TAPi18n } from 'meteor/tap:i18n';

import './profile.html';
import './profileEditor.js';
import '../../avatar/avatar.js';
import '../../authenticity/authenticity.js';
import '../../../../widgets/warning/warning.js';

Template.profile.helpers({
  configProfile() {
    return !Meteor.user().profile.configured;
  },
  tags() {
  },
  userId() {
    return Meteor.user()._id;
  },
  hasDelegations() {
    // TODO implement delegation reader to display them.
    return false;
  },
  totalVotes() {
    return `${TAPi18n.__('total-votes')} <strong style='color: white'>${Meteor.user().profile.wallet.balance.toLocaleString()}</strong> `;
  },
});

Template.profile.events({
  'click .resend-verification-link'() {
    Meteor.call('sendVerificationLink', (error) => {
      if (error) {
        console.log(error.reason, 'danger');
      } else {
        const email = Meteor.user().emails[0].address;
        console.log(`[Template.warning.events] verification sent to ${email}!`, 'success');
      }
    });
  },
});
