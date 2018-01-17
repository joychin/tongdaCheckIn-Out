// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var blankClockImage;
var blankClockAnim1Image;
var blankClockAnim2Image;
var animationTimer;
var currentClockImage;
var port;

function updateEnabledStatus(alarm) {
  var enabled = $('a' + alarm + '_on').checked;
  $('a' + alarm + '_tt').disabled = !enabled;
  var valid = true;
  try {
    var tt = $('a' + alarm + '_tt').value;
    parseTime(tt);
  } catch (x) {
    valid = false;
  }
  if (valid) {
    $('a' + alarm + '_wrap').removeAttribute('aria-invalid');
  } else {
    $('a' + alarm + '_wrap').setAttribute('aria-invalid', 'true');
  }
  if (enabled) {
    $('a' + alarm + '_wrap').classList.remove('disabled');
  } else {
    $('a' + alarm + '_wrap').classList.add('disabled');
  }
}
//当前时间
function updateCurrentTime() {
  var now = new Date();
  var hh = now.getHours();
  var mm = now.getMinutes();
  var ss = now.getSeconds();
  var str = '';
  if (hh % 12 == 0) {
    str += '12';
  } else {
    str += (hh % 12);
  }
  str += ':';
  if (mm >= 10) {
    str += mm;
  } else {
    str += '0' + mm;
  }
  str += ':';
  if (ss >= 10) {
    str += ss;
  } else {
    str += '0' + ss;
  }
  if (hh >= 12) {
    str += " PM";
  } else {
    str += " AM";
  }
  $('current_time').innerText = str;
}


function addOutlineStyleListeners() {
  document.addEventListener('click', function (evt) {
    document.body.classList.add('nooutline');
    return true;
  }, true);
  document.addEventListener('keydown', function (evt) {
    document.body.classList.remove('nooutline');
    return true;
  }, true);
}

function load() {
  try {
    port = chrome.runtime.connect();
    port.onMessage.addListener(function (msg) {
      if (msg.cmd == 'anim') {
        displayAlarmAnimation();
      }
    });
  } catch (e) {}

  addOutlineStyleListeners();

  updateCurrentTime();
  setInterval(updateCurrentTime, 250);

  function updateTime(timeElement) {
    if (!parseTime(timeElement.value)) {
      return false;
    }

    timeElement.valueAsNumber =
      timeElement.valueAsNumber % (12 * 60 * 60 * 1000);
    if (timeElement.valueAsNumber < (1 * 60 * 60 * 1000))
      timeElement.valueAsNumber += (12 * 60 * 60 * 1000);
    return true;
  }


  // 上班打卡

  //上班打卡的时间
  var a1_tt = localStorage.a1_tt || DEFAULT_A1_TT;
  $('a1_tt').value = a1_tt;
  $('a1_tt').addEventListener('input', function (evt) {
    updateEnabledStatus(1);
    if (!updateTime($('a1_tt'))) {
      evt.stopPropagation();
      return false;
    }
    localStorage.a1_tt = $('a1_tt').value;
    updateEnabledStatus(1);
    return true;
  }, false);
  $('a1_tt').addEventListener('change', function (evt) {
    if ($('a1_tt').value.length == 4 &&
      parseTime('0' + $('a1_tt').value)) {
      $('a1_tt').value = '0' + $('a1_tt').value;
    }
    if (!updateTime($('a1_tt'))) {
      evt.stopPropagation();
      return false;
    }
    localStorage.a1_tt = $('a1_tt').value;
    updateEnabledStatus(1);
    return true;
  }, false);

  var a1_on = (localStorage.a1_on == 'true');
  $('a1_on').checked = a1_on;
  $('a1_on').addEventListener('change', function (evt) {
    window.setTimeout(function () {
      localStorage.a1_on = $('a1_on').checked;
      updateEnabledStatus(1);
    }, 0);
  }, false);

  updateEnabledStatus(1);

  // 下班打卡

  var a2_tt = localStorage.a2_tt || DEFAULT_A2_TT;
  $('a2_tt').value = a2_tt;
  $('a2_tt').addEventListener('input', function (evt) {
    updateEnabledStatus(2);
    if (!updateTime($('a2_tt'))) {
      evt.stopPropagation();
      return false;
    }
    localStorage.a2_tt = $('a2_tt').value;
    updateEnabledStatus(2);
    return true;
  }, false);
  $('a2_tt').addEventListener('change', function (evt) {
    if ($('a2_tt').value.length == 4 &&
      parseTime('0' + $('a2_tt').value)) {
      $('a2_tt').value = '0' + $('a2_tt').value;
    }
    if (!updateTime($('a2_tt'))) {
      evt.stopPropagation();
      return false;
    }
    localStorage.a2_tt = $('a2_tt').value;
    updateEnabledStatus(2);
    return true;
  }, false);

  var a2_on = (localStorage.a2_on == 'true');
  $('a2_on').checked = a2_on;
  $('a2_on').addEventListener('change', function (evt) {
    window.setTimeout(function () {
      localStorage.a2_on = $('a2_on').checked;
      updateEnabledStatus(2);
    }, 0);
  }, false);


  updateEnabledStatus(2);
}

document.addEventListener('DOMContentLoaded', load);