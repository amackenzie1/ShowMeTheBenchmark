import { CalculatorInfo } from "./header";
import predata from "./stock_market.json"


type Info = "date" | "open" | "high" | "low" | "close" | "adj_close" | "volume"
type Acronym = "CDZ" | "IGM" | "XBB" | "XCG" | "XIC" | "XIN" | "XIU" | "XRE" | "XSP" | "XWD"

type InvestmentRecord = {
    [key in Info]: string
}

type InvestmentData = {
    [key in Acronym]: Record<string, InvestmentRecord>
}

let data: InvestmentData = predata as InvestmentData;

function get_abbreviation(x: string): Acronym | null{
    if (x === "canadian_equities"){
        return "XIC"
    } else if (x === "canadian_div"){
        return "CDZ"
    } else if (x === "canadian_growth"){
        return "XCG"
    } else if (x === "us"){
        return "XSP"
    } else if (x === "int"){
        return "XIN"
    } else if (x === "world"){
        return "XWD"
    } else if (x === "us_tech"){
        return "IGM"
    } else if (x === "reits"){
        return "XRE"
    } else {
        return null
    }
}

function dateIndex(date: string, lookup: Record<string, InvestmentRecord>){
    let counter = 0;
    while (!(date in lookup) && counter < 50){
        let one_back = new Date(date)
        one_back.setDate(one_back.getDate() - 1);
        date = one_back.toISOString().split("T")[0];
        counter += 1
    }
    return lookup[date]
}

function getChange(start: string, end: string, abbreviation: Acronym): number {
    try {
        let start_money = parseFloat(dateIndex(start, data[abbreviation])["close"]);
        let end_money = parseFloat(dateIndex(end, data[abbreviation])["close"]);
        return 1 + (end_money - start_money) / start_money;
    } catch {
        console.log("Error in getChange" + start + " " + end + " " + abbreviation);
    }
    return 1
}

function calculate(investments: CalculatorInfo): number {
    let total = 0;
    total += investments.cash;
    total += investments.canadian_equities * getChange(investments.start, investments.end, "XIC");
    total += investments.canadian_div * getChange(investments.start, investments.end, "CDZ");
    total += investments.canadian_growth * getChange(investments.start, investments.end, "XCG");
    total += investments.us * getChange(investments.start, investments.end, "XSP");
    total += investments.int * getChange(investments.start, investments.end, "XIN");
    total += investments.world * getChange(investments.start, investments.end, "XWD");
    total += investments.us_tech * getChange(investments.start, investments.end, "IGM");
    total += investments.reits * getChange(investments.start, investments.end, "XRE");
    let milliseconds = (new Date(investments.end)).getTime() - new Date(investments.start).getTime();
    let num_days = milliseconds / (1000 * 60 * 60 * 24);
    total += investments.fixed_income * (1 + investments.fixed_income_rate/100)**(num_days/365);
    total = total / 100;
    let yearly = total ** (365/num_days);
    return Math.round((yearly - 1) * 1000) / 10;
}

export {calculate}