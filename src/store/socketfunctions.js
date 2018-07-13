import * as Actions from './Actions';

var socket = null;

export function wsMiddleware() {
  /* eslint-disable */
  socket = new io();
  /* eslint-enable */

  socket.on('driverChannel:request_trip_8b719a90-3c51-11e8-803b-eb1d59c84872', (data) => {
    console.log('GetDataDone');
    store.dispatch(Actions.apiGotData(data));
  });

}

