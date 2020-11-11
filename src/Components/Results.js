import React from 'react'
import ResultDie from './ResultDie.js'

class Results extends React.Component {

    constructor(props){
        super(props);
        
        this.state = {finalResults: [],
                        previousResults: [],
                        total: null};

        
    }

    componentDidUpdate() {
        if (this.props.results === this.state.previousResults){
            return
        }
            

        this.setState((state,props) => ({
            finalResults: [],
            previousResults: this.props.results,
            total: this.props.results.reduce( (sum, currentResult) => currentResult[1] + sum , 0)
        }));

        
        this.delayer = setInterval(() => {
            if (JSON.stringify(this.state.previousResults) === JSON.stringify(this.state.finalResults))
                {
                    clearInterval(this.delayer)
                }
            else {
                let next = this.props.results[this.state.finalResults.length]
                let newArray = JSON.parse(JSON.stringify(this.state.finalResults))
                newArray.push(next)
                this.setState((state, props) => ({
                    finalResults: newArray,
                    previousResults: this.state.previousResults,
                    total: newArray.reduce( (total, currentResult) => currentResult[1] + total , 0)
                }))
            }
        }, 10);
    }


    displayResults(singleResultArray, i, array) {
      return <span key={i} className="resultContainer"> <span className="result"> {singleResultArray[0] > 20 ? "20!" : singleResultArray[0]} </span>
                     <ResultDie />   <span className="result damageResult"> {" " + String(singleResultArray[1]) + (i === array.length -1 ? "=  " : "+  ")} </span>  </span>
    }



        

    render() {
        return <span> 
               {this.state.finalResults.map(this.displayResults)} 
                {this.state.finalResults.length > 0 ? 
                <span className="damageTotal"> <div> {""} </div> <span className="result">{this.state.total} </span> </span> : ""} 
        </span>
    }
}


export default Results