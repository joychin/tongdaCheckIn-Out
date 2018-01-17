/**
 * Copyright (c) 2011 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

var DEFAULT_A1_TT = '09:00';
var DEFAULT_A1_AMPM = 0;
var DEFAULT_A2_TT = '18:30';
var DEFAULT_A2_AMPM = 1;
var DEFAULT_RATE = 1.0;
var DEFAULT_VOLUME = 1.0;
var DEFAULT_PHRASE = 'It\'s $TIME, so get up!';
var DEFAULT_SOUND = 'ringing';

var audio = null;

var isPlaying = false;
var isSpeaking = false;
var isAnimating = false;

function $(id) {
  return document.getElementById(id);
}

function parseTime(timeString) {
  var time = timeString.match(/^(\d\d):(\d\d)$/);
  if (!time) {
    throw 'Cannot parse: ' + timeString;
  }

  var hours = parseInt(time[1], 10);

  var minutes = parseInt(time[2], 10) || 0;

  return [hours, minutes];
}
