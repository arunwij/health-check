function Queue(maxSize = null) {
  this.MAX_SIZE = 100000;
  this.elements = [];

  if (maxSize) {
    this.MAX_SIZE = maxSize;
  }
}

Queue.prototype.size = function () {
  return this.elements.length;
};

Queue.prototype.enqueue = function (e) {
  if (this.size() < this.MAX_SIZE) {
    this.elements.push(e);
  } else {
    this.dequeue();
    this.enqueue(e);
  }
};

Queue.prototype.dequeue = function (e) {
  const element = this.elements.shift();
  return element;
};

Queue.prototype.isEmpty = function () {
  return this.elements.length == 0;
};

Queue.prototype.peek = function () {
  return this.isEmpty() ? undefined : this.elements[0];
};

Queue.prototype.traverseBackward = function (recordCount, callback = (f) => f) {
  if (!this.isEmpty()) {
    for (
      let i = this.elements.length - 1;
      i > this.elements.length - recordCount - 1;
      i--
    ) {
      const item = this.elements[i];
      callback(item);
    }
  }
};

Queue.prototype.getContents = function () {
  return this.elements;
};

module.exports = Queue;
