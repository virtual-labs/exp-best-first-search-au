
<h3> Theory</h3>

<p>Best-First Search is an informed search algorithm that explores a search space by prioritizing nodes based on a heuristic evaluation function. It begins at the start node and selects the most promising node to explore next, guided by the heuristic estimate of each node's proximity to the goal. This process continues iteratively until the goal node is reached or no more nodes remain to explore. </p>

<h5>Best-First Search algorithm:</h5>
<ol>
<li>Initialization:</li>
<ul><li> Begin at the start node.</li>
</ul>
<li>Priority Queue:</li>
<ul><li>  a priority  store nodes yet to be explored, sorted based on some heuristic or evaluation function. The priority queue ensures that nodes closer to the goal are explored first..</li>
</ul>
<li>Expansion of Nodes:</li>
<ul><li>From the current node, expand to neighboring nodes.</li>
<li>Calculate the heuristic value  for each neighboring node. This heuristic estimates how close each node is to the goal.</li>
<li>Add neighboring nodes to the priority queue based on their heuristic values, with nodes closer to the goal having higher priority.</li>
</ul>
<li>Node Selection:</li>
<ul><li> Select the node with the highest priority from the priority queue. This node represents the most promising path towards the goal.</li>
</ul>
<li>Goal check</li>
<ul><li> Check if the selected node is the goal node. If it is, the search terminates, and the optimal path is found.</li>
</ul>
<li>Expansion and Iteration:</li>
<ul><li> If the selected node is not the goal</li>
<li>Expand the selected node by considering its neighboring nodes.</li>
<li>Calculate heuristic values for these neighboring nodes and add them to the priority queue.</li>
<li>Repeat steps 4-6 until the goal node is found or the priority queue becomes empty.</li>
</ul>

<li>Termination:</li>
<ul>
<li>If the priority queue becomes empty and the goal node is not found, the search terminates without finding a solution.</li>


