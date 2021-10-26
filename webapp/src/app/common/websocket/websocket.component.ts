import { Component, OnInit } from '@angular/core';
import * as SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

@Component({
  selector: 'app-websocket',
  templateUrl: './websocket.component.html',
  styleUrls: ['./websocket.component.scss']
})
export class WebsocketComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.disconnect();
  }

  stompClient = null;
            
    setConnected(connected) {
      //  document.getElementById('connect').disabled = connected;
      //  document.getElementById('disconnect').disabled = !connected;
        document.getElementById('conversationDiv').style.visibility 
          = connected ? 'visible' : 'hidden';
        document.getElementById('response').innerHTML = '';
    }
    
    connect() {
        var socket = new SockJS('/chatwithbots');
        this.stompClient = Stomp.over(socket);  
        this.stompClient.connect({}, function(frame) {
            console.log('Connected: ' + frame);
            this.stompClient.subscribe('/topic/pushmessages', function(messageOutput) {
              this.showMessageOutput(JSON.parse(messageOutput.body));
            });
        });
    }
    
    disconnect() {
        if(this.stompClient != null) {
          this.stompClient.disconnect();
        }
        console.log("Disconnected");
    }
    
    sendMessage() {
        var from = document.getElementById('from');
        var text = document.getElementById('text');
        this.stompClient.send("/app/chatwithbots", {}, 
          JSON.stringify({'from':from, 'text':text}));
    }
    
    showMessageOutput(messageOutput) {
        var response = document.getElementById('response');
        var p = document.createElement('p');
        p.style.wordWrap = 'break-word';
        p.appendChild(document.createTextNode(messageOutput.from + ": " 
          + messageOutput.text + " (" + messageOutput.time + ")"));
        response.appendChild(p);
    }

}
