/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        var serviceName = 'com.red_folder.phonegap.plugin.backgroundservice.sample.BackgroundService';
        var factory = cordova.require('com.red_folder.phonegap.plugin.backgroundservice.sample.BackgroundService');
        myService = factory.create(serviceName);
        alert(JSON.stringify(myService));
        startService();


        //this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};


function getStatus(){
    myService.getStatus(function(r) {
      $scope.handleSuccess(r)
  }, function(e) {
      $scope.handleError(e)
  });
  }
  
  function stopService() {
                  myService.stopService(function(r) {
                     $scope.handleSuccess(r)
                  },
                          function(e) {
                               $scope.handleError(e)
                          });
              }
  
  
  function startService() {
      myService.startService(function (r) {
          $scope.handleSuccess(r)
          if(r.ServiceRunning){
  
                      setConfig()
                       enableTimer();
                       registerForUpdates()
                       registerForBootStart()
          }
      },
              function (e) {
                  $scope.handleError(e)
              });
  }
  function enableTimer() {
      myService.enableTimer(10000,
              function (r) {
                   $scope.handleSuccess(r)
              },
              function (e) {
                  $scope.handleError(e)
              });
  }
  function registerForBootStart() {
         myService.registerForBootStart(function (r) {
           $scope.handleSuccess(r)
         },
                 function (e) {
                     handleError(e)
                 });
     }
  
     function registerForUpdates() {
         myService.registerForUpdates(function (r) {
           $scope.handleSuccess(r)
         },
                 function (e) {
                     $scope.handleError(e)
                 });
     }
     function setConfig() {
  
         var helloToString = "saji";
         var config = {
             "HelloTo": helloToString
         };
         myService.setConfiguration(config,
                 function (r) {
                    $scope.handleSuccess(r)
                 },
                 function (e) {
                     $scope.handleError(e)
                 });
     }
  
  
  $scope.handleSuccess = function (data) {
  
      alert("sucess" + JSON.stringify(data));
      th.data = data;
  
  }
  $scope.handleError = function (data) {
  
      alert("error" + JSON.stringify(data))
      th.data = data;
  
  }


  app.initialize();