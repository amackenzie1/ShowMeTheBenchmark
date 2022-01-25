import { CalculatorInfo } from "./header";
import predata from "./monthly_returns.json"


type Acronym = "CMR" | "XIC" | "XIU" | "XBB" | "XSB" | "XIN" | "XEM" | "XSP" | "XQQ" | "XRE"


type InvestmentData = {
    [key in Acronym]: Record<string, number>
}

let data: InvestmentData = predata as InvestmentData;


function getChange(start: string, end: string, key : Acronym): number {
    let lookup: Record<string, number> = data[key];
    let start_date = new Date(start);
    let end_date = new Date(end);
    let result = 1;
    //iterate through the keys of lookup 
    for (let key in lookup) {
        let temp_date = new Date(key);
        if (temp_date >= start_date && temp_date <= end_date) {
            result *= ((100 + lookup[key])/100);
        }
    }
    return result;
}


function calculate(investments: CalculatorInfo): number {
    let total = 0;
    total += investments.cash * getChange(investments.start, investments.end, "CMR");
    total += investments.canadian_equities * getChange(investments.start, investments.end, "XIC");
    total += investments.canadian_fixed_income * getChange(investments.start, investments.end, "XBB");
    total += investments.us_equities * getChange(investments.start, investments.end, "XSP");
    total += investments.emerging_markets * getChange(investments.start, investments.end, "XEM");
    total += investments.global_equities * getChange(investments.start, investments.end, "XIN");
    total += investments.real_estate * getChange(investments.start, investments.end, "XRE");
    let milliseconds = (new Date(investments.end)).getTime() - new Date(investments.start).getTime();
    let num_days = milliseconds / (1000 * 60 * 60 * 24);
    total += investments.fixed_income * (1 + investments.fixed_income_rate/100)**(num_days/365);
    total = total / 100;
    return Math.round((total - 1) * 10000) / 100;
}

export {calculate}