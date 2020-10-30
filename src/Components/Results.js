import React, {useState} from 'react'
import ResultDie from './ResultDie.js'

class Results extends React.Component {

    constructor(props){
        super(props);
        
        this.state = {finalResults: [],
                        previousResults: []};
    }

    componentDidUpdate() {
        if (this.props.results === this.state.previousResults){
            return
        }
            

        this.setState((state,props) => ({
            finalResults: [],
            previousResults: this.props.results
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
                    previousResults: this.state.previousResults
                }))
            }
        }, 10);
    }


    displayResults(singleResultArray, i) {
      return <span key={i}> <ResultDie /> <span className="result"> {singleResultArray[0]}</span> </span>
    }
        

    render() {
        return <div>
               {this.state.finalResults.map(this.displayResults)} 
        </div>
    }
}


export default Results