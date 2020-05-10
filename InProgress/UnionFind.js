/*
Description:
    * Synonymous with Disjoint set 
    * Let's say you've given a lot of edges, and there is a cycle. How would you know?
    * The algorithm works by creating a bunch of sets and then it goeso ver all the edges
    and finds the sets in which both the vertices lie, if they lie in the same set then there is a cycle.
    if not we merge both the sets and move onto the next edge.


Uses:
    * Used to keep track of a set of elements partitioed among disjoint non-overlapping sets.
    * Used for Krusko's Algorithms to find minimum spanning tree in a graph
    * Also used to detect cycles in a graph
    * Only works on undirected graphs, no self loops

Documentation: 

Functions:
    Name | Time
        * desc

*/