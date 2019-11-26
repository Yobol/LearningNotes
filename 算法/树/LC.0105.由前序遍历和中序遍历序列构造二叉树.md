# []()

## 题目描述

## 解题思路

### 个人AC

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
class Solution {
    public TreeNode buildTree(int[] preorder, int[] inorder) {
        return preorder.length == 0 || inorder.length == 0 ? null : 
            buildTree(preorder, 0, preorder.length - 1, inorder, 0, inorder.length - 1);
    }

    private TreeNode buildTree(int[] preorder, int pL, int pR, int[] inorder, int iL, int iR) {
        if (pL > pR || iL > iR) return null;
        // 首先将preorder的首元素作为树的根节点
        TreeNode root = new TreeNode(preorder[pL]);
        // 然后在inorder中定位到根节点的下标，可以使用HashMap优化时间复杂度
        int i;
        for (i = iL; i <= iR; i++) {
            if (inorder[i] == root.val) break;
        }
        // 左右子树的大小
        int leftLen = i - iL, righteLen = iR - i;
        root.left = buildTree(preorder, pL + 1, pL + leftLen, inorder, iL, iL + leftLen - 1);
        root.right = buildTree(preorder, pL + leftLen + 1, pR, inorder, i + 1, iR);
        return root;
    }
}
```

时间复杂度： $O(n^2)$，使用`HashMap`后可降为$O(n)$；

空间复杂度： $O(1)$，使用`HashMap`后将升为$O(n)$。

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
class Solution {

    public TreeNode buildTree(int[] preorder, int[] inorder) {
        int preLen = preorder.length, inLen = inorder.length;
        if (preLen == 0 || inLen == 0 || preLen != inLen) return null;

        HashMap<Integer, Integer> map = new HashMap() {{
            for (int i = 0; i < inLen; i++) {
                this.put(inorder[i], i);
            }
        }};

        return buildTree(preorder, 0, preLen - 1, inorder, 0, inLen - 1, map);
    }

    private TreeNode buildTree(int[] preorder, int pL, int pR, 
        int[] inorder, int iL, int iR, HashMap<Integer, Integer> map
    ) {
        if (pL > pR || iL > iR) return null;
        // 首先将preorder的首元素作为树的根节点
        TreeNode root = new TreeNode(preorder[pL]);
        // 然后在inorder中定位到根节点的下标，可以使用HashMap优化时间复杂度
        int i = map.get(root.val);
        // 左右子树的大小
        int leftLen = i - iL, righteLen = iR - i;
        root.left = buildTree(preorder, pL + 1, pL + leftLen, inorder, iL, iL + leftLen - 1, map);
        root.right = buildTree(preorder, pL + leftLen + 1, pR, inorder, i + 1, iR, map);
        return root;
    }
}
```

### 最优解

同上。