import{nodesArray , edgesArray, dataArray, showOperation} from './utils.js';
import PriorityQueue from './priorityQueue.js';

var canvas = document.getElementById('mynetwork');
canvas.width = window.innerWidth - 650;
canvas.height = window.innerHeight - 26;

window.addEventListener('load', function () {
  console.log(nodesArray, "nodesArray");
  console.log(edgesArray, "edgesArray");
  console.log(dataArray, "dataArray");
})

// Function to perform Best First Search algorithm
export default class Graph {
    // constructor(nodesArray, edgesArray) {
    //   this.nodes = new vis.DataSet(nodesArray);
    //   this.edges = new vis.DataSet(edgesArray);
    //   console.log(this.nodes,"this.nodes");
    // }'
  
    bestFirstSearch(startNode, endNode,nodesArray,edgesArray,isDirected = false) {
      var visited = {};
      console.log(visited,"visited");
      if (nodesArray && nodesArray.length > 0) {
        var nodes = nodesArray.filter(node => node != null).map(node => ({id: node.id}));
        console.log(nodes,"nodes");
        for (var k of nodes) {
          visited[k.id] = false;
          console.log(visited[k.id],"visited[k.id]")
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

        var msg = 'Select the Node with the highest priority, which is node <span class="highlight">' + first.node.label + '</span> with priority <span class="highlight">' + first.priority + '</span>';
        showOperation(msg);
        

        path += ' ' + first.node.id;
        ret.push(first.node.id);
        pq.dequeue();
        if (first.node.id == endNode.id) {
          console.log("entered yoooooooooo")
          break;
        }
        var edges = edgesArray.filter(e => e.from === first.node.id || (!isDirected && e.to === first.node.id));
        console.log(edges,"edges");
        var neighbors = edges.map(edge => {
          var neighborId = !isDirected && edge.to === first.node.id ? edge.from : edge.to;
          return nodesArray.find(n => n.id === neighborId);
        }); 

        console.log(neighbors,"neighbors");
        var msg = 'Traverse to node <span class="highlight">' + first.node.label + '</span> and its neighbours <span class="highlight">' + neighbors.map(n => n.label).join('</span> and <span class="highlight">') + '</span> to the list of nodes to be visited.';
        showOperation(msg);
        for (var neighbor of neighbors) {
          if (!visited[neighbor.id]) {
            visited[neighbor.id] = true;
            var neighborPriority = this.getNodeValue(neighbor.id, isDirected ? 'source' : 'target');
            console.log(neighborPriority,"neighborPriority");
            pq.enqueue(neighbor, neighborPriority);
          }
        }
      }
      if (path[path.length - 1] != endNode.id) {
        // end node not reached, return null or throw an error
        return null;
      }
      ret.push(endNode.id);
      return ret;
    }

    getNodeValue(nodeId, direction = 'target') {
      var node = nodesArray.find(n => n.id === nodeId);
      if (node) {
        if (direction === 'source' && node.sourceValue != undefined) {
        return node.value;
      } else {
        return node.targetValue || node.value;
      }
    } else {
      throw new Error('Invalid node ID');
    }
    }
    
    }