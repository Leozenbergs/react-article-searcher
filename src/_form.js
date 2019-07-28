import React, {Component} from 'react';
import './main.css';


class Form extends Component {

    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            pesquisa: ''
        }
    }
    
    handleSubmit = () => {
        console.log('teste');
    }

    render(){
        return (
            <div className="text-center mt-30">
                <form className="commentForm flex-center" onSubmit={this.handleSubmit}>
                    <input
                        className="main--input mr-15"
                        type="text"
                        placeholder="Pesquise aqui"
                        value={this.state.pesquisa}
                    />
                    <button className="main--button relative pointer" type="button">&#10148;</button>
                </form>
            </div>
            
        );
    }
    
}
export default Form;