import fs from "fs"

const path = "./json-to-convert"
const convertedPath = "./csvs"
const getColumnsString = (cols) => {
    let stringCols = ""
    cols.map(c => stringCols += c.trim() + ",")
    stringCols = stringCols.slice(0, -1) + "\n"
    return stringCols
}

fs.readdir(path, (err, files) => {
    if (err) {
        console.log("Algo malió sal => ", err)
        return false
    }
    files.map(f => {
        fs.readFile(path + "/" + f, "utf-8", (error, data) => {
            const obj = JSON.parse(data)
            if (obj.length || typeof obj == 'object') {
                let newUrl = convertedPath + "/" + f.replace(".json", ".csv")
                if (error) {
                    console.log("Algo malió sal => ", error)
                    return false
                }
                const columns = Object.keys(obj.length ? obj[0] : obj)
                fs.writeFile(newUrl, getColumnsString(columns), () => { return })
                if (obj.length)
                    obj.map(o => {
                        let stringRow = ""
                        columns.map(c => stringRow += o[c] + ",")
                        stringRow = stringRow.slice(0, -1) + "\n"
                        fs.appendFile(newUrl, stringRow, () => { return })
                    })
                else {
                    let stringRow = ""
                    columns.map(c => stringRow += (obj[c] + ","))
                    stringRow = stringRow.slice(0, -1) + "\n"
                    fs.appendFile(newUrl, stringRow, () => { return })
                }
                console.log("¡Convertido exitosamente!")
            }
        })
    })
})