class BinarySearchTree {
    constructor(key = null, value = null, parent = null){
        this.key = key // if null tree is empty
        this.value = value
        this.parent = parent //if parent null then this is the root node
        this.left = null //ptr to left child
        this.right = null //ptr to right?
    }


    insert(key, value){
        if(this.key == null){// if the tree is empty then the key being inserted is the root nod of the tree
            this.key = key
            this.value = value
        } else if (key < this.key) { 
            if(this.left == null){ //if the existing node does not have left child, instantiate and insert the new node as the left child passing this as the parent
                this.left = new BinarySearchTree(key, value, this)
            } else { //if the left child exists recursively call the insert method and try again, moving further down the node with ever call back to the insert fxn
                this.left.insert(key, value)
            } 
        } else {
            if(this.right == null) { //same logic as the left node
                this.right = new BinarySearchTree(key, value, this)
            } else {
                this.right.insert(key,value)
            }
        }
    }

    find(key){
        if(this.key == key){ //if item is found at the root then return the value
            return this.value
        } else if (key < this.key && this.left) { //if item is less than the root then follow the left child and then recursively check again if it is the left or right child until the firts condition is fulfilled
            return this.left.find(key)
        } else if (key > this.key && this.righ) {
            return this.right.find(key)
        } else { //entire tree has been serched and the key was not found
            throw new Error('Key Error')
        }
    }
}