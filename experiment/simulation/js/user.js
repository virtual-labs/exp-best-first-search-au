import{nodesrandom , edgesrandom,showOperation} from './utils.js';
import PriorityQueue from './priorityQueue.js';

var canvas = document.getElementById('mynetwork');
canvas.width = window.innerWidth - 650;
canvas.height = window.innerHeight - 26;

// var ctx = canvas.getContext('2d');
window.addEventListener('load', function () {
   console.log(nodesrandom,"random nodes yes");
    console.log(edgesrandom,"random edges yes");
  })

// Function to perform Best First Search algorithm
export default class User {

    constructor() {
       
    }

    bestFirstSearchrandom(startNode, endNode,nodesrandom,edgesrandom) {
      var visited = {};
      if (nodesrandom && nodesrandom.length > 0) {
        var nodes = nodesrandom.filter(node => node != null).map(node => ({id: node.id}));
        for (var k of nodes) {
          visited[k.id] = false;
        }
      }      
      var ret = [];
      console.log(ret,"ret");
      var pq = new PriorityQueue();
      console.log(pq,"pq");
      visited[startNode.id] = true;
      var priority = this.getNodeValue(startNode.id);
      console.log(priority,"priority")
      pq.enqueue(startNode, priority);
      var path = '';
      console.log(path,"path");
      while (!pq.isEmpty()) {
        var first = pq.front();
        console.log(first,"first");

        var msg = 'Choose the Node with the highest priority, which is node <span class="highlight">' + first.node.label + '</span> with priority <span class="highlight">' + first.priority + '</span>';
        showOperation(msg);

        path += ' ' + first.node.id;
        ret.push(first.node.id);
        pq.dequeue();
        if (first.node.id == endNode.id) {
          break;
        }
        var edges = edgesrandom.filter(e => e.from === first.node.id || e.to === first.node.id);
        console.log(edges,"edges");
        var neighbors = edges.map(edge => {
          var neighborId = edge.from === first.node.id ? edge.to : edge.from;
          return nodesrandom.find(n => n.id === neighborId);
        }); 

        console.log(neighbors,"neighbors");
        var msg = 'Move to node <span class="highlight">' + first.node.label + '</span> and its neighbours <span class="highlight">' + neighbors.map(n => n.label).join('</span> and <span class="highlight">') + '</span> to the list of nodes to be visited.';
        showOperation(msg);

        for (var neighbor of neighbors) {
          if (!visited[neighbor.id]) {
            visited[neighbor.id] = true;
            var neighborPriority = this.getNodeValue(neighbor.id);
            console.log(neighborPriority,"neighborPriority");
            pq.enqueue(neighbor, neighborPriority);
          }
        }
      }
      ret.push(endNode.id);
      return ret;
    }
    getNodeValue(nodeId) {
      var node = nodesrandom.find(n => n.id === nodeId);
      if (node) {
        return node.value;
      } else {
        throw new Error('Invalid node ID');
      }
    }
    
    }