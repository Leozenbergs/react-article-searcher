import React, {Component} from 'react';
import './main.css';
import axios from 'axios';

// https://core.ac.uk:443/api-v2/search/city?page=1&pageSize=10&apiKey=f2W8igzCQvP6V0cpnGAh73uEb5tFNKrY



class Form extends Component {

    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            pesquisa: '',
            result: []
        }
    }
    
    handleSubmit = () => {
        let res = [];
        this.setState({pesquisa: document.getElementById('query').value}); 
        axios.get(`https://core.ac.uk:443/api-v2/search/${this.pesquisa}?page=1&pageSize=10&apiKey=f2W8igzCQvP6V0cpnGAh73uEb5tFNKrY`)
        .then((response) => {
            response.data.data.forEach((each)=> {
                console.log(each);
                res.push({id: each._source.id,titulo: each._source.title, autor: each._source.authors});                
            });
            this.setState({
                result: res
            });
            // console.log(this.state.result);

        } );
        
    }

    render(){
        

        return (
            <div className="text-center mt-30">
                <form className="commentForm flex-center" >
                    <input
                        id="query"
                        className="main--input mr-15"
                        type="text"
                        placeholder="Search"
                    />
                    <button className="main--button relative pointer" onClick={this.handleSubmit} type="button">&#10148;</button>
                </form>
                <div id="results">
                    <ol>
                    {this.state.result.map((each, index)=>
                        <li key={index}>
                            {each.titulo}
                        </li>
                    )}
                    </ol>
                </div>
                
            </div>
            
        );
    }
    
}
export default Form;