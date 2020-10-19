import AVLTree from '@/tree/avl-tree/AVLTree';

describe('AVL tree', () => {
    let tree: AVLTree<number>;
    test("initialization", () => {
        tree = new AVLTree();
        expect(tree.root).toBeNull();
        expect(tree).toBeInstanceOf(AVLTree);
    });
    test('insert', () => {
        tree.insert(3);
        tree.insert(2);
        tree.insert(1);
        expect(tree.root!.element).toBe(2);
        expect(tree.root!.left!.element).toBe(1);
        expect(tree.root!.right!.element).toBe(3);
        tree.insert(4);
        tree.insert(5);
        expect(tree.root!.element).toBe(2);
        expect(tree.root!.right!.element).toBe(4);
        expect(tree.root!.left!.element).toBe(1);
        tree.insert(6);
        expect(tree.root!.element).toBe(4);
        expect(tree.root!.left!.element).toBe(2);
        expect(tree.root!.right!.element).toBe(5);
        tree.insert(7);
        tree.insert(16);
        tree.insert(15);
        expect(tree.root!.right!.right!.element).toBe(15);
        expect(tree.root!.right!.right!.left!.element).toBe(7);
        expect(tree.root!.right!.right!.right!.element).toBe(16);
    });
    test('find', () => {
        expect(tree.find(4)!.height).toBe(3);
        expect(tree.find(2)!.height).toBe(1);
        expect(tree.find(1)!.height).toBe(0);
        expect(tree.find(3)!.height).toBe(0);
        expect(tree.find(6)!.height).toBe(2);
        expect(tree.find(5)!.height).toBe(0);
        expect(tree.find(15)!.height).toBe(1);
        expect(tree.find(7)!.height).toBe(0);
        expect(tree.find(16)!.height).toBe(0);
    })
})