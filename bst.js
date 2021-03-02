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

    remove(key) {
        if (this.key == key){
            if(this.left && this.right) { // if it has both left and right children find minimum replace it with these values and call remove to delete the duplication later in the tree
                const successor = this.right._findMin()
                this.key = successor.key
                this.value = successor.value
                successor.remove(successor.key) 
            } else if (this.left) { //if node has only left child replace node with its left child
                this._replaceWith(this.left)
            } else if (this.right) { //same logic as above
                this._replaceWith(this.right)
            } else { //if node has no children remove and replace any refrences to it with null
                this._replaceWith(null)
            }
        } else if (key < this.key && this.left){
            this.left.remove(key)
        } else if (key > this.key && this.right){
            this.right.remove(key)
        } else {
            throw new Error ('Key Error')
        }
    }

    _replaceWith(node) { 
        if(this.parent) { //if the node you are replacing is a parent 
            if(this == this.parent.left) { //need to set refrences from the parent to the replacement node
                this.parent.left = node
            } else if (this == this.parent.right) {
                this.parent.right = node
            }
            if(node) { //and replacement node back to the parent
                node.parent = this.parent
            }
        } else { //otherwise it is just a root nofe then you copy over the properties of the replacement node
            if(node) {
                this.key = node.key
                this.value = node.value
                this.left = node.left
                this.right = node.right
            } else {
                this.key = null
                this.value = null
                this.left = null
                this.right = null
            }
        }
    }

    _findMin(){
        if(!this.left){
            return this
        }
        return this.left._findMin()
    }
}

function main(arr){
    const BST = new BinarySearchTree()

    for (let i = 0; i <arr.length; i++){
        BST.insert(arr[i])
    }
    console.log(BST)
}

main([3,1,4,6,9,2,5,7])