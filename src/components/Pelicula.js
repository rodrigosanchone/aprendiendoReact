import React,{Component} from 'react';
import {Link} from 'react-router-dom';



class Pelicula extends Component {
    marcar= ()=>{
          this.props.marcarFavorita(this.props.pelicula, this.props.indice);
    }
    render(){
     // const pelicula = this.props.pelicula;  
      const{
          titulo,
          año,
          img
      } = this.props.pelicula;

      return(
          <article className="article-item" id="article-template">
             <div className="image-wrap">
                <img src={img} alt={titulo}/>
             </div>
             <h2>{titulo}</h2>
             <span className="date">
                 {año}
             </span>
             <Link to="/blog">Ir al blog</Link>
             <button onClick={this.marcar}>
                 Marcar como favorita
             </button>
             <div className="clearfix"></div>
          </article>
      )
    }
}

export default Pelicula;