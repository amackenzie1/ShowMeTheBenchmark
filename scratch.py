from dateutil import parser
import json

def parse(x: str) -> str:
    result = parser.parse(x[1:-1])
    return str(result).split(" ")[0]

data = json.load(open("monthly_returns_cleaned.json"))

newdata = {}
for i in data:
    newdata[i] = {}
    for j in data[i]:
        newdata[i][parse(j)] = float(data[i][j]) if data[i][j] not in ["", "--"] else 0

json.dump(newdata, open("monthly_returns.json", "w"), indent=4)