import React, {Component} from 'react';




class   SeccionPruebas extends Component {

    contador = 0;
   /*   constructor(props){
         super(props);
         this.state={
             contador:0
         };
     } */

     state={
        contador:0
    }
     HolaMundo(nombre){
        var  presentacion= <h2>Hola soy {nombre}</h2>;
        return presentacion;
      };
      sumar=(e)=>{
        //this.contador++;
        //this.state.contador++;
        this.setState({
            contador: (this.state.contador+1)
        });
      }
      restar=(e)=>{
        //this.contador--;
        // this.state.contador--;
        this.setState({
            contador: (this.state.contador-1)
        });
      }
    render(){
        var nombre= "Rodrigo Sancho";
 
        return(
            <section id="content">
              
             <h2 className="subheader">Funciones JSX básico</h2>
               
                {this.HolaMundo(nombre)}

                <h2 className="subheader">Componente</h2>
                <section className="componentes">
                   
                   
                </section>
                <h2 className="subheader">Estado</h2>
                <p>
                Constador:{this.state.contador}
                </p>
                <p>
                    <input type="button" value="sumar" onClick={this.sumar.bind(this)}></input>
                    <input type="button" value="restar" onClick={this.restar}></input>

                </p>
                

            </section>
        );
    }
}

export default SeccionPruebas; 