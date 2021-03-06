// Copyright 2016, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

var test = require('ava');
var messageSample = require('../../functions/message');

test.cb('should print a message', function (t) {
  var testMessage = 'test message';
  var messageWasPrinted = false;

  console.log = function (data) {
    if (data === testMessage) {
      messageWasPrinted = true;
    }
  };

  messageSample.helloworld({
    success: function (result) {
      t.is(result, undefined);
      if (messageWasPrinted) {
        t.end();
      } else {
        t.end('message was not printed!');
      }
    }
  }, {
    message: testMessage
  });
});
test.cb('should say no message was providied', function (t) {
  messageSample.helloworld({
    failure: function (result) {
      t.is(result, 'No message defined!');
      t.end();
    }
  }, {});
});
