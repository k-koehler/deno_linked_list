import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std/testing/asserts.ts";
import LinkedList from "./mod.ts";

Deno.test("should throw an error, index out of range (too low)", () => {
  const list = new LinkedList<string>();
  assertThrows(() => list.get(-1));
});

Deno.test("should throw an error, index out of range (not initialized)", () => {
  const list = new LinkedList<string>();
  assertThrows(() => list.get(0));
});

Deno.test("inserting an element works", () => {
  const list = new LinkedList<string>().append("hello");
  assertEquals(list.get(0), "hello");
});

Deno.test("should throw an error, index out of range (too high)", () => {
  const list = new LinkedList<number>();
  for (let i = 0; i < 10; ++i) {
    list.append(i);
  }
  assertEquals(list.get(9), 9);
  assertThrows(() => list.get(10));
});

Deno.test("append adds the element to the end of the list", () => {
  const list = new LinkedList<string>().append("hello").append("world");
  assertEquals(list.get(0), "hello");
  assertEquals(list.get(1), "world");
});

Deno.test("sets an index", () => {
  const list = new LinkedList<string>().append("hello");
  assertEquals(list.get(0), "hello");
  list.set(0, "world");
  assertEquals(list.get(0), "world");
});

Deno.test("inserts head", () => {
  const list = new LinkedList<string>().append("a").insertAt(0, "b");
  assertEquals(list.get(0), "b");
  assertEquals(list.get(1), "a");
});

Deno.test("inserts middle", () => {
  const list = new LinkedList<string>().append("a").append("b").append("c")
    .append("d").append("e").insertAt(2, "f");
  assertEquals(list.get(0), "a");
  assertEquals(list.get(1), "b");
  assertEquals(list.get(2), "f");
  assertEquals(list.get(3), "c");
  assertEquals(list.get(4), "d");
  assertEquals(list.get(5), "e");
});

Deno.test("removes head", () => {
  const list = new LinkedList<string>().append("a");
  assertEquals(list.get(0), "a");
  list.remove(0);
  assertEquals(list.length, 0);
  assertThrows(() => list.get(0));
});

Deno.test("removes middle", () => {
  const list = new LinkedList<string>().append("a").append("b").append("c")
    .append("d").append("e").remove(2);
  assertEquals(list.get(0), "a");
  assertEquals(list.get(1), "b");
  assertEquals(list.get(2), "d");
  assertEquals(list.get(3), "e");
});

Deno.test("removes tail", () => {
  const list = new LinkedList<string>().append("a").append("b").append("c")
    .append("d").append("e").remove(4);
  assertEquals(list.get(0), "a");
  assertEquals(list.get(1), "b");
  assertEquals(list.get(2), "c");
  assertEquals(list.get(3), "d");
});

Deno.test("removes tail, then appends", () => {
  const list = new LinkedList<string>().append("a")
    .append("b")
    .append("c")
    .append("d")
    .append("e")
    .remove(4)
    .append("e");
  assertEquals(list.get(0), "a");
  assertEquals(list.get(1), "b");
  assertEquals(list.get(2), "c");
  assertEquals(list.get(3), "d");
  assertEquals(list.get(4), "e");
});

Deno.test("clears the list", () => {
  const list = new LinkedList().append(1).append(2);
  assertEquals(list.length, 2);
  list.clear();
  assertEquals(list.length, 0);
  assertThrows(() => list.get(0));
});

Deno.test("clears the list, then appends", () => {
  const list = new LinkedList().append(1).append(2);
  assertEquals(list.length, 2);
  list.clear();
  assertEquals(list.length, 0);
  list.append(3).append(4);
  assertEquals(list.get(0), 3);
  assertEquals(list.get(1), 4);
});

Deno.test("can destucture the list", () => {
  const list = new LinkedList().append(1).append(2);
  const [one, two] = list;
  assertEquals(one, 1);
  assertEquals(two, 2);
});

Deno.test("creates an list from an iterable, such as an array", () => {
  const arr = [1, 2, 3, 4];
  const [one, two, three, four] = LinkedList.from(arr);
  assertEquals(one, 1);
  assertEquals(two, 2);
  assertEquals(three, 3);
  assertEquals(four, 4);
});

Deno.test("concats another list", () => {
  const list = LinkedList.from([1, 2, 3]);
  list.concat(LinkedList.from([4, 5, 6]));
  assertEquals(list.length, 6);
  let i = 0;
  for (const item of list) {
    assertEquals(++i, item);
  }
});
