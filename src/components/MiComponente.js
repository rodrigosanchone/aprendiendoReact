import React,{Component} from 'react';
/* import { findRenderedDOMComponentWithClass } from 'react-dom/test-utils'; */


class MiComponente extends Component {
     
    render(){
       let receta ={
           nombre: 'Pizza',
           ingredientes: ['tomate','queso','jamon'],
           categoria: 400
       };

        return (
            <div className="micomponente">
                 <h1>{receta.nombre}</h1>
                  <h2>{'Calorías'+ receta.categoria} </h2>
                  <ol>
                  {
                       receta.ingredientes.map((ingrediente,i)=>{
                         console.log(ingrediente);
                         return(
                             <li key={i}>{ingrediente}</li>
                         )
                       })
                   }
                  </ol>
                    {this.props.saludo &&
                      <React.Fragment>
                          <h1>DESDE UNA PROP:</h1>
                          <h3>{this.props.saludo}</h3>
                      </React.Fragment>

                    }
                  <hr/>
            </div>
           
        )
    }
}

export default MiComponente;