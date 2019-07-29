import React, {Component} from 'react';
import './main.css';
import axios from 'axios';
import Pagination from "react-js-pagination";

// https://core.ac.uk:443/api-v2/search/city?page=1&pageSize=10&apiKey=f2W8igzCQvP6V0cpnGAh73uEb5tFNKrY



class Form extends Component {

    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.state = {
            pesquisa: '',
            result: [],
            activePage: 1
        }
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});
    }

    setPagination = () => {
        console.log('teste');
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
                        <li className="text-left result--item" key={each.id}>
                            <div className="fav r15 float-right relative t15"><i class="far fa-heart"></i></div>
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
                    {this.state.result.length > 0?
                        <div>                       
                            <hr />
                            <Pagination
                                activePage={this.state.activePage}
                                itemsCountPerPage={5}
                                totalItemsCount={this.state.result.length}
                                pageRangeDisplayed={1}
                                onChange={this.handlePageChange}
                            />
                            
                        </div>
                        : ''
                    }
                    
                </div>
                
            </div>
            
        );
    }
    
}
export default Form;