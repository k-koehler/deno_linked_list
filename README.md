# Basic Linked List

## Basic Usage Example

    import LinkedList from "https://raw.githubusercontent.com/k-koehler/deno_linked_list/master/mod.ts";

    const  list = new LinkedList();
    list.append("hello").append("world");
    console.log(list.get(0), list.get(1)); // hello world
    list.insertAt(1, "foo");
    console.log(list.get(0), list.get(1), list.get(2)); // hello foo world
    list.remove(2);
    console.log(list.get(0), list.get(1)); // hello foo
