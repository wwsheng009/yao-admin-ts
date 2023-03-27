import { Process } from "yao-node-client";

export function Sub(a: number, b: number) {
  console.log(Process("utils.str.Concat", "test1213", "xxxx"));
  return a - b;
}

function flat() {
  const data = [
    {
      id: 1,
      parent: 1,
      children: [{ children: [1, 2, 3], id: 5, parent: 1 }],
    },
    { id: 2, parent: 2, children: [4, 5, 6] },
    { id: 3, parent: 3, children: [7, 8, 9] },
  ];
  const option = { primary: "id", children: "children", parent: "parent" };

  console.log(Process("utils.tree.Flatten", data, option));
}
flat();
