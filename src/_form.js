import React, {Component} from 'react';
import './main.css';
import axios from 'axios';
import Pagination from "react-js-pagination";

// https://core.ac.uk:443/api-v2/search/city?page=1&pageSize=15&apiKey=f2W8igzCQvP6V0cpnGAh73uEb5tFNKrY



class Form extends Component {

    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleFavs = this.handleFavs.bind(this);
        this.state = {
            result: [],
            activePage: 1,
            page: [],
            fav: []
        }
    }

    handlePageChange(pageNumber, itemsPerPage) {  
        let item = this.state.result;
        let mult = (parseInt(pageNumber)*itemsPerPage)-itemsPerPage;
        this.setState({
            activePage: pageNumber,
            page: item.slice(mult, itemsPerPage)
        });
        this.forceUpdate();
    }

    handleFavs (e, id, title){
        if(!e.target.classList.contains('active')){ 
            e.target.classList.add('active');
            localStorage.setItem(id, title);
        }else{ 
            e.target.classList.remove('active');
            localStorage.removeItem(id);
        }
        
    }
    
    handleSubmit = () => {
        try{
            this.setState({result: []});
            let res = [];
            let query = document.getElementById('query').value;
            axios.get(`https://core.ac.uk:443/api-v2/search/${query}?page=1&pageSize=15&apiKey=f2W8igzCQvP6V0cpnGAh73uEb5tFNKrY`)
            .then((response) => {
                response.data.data.forEach((each)=> {
                    res.push({id: each._source.id, title: each._source.title, author: each._source.authors, type: each._type, description: each._source.description, urls: each._source.urls});                
                });
                this.setState({
                    result: res
                });

                let aux = [];
                Object.keys(localStorage).map(each=>{
                    aux.push(each);
                });
                this.setState({
                    fav: aux
                });

                this.state.result.map((each, i)=>{
                    if(each.title == this.state.fav[i]){
                        document.querySelector('.result--item').classList.add('active');
                    }
                });

            } );

            

        }catch(e){
            console.log(e)
        }
        
        
    }


    render(){
        // if(this.state.page.length > 0){
        //     let page = this.state.page;
        //     this.state.result = page;
        // }
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
                        <li className="text-left result--item" onClick={(e) => this.handleFavs(e, each.title, each.title)} key={each.id}>
                            <div className="fav r15 float-right relative t0"><i class="far fa-heart"></i></div>
                            <b>Title:</b><span className="title">{each.title}</span><br/>
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
                            {/* <Pagination
                                activePage={this.state.activePage}
                                itemsCountPerPage={5}
                                totalItemsCount={100}
                                pageRangeDisplayed={2}
                                onChange={(e)=>this.handlePageChange(e, 5)}
                            /> */}
                            
                        </div>
                        : ''
                    }
                    
                </div>
                
            </div>
            
        );
    }
    
}
export default Form;