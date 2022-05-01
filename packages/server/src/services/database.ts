import * as fs from 'fs';

// let database = JSON.parse(fs.readFileSync("./data.json").toString())

export const get = () => {
  return JSON.parse(fs.readFileSync('./data.json').toString());
};

// export const set = (value) => {
//     database = value
//     fs.writeFileSync("./data.json", JSON.stringify(database))
// }

// export const postImage = (value) => {
//     console.log("postImage logger")
// }
