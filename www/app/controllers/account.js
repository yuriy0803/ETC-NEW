import Ember from 'ember';

export default Ember.Controller.extend({
    applicationController: Ember.inject.controller('application'),
    config: Ember.computed.reads('applicationController.config'),
    stats: Ember.computed.reads('applicationController.model.stats'),
    hashrate: Ember.computed.reads('applicationController.hashrate'),

    roundPercent: Ember.computed("stats", "model", {
        get() {
            var percent = this.get("model.stats.roundShares") / this.get("applicationController.difficulty");
            if (!percent) {
                return 0;
            }
            return percent;
        },
    }),
    
    epoch: Ember.computed("model.stats", {
        get() {
            return parseInt(this.get("applicationController.height") / 60000);
        },
    }),

    dag: Ember.computed("stats", "model", {
        get() {
            var percent = (this.get("epoch") * 8192) / 1024 / 1024 + 1;
            if (!percent) {
                return 0;
            }
            return percent;
        },
    }),

    netHashrate: Ember.computed({
        get() {
            return this.get('hashrate');
        }
    }),
    
    earnPerDay: Ember.computed('model', {
        get() {
            return 24 * 60 * 60 / this.get('config').BlockTime * this.get('config').BlockReward *
                this.getWithDefault('model.hashrate') / this.get('hashrate');
        }
    })
});