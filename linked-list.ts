import { Nullable } from "./types.ts";
import Node from "./node.ts";

export default class LinkedList<T> {
  private head: Nullable<Node<T>>;
  private tail: Nullable<Node<T>>;
  private isInitialized: boolean;

  /**
   * throws unless the index is in [0, length)
   */
  private checkValidIndex(idx: number) {
    if (idx < 0 || idx > this.length - 1) {
      throw new Error(`index ${idx} invalid or out of range`);
    }
  }

  /**
   * get the node at the given index
   */
  private nodeIndexAt(idx: number): Node<T> {
    let cur = this.head, i = 0;
    for (; i !== idx; ++i, cur = cur!.next);
    return cur!;
  }

  /**
   * increment the list
   */
  private increment() {
    ++this.length;
    return this;
  }

  /**
   * decrement the list
   */
  private decrement() {
    --this.length;
    return this;
  }

  /**
   * create a new LinkedList
   */
  public constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
    this.isInitialized = false;
  }

  /**
   * length of the list
   */
  public length: number;

  /**
   * add the value to the end of the list
   * @param value the value to append
   * @returns this
   */
  public append(value: T) {
    const next = new Node(value);
    if (!this.isInitialized) {
      this.head = next;
      this.tail = next;
      this.isInitialized = true;
    } else {
      this.tail!.next = next;
      this.tail = next;
    }
    return this.increment();
  }

  /**
   * inserts the value at the given index
   * if the list looks like a -> b -> c and we insert d at index 1
   * then the list will now look like a -> d -> b -> c
   * @param idx
   * @param value
   * @returns this
   */
  public insertAt(idx: number, value: T) {
    this.checkValidIndex(idx);
    const next = new Node(value);
    if (idx === 0) {
      next.next = this.head;
      this.head = next;
    } else {
      const prev = this.nodeIndexAt(idx - 1);
      next.next = prev.next;
      prev.next = next;
    }
    return this.increment();
  }

  /**
   * clears the list
   * @returns this
   */
  public clear() {
    this.head = null;
    this.tail = null;
    this.length = 0;
    this.isInitialized = false;
    return this;
  }

  /**
   * deletes the value at the provided index
   * @param idx
   * @returns this
   */
  public remove(idx: number) {
    this.checkValidIndex(idx);
    if (this.length === 1) {
      return this.clear();
    }
    if (idx === 0) {
      this.head = this.head!.next;
    } else {
      const prev = this.nodeIndexAt(idx - 1);
      prev.next = prev.next?.next || null;
      // if tail, fix the tail
      if (idx === this.length - 1) {
        this.tail = prev;
      }
    }
    return this.decrement();
  }

  /**
   * get the value at the provided index
   * @param idx
   * @returns the value at the provided index
   * @throws error on invalid index
   */
  public get(idx: number) {
    this.checkValidIndex(idx);
    const { value } = this.nodeIndexAt(idx);
    return value;
  }

  /**
   * sets the provided index to the provided value
   * @param idx 
   * @param value
   */
  public set(idx: number, value: T) {
    this.checkValidIndex(idx);
    const node = this.nodeIndexAt(idx);
    node.value = value;
    return this;
  }

  /**
   * add a list to the end of this list
   * @param linkedList
   * @returns this
   */
  public concat(linkedList: LinkedList<T>) {
    if (!linkedList.isInitialized) {
      return this;
    }
    this.tail = linkedList.head;
    this.length += linkedList.length;
  }

  public *[Symbol.iterator]() {
    if (!this.isInitialized) {
      return;
    }
    let cur = this.head;
    for (; cur !== null; cur = cur.next) {
      yield cur.value;
    }
  }

  public static from<T>(iterable: Iterable<T>) {
    const linkedList = new LinkedList<T>();
    for (const it of iterable) {
      linkedList.append(it);
    }
    return linkedList;
  }
}
