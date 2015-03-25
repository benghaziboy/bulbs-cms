'use strict';

angular.module('apiServices.specialCoverage.factory', [
  'apiServices',
  'apiServices.campaign.factory',
  'apiServices.video.factory'
])
  .factory('SpecialCoverage', function (_, restmod, $parse) {
    var ACTIVE_STATES = {
      INACTIVE: 'Inactive',
      ACTIVE: 'Active',
      PROMOTED: 'Pin to HP'
    };

    var parserWrap = function (line) {
      return (function (line) {
        return function (item) {
          return $parse(line)({item: item});
        };
      })(line);
    };

    return restmod.model('special-coverage').mix('NestedDirtyModel', {
      $config: {
        name: 'Special Coverage',
        plural: 'Special Coverages',
        primaryKey: 'id',
        fieldDisplays: [{
          title: 'List Title',
          value: parserWrap('item.name')
        }, {
          title: 'Sponsor',
          value: parserWrap('item.campaign.sponsorName')
        }, {
          title: 'Campaign',
          value: parserWrap('item.campaign.campaignLabel')
        }, {
          title: 'Status',
          value: parserWrap('item.$activeState()')
        }]
      },
      campaign: {
        belongsTo: 'Campaign',
        prefetch: true,
        key: 'campaign'
      },
      query: {
        init: {}
      },
      videos: {
// TODO : use model when video in place
        // hasMany: 'Video'
        init: []
      },
      $extend: {
        Record: {
          /**
           * Getter/setter for active state, a front end standin for the active
           *  and promoted flags.
           *
           * @param {String} [activeState] - set this value when using as setter.
           * @returns {String} current activeState.
           */
          $activeState: function (activeState) {
            if (_.isString(activeState)) {
              if (activeState === ACTIVE_STATES.ACTIVE) {
                this.active = true;
                this.promoted = false;
              } else if (activeState === ACTIVE_STATES.PROMOTED) {
                this.active = true;
                this.promoted = true;
              } else {
                this.active = false;
                this.promoted = false;
              }
            } else {
              activeState = ACTIVE_STATES.INACTIVE;
              if (this.active && this.promoted) {
                activeState = ACTIVE_STATES.PROMOTED;
              } else if (this.active) {
                activeState = ACTIVE_STATES.ACTIVE;
              }
            }
            return activeState;
          }
        },
        Model: {
          ACTIVE_STATES: _.clone(ACTIVE_STATES)
        }
      },
    });
  });
