import { Component, OnInit } from '@angular/core';

declare var require: any;
var IPFS = require('ipfs');
var Room = require('ipfs-pubsub-room');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  title = 'app';
  room: any;
  msg: string = "";
  peerId: string = "";

  ngOnInit() {
    let ipfs = new IPFS({
      repo: 'ipfs/pubsub-demo/' + Math.random(),
      EXPERIMENTAL: {
        pubsub: true
      },
      config: {
        Addresses: {
          Swarm: [
            '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star'
          ]
        }
      }
    });

    ipfs.once('ready', () => ipfs.id((err, info) => {
      if (err) { throw err }
      console.log('IPFS node ready with address ' + info.id)

      this.room = Room(ipfs, 'ipfs-pubsub-demo')
      this.room.on('peer joined', (peer) => console.log('peer ' + peer + ' joined'))
      this.room.on('peer left', (peer) => console.log('peer ' + peer + ' left'))

      // send and receive messages
      this.room.on('peer joined', (peer) => {this.room.sendTo(peer, 'Hello ' + peer + '!'); debugger;})
      this.room.on('message', (message) => console.log('got message from ' + message.from + ': ' + message.data.toString()))

      // broadcast message every 2 seconds
      //setInterval(() => room.broadcast('hey everyone!'), 2000)
    }))
  }


  sendMsg() {
    this.room.sendTo(this.peerId, this.msg);
  }

  broadcastMsg() {
    this.room.broadcast(this.msg);
  }


}
