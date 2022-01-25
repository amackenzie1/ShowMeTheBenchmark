import React from 'react';
import './App.css';
import {CalculatorInfo} from "./header"
import {calculate} from "./calculator"

type FormProps = {

}

interface FormState extends CalculatorInfo {
  submitted: boolean
  three_months: number
  six_months: number
  one_year: number
  three_years: number
  five_years: number
  ten_years: number
  total_percentage: number
}

function getSum(state: FormState): number{
  let sum = state.cash + 
            state.canadian_fixed_income + 
            state.canadian_equities + 
            state.us_equities + 
            state.emerging_markets + 
            state.global_equities + 
            state.real_estate + 
            state.fixed_income
  return Math.round(sum)
}

class MyForm extends React.Component<FormProps, FormState> {
  constructor(props: FormProps){
    super(props);
    this.state = {
      cash: 100,
      canadian_equities: 0,
      canadian_fixed_income: 0,
      us_equities: 0,
      global_equities: 0,
      emerging_markets: 0,
      real_estate: 0,
      fixed_income: 0,
      fixed_income_rate: 0,
      submitted: false,
      three_months: 0,
      six_months: 0,
      one_year: 0,
      three_years: 0,
      five_years: 0,
      ten_years: 0,
      total_percentage: 0
    }
  }
  render(){
    return (
      <div>
        {this.state.submitted && (this.state.total_percentage === 100 ? 
          <div className="OutputForm"> 
            <p style={{gridColumnStart: 2}}>3 Months:</p>
            <p style={{}}><u>{this.state.three_months}%</u></p>
            <p style={{}}>6 Months:</p>
            <p style={{}}><u>{this.state.six_months}%</u></p>
            <p style={{}}>1 Year:</p>
            <p style={{}}><u>{this.state.one_year}%</u></p>
            <p style={{gridColumnStart: 2}}>3 Years:</p>
            <p style={{}}><u>{this.state.three_years}%</u></p>
            <p style={{}}>5 Years:</p>
            <p style={{}}><u>{this.state.five_years}%</u></p>
            <p style={{}}>10 Years:</p>
            <p style={{}}><u>{this.state.ten_years}%</u></p>
          </div>
            :
            <p style={{color: "#ff66cc"}}>
            <i>Error: the percentages you entered add up to {this.state.total_percentage}%. <br/> You might want to double check and verify they add up to 100%.</i>
            </p>
        )}
        <p><br/></p>
        <div className='InputForm'>
          <p>Cash [CMR]:</p>
          <input value={this.state.cash} onChange={(e) => this.setState({cash: parseFloat(e.target.value) || 0})}/>
          <p>Can. Equities [XIC]:</p>
          <input value={this.state.canadian_equities} onChange={(e) => this.setState({canadian_equities: parseFloat(e.target.value) || 0})}/>
          <p>Can. Fixed Income [XBB]:</p>
          <input value={this.state.canadian_fixed_income} onChange={(e) => this.setState({canadian_fixed_income: parseFloat(e.target.value) || 0})}/>
          <p>US Equities [XSP]:</p>
          <input value={this.state.us_equities} onChange={(e) => this.setState({us_equities: parseFloat(e.target.value) || 0})}/>
          <p>Emerging Markets [XEM]:</p>
          <input value={this.state.emerging_markets} onChange={(e) => this.setState({emerging_markets: parseFloat(e.target.value) || 0})}/>   
          <p>Global Equities [XIN]:</p>
          <input value={this.state.global_equities} onChange={(e) => this.setState({global_equities: parseFloat(e.target.value) || 0})}/>
          <p>Real Estate [XRE]:</p>
          <input value={this.state.real_estate} onChange={(e) => this.setState({real_estate: parseFloat(e.target.value) || 0})}/>
          <p style={{"color": 'violet'}}>Total allocated: </p>
          <p style={{"color": 'white'}}><u>{
            getSum(this.state)
          }%</u></p>
        </div>
        <p/>
        <div className='InputForm'> 
          <p style={{"color": "#f6bcf6", "gridColumnStart": 2}}>Fixed Income:</p>
          <input value={this.state.fixed_income} onChange={(e) => this.setState({fixed_income: parseFloat(e.target.value) || 0})}/>
          <p style={{"color": "#f6bcf6", "gridColumnStart": 2}}>Rate:</p>
          <input value={this.state.fixed_income_rate} onChange={(e) => this.setState({fixed_income_rate: parseFloat(e.target.value) || 0})}/>
        </div>
        <p></p>
        <button onClick={() => this.setState({submitted: true, 
          three_months: calculate(this.state, "2021-10-01", "2022-01-01"),
          six_months: calculate(this.state, "2021-07-01", "2022-01-01"),
          one_year: calculate(this.state, "2021-01-01", "2022-01-01"),
          three_years: calculate(this.state, "2019-01-01", "2022-01-01"),
          five_years: calculate(this.state, "2017-01-01", "2022-01-01"),
          ten_years: calculate(this.state, "2012-01-01", "2022-01-01"),
          total_percentage: getSum(this.state)})}>Submit</button>
        <p>{/*JSON.stringify(this.state)*/}</p>
      </div>
    )
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <MyForm/>
        </div>
      </header>
    </div>
  );
}

export default App;
