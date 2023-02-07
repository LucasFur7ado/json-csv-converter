import fs from "fs"

const path = "./csv-to-convert"
const convertedPath = "./jsons"

fs.readdir(path, (err, files) => {
    if (err) {
        console.log("Algo malió sal => ", err)
        return false
    }
    files.map(f => {
        fs.readFile(path + "/" + f, "utf-8", (error, data) => {
            let newUrl = convertedPath + "/" + f.replace(".csv", ".json"),
                entries = []
            if (error) {
                console.log("Algo malió sal => ", error)
                return false
            }
            const rawData = data.split("\n")
            const columns = rawData[0].replace("\r", "").split(",")
            let newObj = {}
            rawData.pop()
            rawData.map((r, i) => {
                if (i) {
                    let newData = r.replace("\r", "").split(",")
                    columns.map((c, index) => {
                        newObj[c] = newData[index].trim()
                    })
                    entries.push({ ...newObj })
                }
            })
            fs.writeFile(newUrl,
                JSON.stringify(entries, null, "\t"),
                () => console.log("¡Convertido exitosamente!"))
        })
    })
})