import React, {Component} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import './main.css';
import Container from '@material-ui/core/Container';


export default class Favoritos extends Component{
    constructor(props){
        super(props);
        this.removeItem = this.removeItem.bind(this);
        this.state = {
            items: []
        }
    }

    removeItem(e){
        let text = e.target.innerHTML;
        localStorage.removeItem(text);
        this.forceUpdate();
    }



    render(){
        return (
            <React.Fragment>
                <CssBaseline />
                <Container maxWidth="md">
                    <h2 className="text-center">Favorites</h2>
                    <hr className="titleLine" />
                    <div id="results">
                        {(!Object.keys(localStorage).length>0)?
                            <h3 className="text-center">Nenhum favorito adicionado</h3>
                        :
                            ''
                        }
                        <ol>
                            {Object.keys(localStorage).map(each=>
                                <li className="text-center result--item" onClick={this.removeItem}>{each}</li>       
                            )}
                        </ol>
                    </div>
                </Container>
            </React.Fragment>
        );
    }
    
}