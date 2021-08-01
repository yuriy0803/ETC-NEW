import Ember from 'ember';

export default Ember.Controller.extend({
  applicationController: Ember.inject.controller('application'),
  stats: Ember.computed.reads('applicationController'),
  config: Ember.computed.reads('applicationController.config'),

	cachedLogin: Ember.computed('login', {
    get() {
      return this.get('login') || Ember.$.cookie('login');
    },
    set(key, value) {
      Ember.$.cookie('login', value);
      this.set('model.login', value);
      return value;
    }
  }),
  
  chartOptions: Ember.computed("model.hashrate", {
        get() {
            var e = this,
                t = e.getWithDefault("stats.model.poolCharts"),
                a = {
                    chart: {
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        type: "area",
                        height: 300,
                        marginRight: 10,
                        events: {
                            load: function() {
                                var series = this.series[0];
                                setInterval(function() {
                                    var x = (new Date()).getTime(), y = e.getWithDefault("model.Hashrate") / 1000000;
                                    series.addPoint([x, y], true, true);
                                }, 1090000000);
                            }
                        }
                    },
                    title: {
                        text: "Pool Hashrate",
                        style: {
                            color: "#0000ff"
                        }
                    },
                    xAxis: {
                        labels: {
                            style: {
                                color: "#000"
                            }
                        },
                        ordinal: false,
                        type: "datetime",

                        gridLineWidth: 1,
                        gridLineColor: "#000000"
                    },
                    yAxis: {
                        title: {
                            text: "HASHRATE",
                            style: {
                                color: "#0000ff"
                            }
                        },
                        labels: {
                            style: {
                                color: "#000"
                            }
                        },
                        gridLineWidth: 1,
                        gridLineColor: "#000000"
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: "#ccc"
                    }],
                    legend: {
                        enabled: false
                    },
                    tooltip: {
                        formatter: function() {
                            function scale(v) {
                                var f = v;
                                var units = ['', 'K', 'M', 'G', 'T'];
                                for (var i = 0; i < 5 && f > 1000; i++)  {
                                    f /= 1000;
                                }
                                return f.toFixed(2) + ' ' + units[i];
                            }
                            var h = scale(this.point.y);

                            return "<b>" + this.point.d + "</b><br />" +
                                "<b>Hashrate&nbsp;" + h + "H/s</b>";
                        },
                        useHTML: true
                    },
                     exporting: {
                          enabled: false
                     },
                    plotOptions: {
                        line: {
                            pointInterval: 5
                        },
                        pointInterval:10
                    },
                    series: [{
                        color: "#0000ff",
                        name: "Hashrate",
                        shadow: true,
                        data: function() {
                            var e, a = [];
                            if (null != t) {
                                for (e = 0; e <= t.length - 1; e += 1) {
                                    var n = 0,
                                        r = 0,
                                        l = 0;
                                    r = new Date(1e3 * t[e].x);
                                    l = r.toLocaleString();
                                    n = t[e].y; a.push({
                                        x: r,
                                        d: l,
                                        y: n
                                    });
                                }
                            } else {
                                a.push({
                                x: 0,
                                d: 0,
                                y: 0
                                });
                            }
                            return a;
                        }()
                    }]
                };
            return a;
        }
    }),
  
  chartDiff: Ember.computed("model.hashrate", {
        get() {
            var e = this,
                t = e.getWithDefault("stats.model.netCharts"),
                a = {
                    chart: {
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        type: "area",
                        height: 300,
                        marginRight: 10,
                        //zoomType: 'xy',
                       /* events: {
                            load: function() {
                                var series = this.series[0];
                                setInterval(function() {
                                    var x = (new Date()).getTime(), y = e.getWithDefault("difficulty") / 1000000;
                                    series.addPoint([x, y], true, true);
                                }, 1090000000);
                            }
                        } */
                    },
                    title: {
                        text: "Network Difficulty",
                        style: {
                            color: "#F87217"
                        }
                    },
                 	rangeSelector : {
                enabled: true,
               selected: 4,
      allButtonsEnabled: true,
      inputDateFormat: '%Y/%m/%d %H:%M',
      inputEditDateFormat: '%Y/%m/%d %H:%M',
      inputEnabled: false,
      buttons: [{
          type: 'hour',
          count: 1,
          text: '1h'
        },
        {
          type: 'hour',
          count: 2,
          text: '2h'
        },
        {
          type: 'hour',
          count: 4,
          text: '4h'
        },
        {
          type: 'hour',
          count: 6,
          text: '6h'
        },
        {
          type: 'hour',
          count: 12,
          text: '12h'
        },
        {
          type: 'all',
          text: 'All'
        }
      ],
			             },
                 navigator: {
                    enabled: true                 
                   }, 
     /*             scrollbar: {
            enabled:true,
			barBackgroundColor: 'gray',
			barBorderRadius: 7,
			barBorderWidth: 0,
			buttonBackgroundColor: 'gray',
			buttonBorderWidth: 0,
			buttonArrowColor: 'yellow',
			buttonBorderRadius: 7,
			rifleColor: 'yellow',
			trackBackgroundColor: 'white',
			trackBorderWidth: 1,
			trackBorderColor: 'silver',
			trackBorderRadius: 7
           
                            
	    },  */
                  credits: {
            enabled: false,
            position: {
                align: 'right',
                x: -10,
                verticalAlign: 'bottom',
                y: -5
            },
            href: "https://highcharts.com",
            text: "Highcharts"
        }, 
                    xAxis: {
                  
                        labels: {
                            style: {
                                color: "#000"
                            }
                          //minRange: 1
                        },
                        ordinal: false,
                        type: "datetime",
                        gridLineWidth: 1,
                        gridLineColor: "#000000"
                    },
                    yAxis: {
                    
                        title: {
                            text: "DIFFICULTY",
                            style: {
                                color: "#F87217"
                            }
                        },
                       
                        labels: {
                            style: {
                                color: "#000"
                            }
                        },
                        gridLineWidth: 1,
                        gridLineColor: "#000000"
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: "#000"
                    }],
                    legend: {
                        enabled: false
                    },
                    tooltip: {
                        formatter: function() {
                            function scale(v) {
                                var f = v;
                                var units = ['', 'K', 'M', 'G', 'T', 'P'];
                                for (var i = 0; i < 5 && f > 1000; i++)  {
                                    f /= 1000;
                                }
                                return f.toFixed(3) + ' ' + units[i];
                            }
                            var h = scale(this.point.y);

                            return "<b>" + this.point.d + "</b><br />" +
                                "<b>Difficulty&nbsp;" + h + "H/s</b>";
                        },
                        useHTML: true
                    },
                     exporting: {
                       enabled: true
                     },
                    plotOptions: {
                        line: {
                            pointInterval: 5
                        },
                        pointInterval:10
                    },
                    series: [{
                        color: "#F87217",
                        name: "Difficulty",
                        shadow: true,
                        data: function() {
                            var e, a = [];
                            if (null != t) {
                                for (e = 0; e <= t.length - 1; e += 1) {
                                    var n = 0,
                                        r = 0,
                                        l = 0;
                                    r = new Date(1e3 * t[e].x);
                                    l = r.toLocaleString();
                                    n = t[e].y; a.push({
                                        x: r,
                                        d: l,
                                        y: n
                                    });
                                }
                            } else {
                                a.push({
                                x: 0,
                                d: 0,
                                y: 0
                                });
                            }
                            return a;
                        }()
                       
                    }]
                };
            return a;
        }
    })
});