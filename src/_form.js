import React, {Component} from 'react';
import './main.css';
import axios from 'axios';
import Link from 'react-router-dom/Link'

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
                res.push({id: each._source.id, title: each._source.title, author: each._source.authors, type: each._type, description: each._source.description, urls: each._source.urls});                
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
                    {this.state.result.map((each)=>
                        <li className="text-left" key={each.id}>
                            <b>Title:</b>{each.title}<br/>
                            <b>Description:</b>{each.description}<br/>
                            <b>Authors:</b>{each.author}<br/>
                            <b>Type:</b>{each.type}<br/>
                            <ul>
                                {each.urls.map(url => 
                                    <li><a className="listLink" key={url} href={url}><p>{url}</p></a></li>
                                )}
                            </ul>
                        </li>
                    )}
                    </ol>
                </div>
                
            </div>
            
        );
    }
    
}
export default Form;