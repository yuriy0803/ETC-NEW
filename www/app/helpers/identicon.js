import jdenticon from 'jdenticon';
import Ember from 'ember';

var jdenticonCounter = 0;

export function identicon([value, size]) {

  var icon = jdenticon.toSvg(value, size, "0");     

  return Ember.String.htmlSafe(icon);
}

export default Ember.Helper.helper(identicon);