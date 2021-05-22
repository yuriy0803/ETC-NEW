import Ember from 'ember';

export default Ember.Controller.extend({
    applicationController: Ember.inject.controller('application'),
    config: Ember.computed.reads('applicationController.config'),
    stats: Ember.computed.reads('applicationController.model.stats'),
    hashrate: Ember.computed.reads('applicationController.hashrate'),

  roundPercent: Ember.computed('stats', 'model', {
    get() {
      var percent = this.get('model.roundShares') / this.get('stats.nShares');
      if (!percent) {
        return 0;
      }
      
      if(percent>100){
        return 100;
    }
      return percent;
    }
  
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