import React from 'react';
import './App.css';
import {CalculatorInfo} from "./header"
import {calculate} from "./calculator"

type FormProps = {

}

interface FormState extends CalculatorInfo {
  submitted: boolean
  calculated: number
  total_percentage: number
}

function getSum(state: FormState): number{
  let sum = state.cash + 
            state.canadian_div + 
            state.canadian_equities + 
            state.canadian_growth + 
            state.emerging + 
            state.int + 
            state.reits + 
            state.fixed_income + 
            state.world +
            state.us +
            state.us_tech + 
            state.scotia_hedge_fund 
  return Math.round(sum)
}

class MyForm extends React.Component<FormProps, FormState> {
  constructor(props: FormProps){
    super(props);
    let today = new Date().toISOString().split("T")[0];
    let one_year_back = new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString().split("T")[0];
    this.state = {
      cash: 100,
      canadian_equities: 0,
      canadian_div: 0,
      canadian_growth: 0,
      us: 0,
      int: 0,
      world: 0,
      us_tech: 0,
      scotia_hedge_fund: 0,
      emerging: 0,
      reits: 0,
      fixed_income: 0,
      fixed_income_rate: 0,
      start: one_year_back,
      end: today,
      submitted: false,
      calculated: 0,
      total_percentage: 0
    }
  }
  render(){
    return (
      <div>
        {this.state.submitted && (this.state.total_percentage === 100 ? 
            <p>
            Investment return: <u>{this.state.calculated}%</u>
            </p>
            :
            <p style={{color: "#ff355e"}}>
            <i>Error: the percentages you entered add up to {this.state.total_percentage}%. <br/> Consider changing them to add up to 100%?</i>
            </p>
        )}
        <div className='InputForm'>
          <p style={{"color": "black", "gridColumnStart": 2}}>Start Date:</p>
          <input type="date" value={this.state.start} onChange={(e) => this.setState({start: e.target.value})}/>
          <p style={{"color": "black", "gridColumnStart": 2}}>End Date:</p>
          <input type="date" value={this.state.end} onChange={(e) => this.setState({end: e.target.value})}/>
        </div>
        <p/>
        <div className='InputForm'>
          <p>Cash:</p>
          <input value={this.state.cash} onChange={(e) => this.setState({cash: parseFloat(e.target.value) || 0})}/>
          <p>Canadian Equities:</p>
          <input value={this.state.canadian_equities} onChange={(e) => this.setState({canadian_equities: parseFloat(e.target.value) || 0})}/>
          <p>Canadian Dividend:</p>
          <input value={this.state.canadian_div} onChange={(e) => this.setState({canadian_div: parseFloat(e.target.value) || 0})}/>
          <p>Canadian Growth:</p>
          <input value={this.state.canadian_growth} onChange={(e) => this.setState({canadian_growth: parseFloat(e.target.value) || 0})}/>
          <p>US:</p>
          <input value={this.state.us} onChange={(e) => this.setState({us: parseFloat(e.target.value) || 0})}/>
          <p>International:</p>
          <input value={this.state.int} onChange={(e) => this.setState({int: parseFloat(e.target.value) || 0})}/>   
          <p>World:</p>
          <input value={this.state.world} onChange={(e) => this.setState({world: parseFloat(e.target.value) || 0})}/>
          <p>US Tech:</p>
          <input value={this.state.us_tech} onChange={(e) => this.setState({us_tech: parseFloat(e.target.value) || 0})}/>
          <p>REITs:</p>
          <input value={this.state.reits} onChange={(e) => this.setState({reits: parseFloat(e.target.value) || 0})}/>
          <p style={{"color": 'violet'}}>Total allocated: </p>
          <p style={{"color": 'white'}}><u>{
            getSum(this.state)
          }%</u></p>
        </div>
        <p/>
        <div className='InputForm'> 
          <p style={{"color": "pink", "gridColumnStart": 2}}>Fixed Income:</p>
          <input value={this.state.fixed_income} onChange={(e) => this.setState({fixed_income: parseFloat(e.target.value) || 0})}/>
          <p style={{"color": "pink", "gridColumnStart": 2}}>Fixed Income Rate:</p>
          <input value={this.state.fixed_income_rate} onChange={(e) => this.setState({fixed_income_rate: parseFloat(e.target.value) || 0})}/>
        </div>
        <p></p>
        <button onClick={() => this.setState({submitted: true, calculated: calculate(this.state), total_percentage: getSum(this.state)})}>Submit</button>
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
