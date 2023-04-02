## Aim of the experiment


By constantly selecting the most promising next node based on some heuristic evaluation function, best-first search aims to identify the best route from a beginning node to a goal node in a search space.
A heuristic function that calculates the distance between each node and the goal node is used to evaluate the nodes in the search space during best-first search. Next is the expansion of the node with the shortest predicted distance. Until the goal node is achieved or there are no more nodes left to expand, this process is repeated.
Because it gives priority to nodes that are more likely to lead to the target, best-first search has the key advantage of being more time and memory efficient than breadth-first search. Unfortunately, it does not always guarantee that the best answer will be found because it could get bogged down in a less-than-ideal path.