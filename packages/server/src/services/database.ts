import * as fs from "fs"

let database = JSON.parse(fs.readFileSync("./data.json").toString())

console.log(database)

export const get = () => {
    return database
}

export const set = (value) => {
    database = value
    fs.writeFileSync("./data.json", JSON.stringify(database))
}