### Procedure

Step 1: Choose an initiating node (eg. n) and place it in the OPEN list.
Step 2: In case the initiating node is empty, you must stop and return to failure.
Step 3: Eliminate the node from the OPEN list and place it on the CLOSE list. Here, the node is the lowest value of h(n), i.e., heuristic function.
Step 4: Expand the node and create its successor.
Step 5: Check each successor to see whether they are leading to the goal.
Step 6: If a successor node leads to the goal, you must return success and terminate the search process. Or continue with step 7.
Step 7: The algorithm analyzes every successor  for the evaluation function f(n). Later, it examines whether the nodes are in the OPEN or CLOSED list. In case they do not find the node in either list, it adds them to the OPEN list.
Step 8: Return to step 2 and iterate.
