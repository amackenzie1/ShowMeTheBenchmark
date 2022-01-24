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
    let today = new Date().toISOString().split("T")[0];
    let one_year_back = new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString().split("T")[0];
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
            <p style={{color: "#ff66cc"}}>
            <i>Error: the percentages you entered add up to {this.state.total_percentage}%. <br/> You might want to double check and verify they add up to 100%.</i>
            </p>
        )}
        <div className='InputForm'>
          <p style={{"color": "white", "gridColumnStart": 2}}>Start Date:</p>
          <input type="date" value={this.state.start} onChange={(e) => this.setState({start: e.target.value})}/>
          <p style={{"color": "white", "gridColumnStart": 2}}>End Date:</p>
          <input type="date" value={this.state.end} onChange={(e) => this.setState({end: e.target.value})}/>
        </div>
        <p/>
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
          <p style={{"color": "pink", "gridColumnStart": 2}}>Fixed Income:</p>
          <input value={this.state.fixed_income} onChange={(e) => this.setState({fixed_income: parseFloat(e.target.value) || 0})}/>
          <p style={{"color": "pink", "gridColumnStart": 2}}>Rate:</p>
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
