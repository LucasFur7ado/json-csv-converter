import fs from "fs"

const path = "./json-to-convert"
const convertedPath = "./csvs"

fs.readdir(path, (err, files) => {
    if (err) {
        console.log("Algo malió sal => ", err)
        return false
    }
    files.map(f => {
        fs.readFile(path + "/" + f, "utf-8", (error, data) => {
            const obj = JSON.parse(data)
            if (obj.length) {
                let newUrl = convertedPath + "/" + f.replace(".json", ".csv"),
                    entries = [], stringCols = ""
                if (error) {
                    console.log("Algo malió sal => ", error)
                    return false
                }
                const columns = Object.keys(obj[0])
                columns.map(c => stringCols += c.trim() + ",")
                stringCols = stringCols.slice(0, -1) + "\n"
                fs.writeFile(newUrl, stringCols, () => { return })
                obj.map(o => {
                    let stringRow = ""
                    columns.map(c => {
                        stringRow += o[c].trim() + ","
                    })
                    stringRow = stringRow.slice(0, -1) + "\n"
                    fs.appendFile(newUrl, stringRow, () => { return })
                })
                console.log("¡Convertido exitosamente!")
            }
        })
    })
})