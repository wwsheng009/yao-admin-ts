import { Process } from "yao-node-client";
import { Add } from "./part1";
import { Sub } from "./part2";

export function main(a: number, b: number) {
  Add(a, b);
  console.log(Sub(a, b));

  console.log(Process("utils.str.Concat", "test", "cha"));

  let data = Process(
    "utils.map.delmany",
    { data: 1, age: 2, name: "test" },
    "number",
    "age"
  );
  console.log(data);

  let data2 = Process(
    "utils.map.del",
    { data: 1, age: 2, name: "test" },
    "number"
  );
  console.log(data2);

  let data3 = Process("utils.arr.indexes", [1, 2, 3, 4, 5, 6, 7]);
  console.log(data3);

  let pluck = {
    行业: {
      key: "city",
      value: "数量",
      items: [
        { city: "北京", 数量: 32 },
        { city: "上海", 数量: 20 },
      ],
    },
    计费: {
      key: "city",
      value: "计费种类",
      items: [
        { city: "北京", 计费种类: 6 },
        { city: "西安", 计费种类: 3 },
      ],
    },
  };
  let data4 = Process("utils.arr.Pluck", ["城市", "行业", "计费"], pluck);
  console.log(data4);

  let input = [
    { name: "阿里云计算有限公司", short_name: "阿里云" },
    { name: "世纪互联蓝云", short_name: "上海蓝云" },
  ];
  let data5 = Process("utils.arr.Split", input);
  console.log(JSON.stringify(data5));
}
main(1, 2);
