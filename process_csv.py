import json 
import os 


def parse_csv(x: str) -> dict[str, dict]:
    """
    Parse a csv file into a list of dictionaries.
    """
    keys = [i.lower().replace(" ", "_") for i in x.split("\n")[0].split(",")]
    data = x.split("\n")[1:]
    result = {}
    for i in data:
        if "null" in i:
            continue
        date = i.split(",")[0]
        result[date] = {k: v for k, v in zip(keys, i.split(","))}
    return result

result = {}
for file in os.listdir("stock_market"):
    if ".csv" not in file:
        continue
    contents = open("stock_market/" + file, "r").read()
    name = file.split(".")[0]
    result[name] = parse_csv(contents)

json.dump(result, open("src/stock_market.json", "w"), indent=4)