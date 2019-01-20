
import {Subject}from 'rxjs'
import { debounceTime } from 'rxjs/operators';

const input$=new Subject()

class Input extends React.PureComponent{

    componentDidMount(){
input$.pipe(
    debounceTime(500)
).subscribe(
    this.callApi()
)

callApi(){
    return fetch('..')
    .then(stuff=>{
        this.setState(stuff)
    })
}

    }
    render(){
        return <input value={this.state.value} onChange={()=>
            this.setState({input},input$.onNext)
        }/>
    }
}