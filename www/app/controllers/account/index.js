   
function r(e, t) {
    e = new Date(e);
    var a = {
    year: e.getFullYear(),
        month: e.getMonth() + 1 < 10 ? "0" + (e.getMonth() + 1) : e.getMonth() + 1,
        day: e.getDate() < 10 ? "0" + e.getDate() : e.getDate(),
        hours: e.getHours() < 10 ? "0" + e.getHours() : e.getHours(),
        minutes: e.getMinutes() < 10 ? "0" + e.getMinutes() : e.getMinutes(),
 seconds: e.getSeconds() < 10 ? "0" + e.getSeconds() : e.getSeconds(),
    };
    for (var r in a) t = t.replace(r, a[r]);
    return t;
}

function n(e, t) {
    for (var r = ["", "K", "M", "G", "T", "P"], n = 0; e > 1e3;) (e /= 1e3), n++;
    return t
        ? e.toFixed(2) + " " + r[n]
        : e.toFixed(2) + " " + r[n] + a.default.TEMPLATE.hashrateUnit;
}

function d(e) {
    for (var t = ["", "K", "M", "G", "T", "P"], a = 0; e >= 1e3;)
        (e /= 1e3), a++;
    return (
        (e = e < 10 ? e.toFixed(2) : e.toFixed(0)),
        e.replace(".00", "") + " " + t[a]
    );
}



import Ember from "ember";

export default Ember.Controller.extend({
    applicationController: Ember.inject.controller('application'),
    netstats: Ember.computed.reads('applicationController'),
    stats: Ember.computed.reads('applicationController.model.stats'),
    config: Ember.computed.reads('applicationController.config'),
    hashrate: Ember.computed.reads('applicationController.hashrate'),

    chartOptions: Ember.computed("model", {
        get() {
            var now = new Date();
            var e = this,
                t = e.getWithDefault("model.minerCharts", []),

                a = {
                    chart: {
                        backgroundColor: "rgba(48, 97, 63, 0.00)  ",
                        type: "areaspline",
                        marginRight: 5,
                        height: 180,

                        events: {
                            load: function () {
                                var self = this;
                
                                var chartInterval = setInterval(function () {
                               if (!self.series) {
                                 clearInterval(chartInterval);
                                return;
                                }



                               var series = self.series[0];
                               t = e.getWithDefault("model.minerCharts", []);
			                   var a = [];
                               t.forEach(function(e) {
                               var x = new Date(1000 * e.x);
                               var l = x.toLocaleString();
                               var y = e.minerHash;
                               a.push({x: x, y: y, d: l});
                                           });


                                    var now = new Date();
                                var l = now.toLocaleString();
                                var y = e.getWithDefault("model.currentHashrate");
                                var last = { x: now, y: y, d: l };
                                {
                                    a.push(last);
                                }

                             series.setData(a, true, {}, true);

                                 
                               


                              
           
                                }, 88*1000);
                            }
                        }
                    },
                    title: {
                        text: "",
                    },
                    xAxis: { 


ordinal: false,
gridLineWidth: 1,
gridLineColor: "#000000",



labels: {
    style: {color: "#000",},
    //formatter: function () {return r(this.value, "hours:minutes");},


                        },
                        ordinal: true,
                        type: "datetime",
                        dateTimeLabelFormats: {
                            millisecond: "%H:%M:%S",
			    //second: "%H:%M:%S",
                            second: "%H:%M",
                            minute: "%H:%M",
                            hour: "%H:%M",
                            day: "%e. %b. %Y",
                            week: "%e. %b",
                            month: "%b '%y",
                            year: "%Y"
                        },
                    },
                    yAxis: {
                        gridLineWidth: 1,
                        gridLineColor: "#000000",
                        tickAmount: 4 ,
                        title: {
                            text: "Current Hashrate",
                            style: {
                                color: "#001aff",
                            },
                        },

                        min: 0,
                        labels: {
                            enabled: true,
                            style: {
                                color: "#000000",
                            },
                                 formatter: function () {
                                    return d(this.value);
                                },



                        },
                    },



plotOptions: {
// series: {
 //animation: {
 // duration: 1100
   //         }
     //    },

areaspline: {
 marker: {
 enabled: false,
         },
            },

             },

                    plotLines: [
                        {
                            value: 0,
                            width: 1,
                            color: "#3D3D3D",
                        },
                    ],
                    legend: {
                        enabled: false,
                    },




                    tooltip: {


    borderRadius: 7,
    borderWidth: 1,
    shared: false,
    headerFormat: "",





                        formatter: function () {
                          function scale(v) {
                                var f = v;
                                var units = ['', 'K', 'M', 'G', 'T'];
                                for (var i = 0; i < 5 && f > 1000; i++) {
                                    f /= 1000;
                                }
                                return f.toFixed(2) + ' ' + units[i];
                           }
                            var h = scale(this.point.y);

//return this.point.d + "<br />" + "<b>Хешрейт:&nbsp;" + h + "H/s</b>";
                           return '' + Highcharts.dateFormat('%d.%m.%Y %H:%M', this.x) + "<br />" +"<b>Current Hashrate:&nbsp;" + h + "H/s</b>";
                       },
                        useHTML: true
                    },


                    exporting: {
                        enabled: false,
                    },
                    series: [
                        {
                            fillColor: "rgba(0,26,255,0.07)",
                            color: "#001aff",

                            name: "30 minutes average hashrate",


                            data: function () {
                                var a = [];
                                if (null != t) {
                                    t.forEach(function (d) {
                                        var x = new Date(1000 * d.x);
                                        var l = x.toLocaleString();
                                        var y = d.minerHash;
                                        var point = { x: x, y: y, d: l };
                                        a.push(point);
                                    });
                                }
                             var l = now.toLocaleString();
                                var y = e.getWithDefault("model.currentHashrate");
                                var last = { x: now, y: y, d: l };
                                {
                                    a.push(last);
                                }
  
                                return a;
                            }()
                        },
                    ],
                };
            return a;
        },
    }),

    chartOptions1: Ember.computed("model", {
        get() {
            var now = new Date();
            var e = this,
                t = e.getWithDefault("model.minerCharts", []),

                a = {
                    chart: {
                        backgroundColor: "rgba(48, 97, 63, 0.00)  ",
                        type: "areaspline",
                        marginRight: 5,
                        height: 180,

                        events: {
                            load: function () {
                                var self = this;
                
                                var chartInterval = setInterval(function () {
                               if (!self.series) {
                                 clearInterval(chartInterval);
                                return;
                                }



                               var series = self.series[0];
                               t = e.getWithDefault("model.minerCharts", []);
			                   var a = [];
                               t.forEach(function(e) {
                               var x = new Date(1000 * e.x);
                               var l = x.toLocaleString();
                               var y = e.minerLargeHash;
                               a.push({x: x, y: y, d: l});
                                           });


                                    var now = new Date();
                                var l = now.toLocaleString();
                                var y = e.getWithDefault("model.hashrate");
                                var last = { x: now, y: y, d: l };
                                {
                                    a.push(last);
                                }

                             series.setData(a, true, {}, true);

                                 
                               


                              
           
                                }, 88*1000);
                            }
                        }
                    },
                    title: {
                        text: "",
                    },
                    xAxis: { 


ordinal: false,
gridLineWidth: 1,
gridLineColor: "#000000",



labels: {
    style: {color: "#000",},
    //formatter: function () {return r(this.value, "hours:minutes");},


                        },
                        ordinal: true,
                        type: "datetime",
                        dateTimeLabelFormats: {
                            millisecond: "%H:%M:%S",
			    //second: "%H:%M:%S",
                            second: "%H:%M",
                            minute: "%H:%M",
                            hour: "%H:%M",
                            day: "%e. %b. %Y",
                            week: "%e. %b",
                            month: "%b '%y",
                            year: "%Y"
                        },
                    },
                    yAxis: {
                        gridLineWidth: 1,
                        gridLineColor: "#000000",
                        tickAmount: 4 ,
                        title: {
                            text: "Average Hashrate",
                            style: {
                                color: "#ff003c",
                            },
                        },

                        min: 0,
                        labels: {
                            enabled: true,
                            style: {
                                color: "#000000",
                            },
                                 formatter: function () {
                                    return d(this.value);
                                },



                        },
                    },



plotOptions: {
// series: {
 //animation: {
 // duration: 1100
   //         }
     //    },

areaspline: {
 marker: {
 enabled: false,
         },
            },

             },

                    plotLines: [
                        {
                            value: 0,
                            width: 1,
                            color: "#3D3D3D",
                        },
                    ],
                    legend: {
                        enabled: false,
                    },




                    tooltip: {


    borderRadius: 7,
    borderWidth: 1,
    shared: false,
    headerFormat: "",





                        formatter: function () {
                          function scale(v) {
                                var f = v;
                                var units = ['', 'K', 'M', 'G', 'T'];
                                for (var i = 0; i < 5 && f > 1000; i++) {
                                    f /= 1000;
                                }
                                return f.toFixed(2) + ' ' + units[i];
                           }
                            var h = scale(this.point.y);

//return this.point.d + "<br />" + "<b>Хешрейт:&nbsp;" + h + "H/s</b>";
                           return '' + Highcharts.dateFormat('%d.%m.%Y %H:%M', this.x) + "<br />" +"<b>Average Hashrate:&nbsp;" + h + "H/s</b>";
                       },
                        useHTML: true
                    },


                    exporting: {
                        enabled: false,
                    },
                    series: [
                        {
                            fillColor: "rgba(255,0,60,0.07)",
                            color: "#ff003c",

                            name: "30 minutes average hashrate",


                            data: function () {
                                var a = [];
                                if (null != t) {
                                    t.forEach(function (d) {
                                        var x = new Date(1000 * d.x);
                                        var l = x.toLocaleString();
                                        var y = d.minerLargeHash;
                                        var point = { x: x, y: y, d: l };
                                        a.push(point);
                                    });
                                }
                             var l = now.toLocaleString();
                                var y = e.getWithDefault("model.hashrate");
                                var last = { x: now, y: y, d: l };
                                {
                                    a.push(last);
                                }
  
                                return a;
                            }()
                        },
                    ],
                };
            return a;
        },
    }),
  
  shareChart: Ember.computed("model.hashrate", {
        get() {
            var e = this,
                t = e.getWithDefault("model.shareCharts"),
                a = {
                    chart: {
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        type: "column",
                        marginRight: 10,
                        height: 180
                       // events: {
                          /*  load: function() {
                                var series = this.series[0];
                                setInterval(function() {
                                    var x = (new Date()).getTime(),
                                        y = e.getWithDefault("model.workersOnline") / 1000000;
                                    series.addPoint([x, y], true, true);
                                }, 1090000000);
                            } */
                       // }
                    },
                    title: {
                        text: ""
                    },
                  xAxis: {
                        ordinal: false,
                        labels: {
                            style: {
                                color: "#000"
                            }
                        },
                        type: "datetime",
                        dateTimeLabelFormats: {
                            millisecond: "%H:%M:%S",
                            second: "%H:%M:%S",
                            minute: "%H:%M",
                            hour: "%H:%M",
                            day: "%e. %b. %Y",
                            week: "%e. %b",
                            month: "%b '%y",
                            year: "%Y"
                        }
                    },
                   //rangeSelector: {
                         //  selected: 1,
                         // },
                    yAxis: {
                        gridLineWidth: 1,
                        gridLineColor: "#000000",
                        title: {
                            text: "Shares",
                            style: {
                                color: "#15BD27"
                            },
                        }, 
                        labels: {
                            style: {
                                color: "#000"
                            }
                        }
                        //softMin: e.getWithDefault("model.currentHashrate") / 1000000,
                        //softMax: e.getWithDefault("model.currentHashrate") / 1000000,
                    },
                    plotOptions: {
                      series: {
                        marginleft: 0,
                       pointWidth: 10
                       //   marker: {
                                //  enabled: false
                                //   }
                        },
                      column: {
                            stacking: 'normal',
                            grouping: false
                            //shadow: false
                            //borderWidth: 0
                            }
                   },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: "#aaaaaa"
                    }],
                    legend: {
                        enabled: true,
                        itemStyle:
                          {
                            color: "#000"
                          },
                    },
                    tooltip: {
                        formatter: function() {
                            return this.y > 1000000000000 ? "<b>" + this.point.d + "<b><br>Shares&nbsp;" + (this.y / 1000000000000) + "</b>" : this.y > 1000000000 ? "<b>" + this.point.d + "<b><br>Shares&nbsp;" + (this.y / 1000000000) + "</b>" : this.y > 1000000 ? "<b>" + this.point.d + "<b><br>Shares&nbsp;" + (this.y / 1000000) + "</b>" : "<b>" + this.point.d + "<b><br>Shares&nbsp;<b>" + this.y + "</b>";

                        },

                        useHTML: true
                    },
                   exporting: {
            enabled: false
        },
                    series: [{
                        color: "#15BD27",
                        name: "Valid share",
                        data: function() {
                            var e, a = [];
                            if (null != t) {
                                for (e = 0; e <= t.length - 1; e += 1) {
                                    var n = 0,
                                        r = 0,
                                        l = 0;
                                    r = new Date(1e3 * t[e].x);
                                    l = r.toLocaleString();
                                    n = t[e].valid;
                                    a.push({
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
                      
                    }, {
     
                        name: "Stale share",
                        color: "#E99002",
                        data: function() {
                            var e, a = [];
                            if (null != t) {
                                for (e = 0; e <= t.length - 1; e += 1) {
                                    var n = 0,
                                        r = 0,
                                        l = 0;
                                    r = new Date(1e3 * t[e].x);
                                    l = r.toLocaleString();
                                    n = t[e].stale;
                                    a.push({
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
                      
                     /*  }, {
     
                        name: "Workers",
                        color: "#FF0000",
                        type: 'spline',
                          plotLines: [{
                       // value: 0,
                        width: 1,
                        color: "#aaaaaa"
                    }],
                        data: function() {
                            var e, a = [];
                            if (null != t) {
                                for (e = 0; e <= t.length - 1; e += 1) {
                                    var n = 0,
                                        r = 0,
                                        l = 0;
                                    r = new Date(1e3 * t[e].x);
                                    l = r.toLocaleString();
                                    n = t[e].workerOnline;
                                    a.push({
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
                        }() */
                    }]
                };
            return a;
        }
    }),
  
   netHashrate: Ember.computed({
      get() {
        return this.get('hashrate');
        }
        }),
 /* percStaleShare: Ember.computed('model', {
    get() {
      var percent = this.get('model.stale_shares') / this.get('model.valid_shares') * 100;
      if (!percent) {
        return this.get('model.stale_shares');
      }
      return percent.toFixed(2);;
    }
  }), */
  earnPerHour: Ember.computed('model', {
    get() {
      return 1 * 60 * 60 / this.get('applicationController.blockTime') * this.get('config').BlockReward *
      this.getWithDefault('model.hashrate') / this.get('hashrate');
    }
  }),
  earnPerDay: Ember.computed('model', {
    get() {
      return 24 * 60 * 60 / this.get('applicationController.blockTime') * this.get('config').BlockReward *
      this.getWithDefault('model.hashrate') / this.get('hashrate');
    }
  }),
  earnPerWeek: Ember.computed('model', {
    get() {
      return 168 * 60 * 60 / this.get('applicationController.blockTime') * this.get('config').BlockReward *
      this.getWithDefault('model.hashrate') / this.get('hashrate');
    }
  }),
  earnPerMonth: Ember.computed('model', {
    get() {
      return 672 * 60 * 60 / this.get('applicationController.blockTime') * this.get('config').BlockReward *
      this.getWithDefault('model.hashrate') / this.get('hashrate');
    }
  }),
  earnPerYear: Ember.computed('model', {
    get() {
      return 8760 * 60 * 60 / this.get('applicationController.blockTime') * this.get('config').BlockReward *
      this.getWithDefault('model.hashrate') / this.get('hashrate');
    }
  }),
  
  usdPerMonth: Ember.computed('model', {
    get() {
       var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", "https://min-api.cryptocompare.com/data/price?fsym=ETC&tsyms=USD", false);
  xmlhttp.send();
  var obj = JSON.parse(xmlhttp.responseText);
      var value = 672 * 60 * 60 / this.get('config').BlockTime * this.get('config').BlockReward *
      this.getWithDefault('model.hashrate') / this.get('hashrate') * obj["USD"];
      return value.toFixed(3);
    }
  }),
  usdPerWeek: Ember.computed('model', {
    get() {
       var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", "https://min-api.cryptocompare.com/data/price?fsym=ETC&tsyms=USD", false);
  xmlhttp.send();
  var obj = JSON.parse(xmlhttp.responseText);
      var value = 168 * 60 * 60 / this.get('config').BlockTime * this.get('config').BlockReward *
      this.getWithDefault('model.hashrate') / this.get('hashrate') * obj["USD"];
      return value.toFixed(3);
    }
  }),
  usdPerDay: Ember.computed('model', {
    get() {
       var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", "https://min-api.cryptocompare.com/data/price?fsym=ETC&tsyms=USD", false);
  xmlhttp.send();
  var obj = JSON.parse(xmlhttp.responseText);
      var value = 24 * 60 * 60 / this.get('config').BlockTime * this.get('config').BlockReward *
      this.getWithDefault('model.hashrate') / this.get('hashrate') * obj["USD"];
      return value.toFixed(3);
    }
  }),
  
  usdPerHour: Ember.computed('model', {
    get() {
       var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", "https://min-api.cryptocompare.com/data/price?fsym=ETC&tsyms=USD", false);
  xmlhttp.send();
  var obj = JSON.parse(xmlhttp.responseText);
      var value = 1 * 60 * 60 / this.get('config').BlockTime * this.get('config').BlockReward *
      this.getWithDefault('model.hashrate') / this.get('hashrate') * obj["USD"];
      return value.toFixed(3);
    }
  }),
  
  btcPerMonth: Ember.computed('model', {
    get() {
       var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", "https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD", false);
  xmlhttp.send();
  var obj = JSON.parse(xmlhttp.responseText);
       var value = this.get('usdPerMonth') / obj["USD"];
      return value.toFixed(4);
    }
  }),
  btcPerWeek: Ember.computed('model', {
    get() {
       var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", "https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD", false);
  xmlhttp.send();
  var obj = JSON.parse(xmlhttp.responseText);
      var value = this.get('usdPerWeek') / obj["USD"];
      return value.toFixed(4);
    }
  }),
  btcPerDay: Ember.computed('model', {
    get() {
       var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", "https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD", false);
  xmlhttp.send();
  var obj = JSON.parse(xmlhttp.responseText);
     var value = this.get('usdPerDay') / obj["USD"];
      return value.toFixed(4);
    }
  }),
  
  btcPerHour: Ember.computed('model', {
    get() {
       var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", "https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD", false);
  xmlhttp.send();
  var obj = JSON.parse(xmlhttp.responseText);
      var value = this.get('usdPerHour') / obj["USD"];
      return value.toFixed(4);
    }
  })
  
});