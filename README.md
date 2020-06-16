# Basic Linked List

## Basic Usage Example

    import LinkedList from "https://deno.land/x/deno_linked_list/master/mod.ts";

    const  list = new LinkedList();
    list.append("hello").append("world");
    console.log(list.get(0), list.get(1)); // hello world
    list.insertAt(1, "foo");
    console.log(list.get(0), list.get(1), list.get(2)); // hello foo world
    list.remove(2);
    console.log(list.get(0), list.get(1)); // hello foo

## Api

### length

Get the length of the linked list

### append(t:T)

Add a new item to the end of the list

### insertAt(idx: number, t:T)

Inserts the value at the provided index. The value which was already at that index is moved forward.

### clear()

Clears the list.

### remove(idx: number)

Removes the value at the provided index.

### get(idx: number)

Get the value at the provided index.

### set(idx: number, t:T)

Set the value at the provided index

### concat(linkedList: LinkedList<T>)

Adds a list to the end of the list.

### *[Symbol.iterator]

Iterate the list in a `for-of`, destructure, etc.

### static from<T>(iterable: Iterable<T>)

Create a new Linked List from an iterable.
