class PriorityQueue {
    constructor() {
        this.queue = [];
    }

    enqueue(song, priority) {
        this.queue.push({ song, priority });
        this.queue.sort((a, b) => b.priority - a.priority);
    }

    dequeue() {
        return this.queue.shift() || null;
    }

    mostrar() {
        return this.queue.map(item => item.song);
    }

    isEmpty() {
        return this.queue.length === 0;
    }

    remove(index) {
        this.queue.splice(index, 1);
    }
    
}

export default PriorityQueue;