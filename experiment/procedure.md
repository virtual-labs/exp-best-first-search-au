### Procedure

1. Create two empty lists

2. Start from the initial node and add it to the ordered open list

3. Next the below steps are repeated until the final node or endpoint is reached

4. If the open list is empty exit the loop and return a False statement which says that the final node cannot be reached

5. Select the top node in the open list and move it to the closed list while keeping track of the parent node

6. If the node removed is the endpoint node return a True statement meaning a path has been found and moving the node to the closed list

7. However if it is not the endpoint node then list down all the neighboring nodes of it and add them to the open list

8. According to the evaluation function re order the nodes.
