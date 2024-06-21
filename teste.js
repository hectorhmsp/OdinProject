class HashMap {
    constructor(initialCapacity = 8) {
      this.buckets = new Array(initialCapacity).fill(null).map(() => []);
      this.size = 0;
    }

    // Hash function
    hash(key) {
      let hashCode = 0;
      const primeNumber = 31;
      for (let i = 0; i < key.length; i++) {
        hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.buckets.length;
      }
      return hashCode;
    }
  
    // Set a key-value pair
    set(key, value) {
      const index = this.hash(key);
      const bucket = this.buckets[index];
      const existingIndex = bucket.findIndex(item => item[0] === key);
  
      if (existingIndex >= 0) {
        bucket[existingIndex][1] = value;
      } else {
        bucket.push([key, value]);
        this.size++;
      }
  
      if (this.size / this.buckets.length > 0.7) {
        this.resize();
      }
    }
  
    // Get the value for a key
    get(key) {
      const index = this.hash(key);
      const bucket = this.buckets[index];
      const item = bucket.find(item => item[0] === key);
  
      return item ? item[1] : null;
    }
  
    // Check if the key exists
    has(key) {
      const index = this.hash(key);
      const bucket = this.buckets[index];
      return bucket.some(item => item[0] === key);
    }
  
    // Remove a key-value pair
    remove(key) {
      const index = this.hash(key);
      const bucket = this.buckets[index];
      const itemIndex = bucket.findIndex(item => item[0] === key);
  
      if (itemIndex >= 0) {
        bucket.splice(itemIndex, 1);
        this.size--;
        return true;
      }
      return false;
    }
  
    // Get the number of stored keys
    length() {
      return this.size;
    }
  
    // Clear the hash map
    clear() {
      this.buckets = new Array(this.buckets.length).fill(null).map(() => []);
      this.size = 0;
    }
  
    // Get all keys
    keys() {
      return this.buckets.flat().map(item => item[0]);
    }
  
    // Get all values
    values() {
      return this.buckets.flat().map(item => item[1]);
    }
  
    // Get all entries
    entries() {
      return this.buckets.flat();
    }
  
    // Resize the buckets array when load factor exceeds 0.7
    resize() {
      const newBuckets = new Array(this.buckets.length * 2).fill(null).map(() => []);
      const oldBuckets = this.buckets;
      this.buckets = newBuckets;
      this.size = 0;
  
      oldBuckets.flat().forEach(([key, value]) => {
        this.set(key, value);
      });
    }
  }  