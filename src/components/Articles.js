import React, { Component } from "react";
import {Link} from  'react-router-dom';
import Moment from 'react-moment';
import axios from 'axios';
import Global from '../Global';
import 'moment/locale/es';

class Articles extends Component {
    
    url = Global.url;
    state ={
        articles:[],
        status: null
    };

    componentDidMount(){// cargamelo antes de mostrar algo de la pag
      var home =  this.props.home
      var search = this.props.Search; 
      if(home==="true"){
         this.getLastArticles();
      }else if(search && search !== null && search !==undefined){
        this.getArticlesBySearch(search);
      } else{
        this.getArticles();
      }
     
    }

    getLastArticles= ()=>{
        axios.get(this.url+"articles/last")
         .then(res=>{
             this.setState({
                 articles: res.data.articles,
                 status:'success'
             });
            
         });
    }

    getArticlesBySearch= (searched)=>{
        axios.get(this.url+"search/"+searched)
         .then(res=>{
          
             this.setState({
                 articles: res.data.articles,
                 status:'success'
             });

             console.log(this.state);
           
        })
         .catch(err=>{
             this.setState({
                 articles:[],
                 status:"success"
             })
         })
        ;
    } 

   getArticles= ()=>{
       axios.get(this.url+"articles")
        .then(res=>{
            this.setState({
                articles: res.data.articles,
                status:'success'
            });
            console.log(this.state);
        });
   }
    render() {
        if(this.state.articles.length>=1){
            var listArticles = this.state.articles.map((article)=>{
                return(
                  <article key={article._id} className="article-item" id="article-template">
                      <div className="image-wrap">
                          {
                              article.image !== null ? (
                                <img src={this.url+'get-image/'+article.image} alt={article.title}></img>
                              ):(
                                <img src="https://images.unsplash.com/photo-1621570070356-b77aa8bf71b0?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt={article.title}></img>
                              )
                          }
                        
                      </div>
                      <h2>{article.title}</h2>
                      <span className="date">
                          <Moment locale="es" fromNow>{article.date}</Moment>
                          
                      </span>
                      <Link  to={'/blog/articulo/'+article._id}>Leer más</Link>
                      <div className="clearfix"></div>
                  </article>
                )
            });
            return (
                <div id="articles">
                   {listArticles}
                </div>
            );
        }else if(this.state.articles.length===0 && this.state.status==='success'){
            return (
                <div id="articles">
                    <h2 className="subheader">Aún no hay articulos para mostrar</h2>
                </div>
            ); 
        }else{
          return(
              <div id="articles">
                  <h2 className="subheader">Cargando</h2>
                  <p>Espere un momento...</p>
              </div>
          );
        }
     
    }
}

export default Articles;