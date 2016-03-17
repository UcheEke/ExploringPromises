/**
 * Created by ekeu on 16/03/16.
 */

document.addEventListener('DOMContentLoaded', function(){
    var input = document.getElementById("input");
    var info = document.getElementById("info");

    changeBtnColor = function(){
        input.classList.remove('btn-success');
        input.classList.add('btn-danger');
        input.innerHTML="Stopped";
        input.setAttribute('disabled', 'disabled');
        setTimeout(function(){
            input.classList.remove('btn-danger');
            input.classList.add('btn-primary');
            input.innerHTML="Press Me!";
            input.removeAttribute('disabled');
        }, 1000);
    };

    input.addEventListener('mousedown', function(){
        // Change the display of the button
        input.innerHTML = "Holding...";
        input.classList.remove("btn-primary");
        input.classList.add("btn-success");
        // Create a new promise
        var clicking = new Promise(function(resolve, reject){
            var start = new Date();

            // Success - call 'resolve'
            input.onmouseup = function(){
                resolve(new Date() - start);
            };

            // Failure  - call 'reject'
            input.onmouseout = function(){
                reject('You left the button!');
            };
        });

        // then(resolve, reject) - we'll define them inline...
        clicking.then(function(duration){
            var tsec = (duration/1000);
            if ( tsec <= 4.5 || tsec >= 5.5 ){
                info.innerHTML = "<span class='red'>Fail!!: " + tsec + " secs</span>";
            } else {
                info.innerHTML = "<span class='green'>Success!!: " + tsec + " secs</span>";
            }
            setTimeout(changeBtnColor(),1000);
        }, function(message){
          window.alert("Challenge incomplete: " + message);
        });
    });


});

document.addEventListener('DOMContentLoaded', function(){
    var charging = document.getElementById('charging');
    var level = document.getElementById('battery-level');

    var batteryPromise = navigator.getBattery();

    batteryPromise.then(function(batteryManager){
        console.log(batteryManager);
        charging.innerText = batteryManager.charging ? "Yes" : "No";
        level.innerText = " " + (batteryManager.level) * 100 + "%";
        level.className = "fa fa-battery-" + Math.round((batteryManager.level) * 4);
    });


});

document.addEventListener('DOMContentLoaded', function(){
    var saywhat = document.getElementById('say-what');
    var status = document.getElementById('status');
    var synth = window.speechSynthesis;

    saywhat.addEventListener('blur', function(){
        console.log("I've been asked to say..'%s'..apparently!", saywhat.value);
        var utterance = new SpeechSynthesisUtterance(saywhat.value);
        synth.speak(utterance);
    });
});
