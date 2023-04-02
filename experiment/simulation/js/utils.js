import Graph from './Graph.js';
import User from './user.js';


export const dataArray = [];
export const nodesArray = [];
console.log(nodesArray,'nodesArray');
export const edgesArray = [];
console.log(edgesArray,'edgesArray');
export const nodesrandom = [];
console.log(nodesrandom,'nodesrandom');
export const edgesrandom = [];
console.log(edgesrandom,'edgesrandom');

// Create a new Graph instance
const graph = new Graph();
const user = new User();
let flag = 0;

var canvas = document.getElementById('mynetwork');
// var ctx = canvas.getContext('2d');
var operations = document.getElementById('operations');
export var startingNode = document.getElementById('start-node');
export var endingNode = document.getElementById('end-node');


let isUndirected = false;


const clearCanvas = document.getElementById("clearCanvas");
clearCanvas.addEventListener("click", function() {
  location.reload();
});


// random generation of nodes and edges

const generateButton = document.getElementById("generate");
generateButton.addEventListener("click", function() {
  const numNodes = parseInt(document.getElementById("numNodes").value);

  if (!numNodes || numNodes < 1 || numNodes > 30) { 
    // Check if numNodes is not entered or less than 1 or greater than 26
    alert("Please enter a number between 1 and 30."); 
    // Display an alert message if numNodes is invalid
    return;
  }


  let labels = 1;
  nodesrandom.length = 0; // clear nodesrandom array
  edgesrandom.length = 0; // clear edgesrandom array

  // generate nodes
  for (let i = 0; i < numNodes; i++) {
    const label = String.fromCharCode("A".charCodeAt(0) + i);
    nodesrandom.push({id: i+1, label: label, x: Math.random()*500, y: Math.random()*500});
  }

  // generate edges
  for (let i = 0; i < numNodes; i++) {
    for (let j = i+1; j < numNodes; j++) {
      // generate a random number between 0 and 1
      const rand = Math.random();
      if (rand < 0.5) {
        const from = i+1;
        const to = j+1;
        edgesrandom.push({id: labels, from: from, to: to});
        labels++;
        flag = 1;
      }
    }
  }

  const canvas = document.getElementById("mynetwork");
  const data = {
    nodes: nodesrandom,
    edges: edgesrandom
  };
  const options = {
    physics: { enabled: false },
    edges: {
      smooth: false
    }
  };

  if (isUndirected) {
    options.edges = { arrows: { to: { enabled: false }, from: { enabled: false } } };
  } else {
    options.edges = { arrows: { to: { enabled: true }, from: { enabled: false } } };
  }
  console.log("hy");
  const network = new vis.Network(canvas, data, options);
});

const undirectedRadio = document.getElementById("undirectedRadio");
undirectedRadio.addEventListener("click", function() {
  if (!isUndirected) {
    console.log("undirected");
    options.edges.arrows.to.enabled = false;
    options.edges.arrows.from.enabled = false;
    isUndirected = true;
    this.checked = true;
    directedRadio.checked = false;
    // redraw the network with new options
    const canvas = document.getElementById("mynetwork");
    // const options = canvas.getOptions();
    options.edges = { arrows: { to: { enabled: false }, from: { enabled: false } } };
    // canvas.setOptions(options);
  }
});

const directedRadio = document.getElementById("directedRadio");
directedRadio.addEventListener("click", function() {
  if (isUndirected) {
    console.log("directed");
    options.edges.arrows.to.enabled = true;
    options.edges.arrows.from.enabled = false;
    isUndirected = false;
    this.checked = true;
    undirectedRadio.checked = false;
    // redraw the network with new options
    const canvas = document.getElementById("mynetwork");
    const options = canvas.getOptions();
    options.edges = { arrows: { to: { enabled: true }, from: { enabled: false } } };
    canvas.setOptions(options);
  }
});

  
document.addEventListener("DOMContentLoaded", () => {
  const randomRadio = document.getElementById("randomRadio");
  const customRadio = document.getElementById("customRadio");
  const numNodesLabel = document.getElementById("numNodes").previousElementSibling;
  const generateButton = document.getElementById("generate");
  const infoText = "Double click to add a NODE. click on a node as a start node and click on another node as an end node to draw EDGE.";
  const infoDiv = document.getElementById("info");

  customRadio.addEventListener("change", () => {
    if (customRadio.checked) {
      numNodesLabel.style.display = "none";
      generateButton.style.display = "none";
      document.getElementById("numNodes").style.display = "none";
      infoDiv.textContent = infoText;
      infoDiv.style.display = "block"; // add this line to show the info text
    }
  });

  randomRadio.addEventListener("change", () => {
    if (randomRadio.checked) {
      numNodesLabel.style.display = "block";
      generateButton.style.display = "block";
      document.getElementById("numNodes").style.display = "block";
      infoDiv.style.display = "none";
    }
  });
});


// create an array with nodes // define edgesArray to store created edges

var nodes = new vis.DataSet(nodesArray);
var edges = new vis.DataSet(edgesArray);

export {nodes,edges};


// create a network
var container = document.getElementById("mynetwork");
var data = {
  nodes: nodes,
  edges: edges,
};
var options = {
  nodes: {
    fixed: {
      x: false,
      y: false
    },
    font: {
      size: 20
    },
    shape: "circle",
    borderWidth: 2,
    color: {
      border: "#2B7CE9"
    },
    font: {
      color: "#343434"
    },
    scaling: {
      label: true
    }
  },
  edges: {
    font: {
      size: 14,
      align: "middle"
    },
    labelHighlightBold: true,
    color: {
      inherit: false
    },
    width: 2,
    arrows: {
      to: { enabled: false, scaleFactor: 1, type: "arrow" },
      middle: { enabled: false, scaleFactor: 1, type: "arrow" },
      from: { enabled: false, scaleFactor: 1, type: "arrow" },
    },
    smooth: false,
    label: "",
  },
  interaction: {
    dragNodes: false,
  },
}; 



var network = new vis.Network(container, data, options);

// Add event listener for double click to create a new node
network.on("doubleClick", function (params) {
  if (params.nodes.length === 0 && params.edges.length === 0) {
    var newNodeId = nodes.get().length + 1;
    var newNodeLabel = String.fromCharCode(64 + newNodeId);
    console.log("create nodes")

    // Add new node
    var newNode = {
      id: newNodeId,
      label: newNodeLabel,
      x: params.pointer.canvas.x,
      y: params.pointer.canvas.y,
      fixed: {
        x: true,
        y: true
      },
      physics: false,
    };
    // Update the nodes dataset in the Graph instance
    graph.nodes = nodes;
    nodes.add(newNode);
  }
  nodesArray.push(newNode);
}

);


var selectedNode = null; // variable to store the selected node ID

// Add event listener for click to select a node
network.on("click", function (params) {
  if (params.nodes.length > 0) {
    if (selectedNode === null) {
      // if no node is currently selected, set the clicked node as the selected node
      selectedNode = params.nodes[0];
    } else {
      // if a node is already selected, create an edge between the two nodes and reset the selected node
      var fromNode = selectedNode;
      var toNode = params.nodes[0];

      // Add new edge
      var arrow = "to";
      if (document.getElementById("directedRadio").checked) {
        arrow = "to";
      } else if (document.getElementById("undirectedRadio").checked) {
        arrow = " ";
      }
      
      // var label = window.prompt("Enter a label for the new edge:");
      var newEdge = {
        from: fromNode,
        to: toNode,
        // label: label,
        arrows: arrow
      };
      
      edges.add(newEdge); // add the new edge to the DataSet
      edgesArray.push(newEdge); // add the new edge to the edgesArray
      
      selectedNode = null;
    }
  }
});
    

// Create an interval to display an operation
function createInterval(array, operation, color,endNode) {
  var className = "BestFirstSearch-p";
  var i = 0;
  var path = '';
  var nodeIds = [];

  const interval = setInterval(() => {
      if (i == array.length - 1) {
          clearInterval(interval);
          path += ' ' + endNode.label;
          var updatedData = updateDataSet(nodeIds, color);
          updateOptions(updatedData);
          return;
      }
      // Remove the last element with classname = ${operation}-p
      if (i > 0) {
          var selectList = document.querySelectorAll('.' + className);
          operations.removeChild(selectList[selectList.length - 1]);
      }
      // modify path variable by concatenating node.label instead of node.id
      const node = nodesArray.find(node => node.id === array[i]);
      if (node) {
        path += ' ' + node.label;
      }

      // Display operation
      var msg = `Best First Search Path: <span class ="highlight"> ${path}</span>`;
      showOperation(msg, className);

      // Add node to nodeIds array
      nodeIds.push(array[i]);

      // increment i to get next node in the list
      i += 1;
  }, 1000);
}



// Create an interval to display a randomly created graph operation
function createIntervalrandom(array, operation, color,endNode) {
  var className = "BestFirstSearch-p";
  var i = 0;
  var path = '';
  var nodeIds = [];

  const interval = setInterval(() => {
      if (i == array.length - 1) {
          clearInterval(interval);
          path += ' ' + endNode.label;
          var updatedData = updateDataSet(nodeIds, color);
          updateOptions(updatedData);
          return;
      }
      // Remove the last element with classname = ${operation}-p
      if (i > 0) {
          var selectList = document.querySelectorAll('.' + className);
          operations.removeChild(selectList[selectList.length - 1]);
      }
      // modify path variable by concatenating node.label instead of node.id
      const node = nodesrandom.find(node => node.id === array[i]);
      if (node) {
        path += ' ' + node.label;
      }

      // Display operation
      var msg = `Best First Search Path: <span class ="highlight"> ${path}</span>`;
      showOperation(msg, className);

      // Add node to nodeIds array
      nodeIds.push(array[i]);

      // increment i to get next node in the list
      i += 1;
  }, 1000);
}

function updateDataSet(nodeIds, color) {
  var updatedNodes = [];
  var nodes = updatedNodes.get();
  for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      var updatedNode = Object.assign({}, node);
      if (nodeIds.includes(node.id)) {
          updatedNode.color = color;
          // modify updatedNode.label to match node.label
          updatedNode.label = node.label; 
      }
      updatedNodes.push(updatedNode);
  }
  var updatedData = { nodes: updatedNodes, edges: edgesArray.get() };
  updatedNodes.update(updatedNodes);
  return updatedData;
}

function updateOptions(data) {
  var updatedOptions = Object.assign({}, options);
  updatedOptions.nodes = Object.assign({}, options.nodes);
  updatedOptions.nodes.color = { background: '#97C2FC', border: '#2B7CE9' };
  updatedOptions.physics = { enabled: true };
  network.setOptions(updatedOptions);
  network.setData(data);
}

//code for show table while clicking on the Add heuristic Button
var tableButton = document.getElementById('tableButton');
tableButton.addEventListener('click',() => {
  if (flag == 1) {
    var index1 = nodesrandom.findIndex((j) => {
      return j.label == startingNode.value;
    });
    var index2 = nodesrandom.findIndex((j) => {
      return j.label == endingNode.value;
    });
  
    if (index1 == -1 && index2 == -1) {
      var msg = `Error: Starting Node and Ending Node are not in the Graph`;
      console.log("here");
      showOperation(msg);
      return;
    } else if (index1 == -1) {
      var msg = `Error: Starting Node is not in the Graph`;
      console.log("here");
      showOperation(msg);
      return;
    } else if (index2 == -1) {
      var msg = `Error: Ending Node is not in the Graph`;
      console.log("here");
      showOperation(msg);
      return;
    }
    console.log("yalala");

    var startNode = nodesrandom[index1];
    var endNode = nodesrandom[index2];

    for(let i = 0; i < nodesrandom.length; i++){
      var table = document.getElementById('table');
      const newRow = document.createElement("tr");
      const newData = document.createElement("td");
      const newData2 = document.createElement('td');
      if (endNode) {
        newData.textContent = `${nodesrandom[i].label} --> ${endNode.label}`;
        console.log(endNode.label,"end node label");
      } else {
        newData.textContent = nodesrandom[i].label;
        console.log("else anu vannathu")
      }

      newData2.textContent = Math.floor(Math.random() * 30) + 1;
      newRow.appendChild(newData);
      newRow.appendChild(newData2);
      table.appendChild(newRow);
      
      // Get a reference to the submit button
      var submitButton = document.getElementById('submit');
      submitButton.addEventListener('click', function() {
        // Create an object with nodeLabel and h(n) properties
        var data = {
          nodeLabel: nodesrandom[i].label,
          value: newData2.textContent,
        };
        dataArray.push(data); // Push the object to the array
        console.log(dataArray);
        nodesrandom[i].value = newData2.textContent;
      });
    }
  } 
  else{
    var index1 = nodesArray.findIndex((j) => {
      return j.label == startingNode.value;
    });
    var index2 = nodesArray.findIndex((j) => {
      return j.label == endingNode.value;
    });

  if (index1 == -1 && index2 == -1) {
    var msg = `Error: Starting Node and Ending Node are not in the Graph`;
    console.log("here");
    showOperation(msg);
    return;
  } else if (index1 == -1) {
    var msg = `Error: Starting Node is not in the Graph`;
    console.log("here");
    showOperation(msg);
    return;
  } else if (index2 == -1) {
    var msg = `Error: Ending Node is not in the Graph`;
    console.log("here");
    showOperation(msg);
    return;
  }
  console.log("hayaha");
  
  var startNode = nodesArray[index1];
  var endNode = nodesArray[index2];
  console.log(endNode,"endNode");



  for(let i = 0; i < nodesArray.length; i++){
    var table = document.getElementById('table');
    const newRow = document.createElement("tr");
    const newData = document.createElement("td");
    const newData2 = document.createElement('td');
    if (endNode) {
      console.log(endNode.label,"end node label");
      newData.textContent = `${nodesArray[i].label} --> ${endNode.label}`;
    } else {
      newData.textContent = nodesArray[i].label;
      console.log("else anu vannathu")
    }

    newData2.setAttribute('contentEditable',true);
    newRow.appendChild(newData);
    newRow.appendChild(newData2);
    table.appendChild(newRow);
    
    // Get a reference to the submit button
    var submitButton = document.getElementById('submit');
    submitButton.addEventListener('click', function() {
      // Create an object with nodeLabel and h(n) properties
      var data = {
        nodeLabel: nodesArray[i].label,
        value: newData2.textContent,
      };
      dataArray.push(data); // Push the object to the array
      console.log(dataArray);
      nodesArray[i].value = newData2.textContent;
    });
  }


   console.log(nodesArray,"balalallala");

}})


var bestFirstSearchButton = document.getElementById('bestFirstSearchButton');

// Event listener for Best First Search button click
bestFirstSearchButton.addEventListener('click', () => {

  let nodes;

  // Check which button is selected
  if (flag == 1) {
    nodes = nodesrandom;

    var index1 = nodesrandom.findIndex((j) => {
      return j.label == startingNode.value;
    });
    var index2 = nodesrandom.findIndex((j) => {
      return j.label == endingNode.value;
    });
  
    if (index1 == -1 && index2 == -1) {
      var msg = `Error: Starting Node and Ending Node are not in the Graph`;
      console.log("here");
      showOperation(msg);
      return;
    } else if (index1 == -1) {
      var msg = `Error: Starting Node is not in the Graph`;
      console.log("here");
      showOperation(msg);
      return;
    } else if (index2 == -1) {
      var msg = `Error: Ending Node is not in the Graph`;
      console.log("here");
      showOperation(msg);
      return;
    }
    


    console.log(nodesrandom[index1],'starting node value');
    console.log(nodesrandom[index2],'ending node value');
  
    var startNode = nodesrandom[index1];
    var endNode = nodesrandom[index2];

    console.log(startNode,'starting node');
    console.log(endNode,'ending node');
    var bestFirstSearchPath = user.bestFirstSearchrandom(startNode, endNode, nodesrandom,edgesrandom);
    console.log(endNode.id, 'end node id');
  
    if (bestFirstSearchPath[bestFirstSearchPath.length - 1] !== endNode.id) {
      console.log(bestFirstSearchPath[bestFirstSearchPath.length - 1], 'last node id');
      console.log(endNode.nodeId, 'end node id');
      var msg = `Best First Search Path: No Solution`;
      showOperation(msg);
      return;
    }
  
    createIntervalrandom(bestFirstSearchPath, 'bestFirstSearchrandom', 'green');


  } else {
    nodes = nodesArray;
    edges = edgesArray;

    var index1 = nodesArray.findIndex((j) => {
      return j.label == startingNode.value;
    });
    var index2 = nodesArray.findIndex((j) => {
      return j.label == endingNode.value;
    });
  
    if (index1 == -1 && index2 == -1) {
      var msg = `Error: Starting Node and Ending Node are not in the Graph`;
      console.log("here");
      showOperation(msg);
      return;
    } else if (index1 == -1) {
      var msg = `Error: Starting Node is not in the Graph`;
      console.log("here");
      showOperation(msg);
      return;
    } else if (index2 == -1) {
      var msg = `Error: Ending Node is not in the Graph`;
      console.log("here");
      showOperation(msg);
      return;
    }
    
    console.log(nodesArray[index1],'starting node value');
    console.log(nodesArray[index2],'ending node value');
  
  
    var startNode = nodesArray[index1];
    var endNode = nodesArray[index2];
  
    console.log(startNode,'starting node');
    console.log(endNode,'ending node');
    var bestFirstSearchPath = graph.bestFirstSearch(startNode, endNode, nodesArray,edgesArray);
    console.log(endNode.id, 'end node id');
  
  
    if (nodesArray.find(node => node.id === bestFirstSearchPath[bestFirstSearchPath.length - 1]).label !== endNode.label) {
      console.log((nodesArray.find(node => node.id === bestFirstSearchPath[bestFirstSearchPath.length - 1]).label), 'last node label');
      console.log(endNode.label, 'end node label');
      var msg = `Best First Search Path: No Solution`;
      showOperation(msg);
      return;
    }
    
    
  
    createInterval(bestFirstSearchPath, 'BestFirstSearch', 'green');


  } 
});


// Display the operation in side panel
function showOperation(message, classname = 'msg-p') {
	const p = document.createElement('p');
	p.classList.add(classname);
	p.innerHTML = message;
	operations.appendChild(p);
	autoScrollDown();
}

function cleanSlate() {
	g = new Graph();
	nodes = [];
	varNodeName = 'A';
}

function autoScrollDown() {
	operations.scrollTop = operations.scrollHeight;
}

export {
	showOperation,
	cleanSlate,
};
