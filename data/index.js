const fs = require("fs")

const { parse } = require("csv-parse")

const companies = []

fs.createReadStream(__dirname + "/Fortune_1000.csv")
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", function (row) {
    // console.log(row)
    companies.push(row[0])
  })
  .on("end", function () {
    console.log("finished")
    console.log(companies)
    fs.writeFileSync(__dirname + "/companies.json", JSON.stringify(companies, null))
  })
  .on("error", function (error) {
    console.log(error.message)
  })
