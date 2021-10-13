import React, { Component } from 'react';
import {  Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Global from '../Global';
import Sidebar from './Sidebar';
import Moment  from 'react-moment';
import  'moment/locale/es';
import swal from 'sweetalert';
class Article extends Component {

    url = Global.url;

    state = {
        article: false,
        status: null
    };

    componentDidMount() {
        this.getArticle();
    }

    getArticle = () => {
        var id = this.props.match.params.id;

        axios.get(this.url + 'article/' + id)
            .then(res => {
                this.setState({
                    article: res.data.article,
                    status: 'success'
                });
            })
            .catch(err=>{
                this.setState({
                    article:false,
                    status:"success"
                });
            });
    }

    deleteArticle = (id) =>{
       //alert("Articulo borrado " + id );

       swal({
        title:"Esta seguro de que desea borrar el articulo",
        text:"Una vez borrado no podra recuperar la información",
        icon:"warning",
        buttons: true,
        dangerMode: true,
       })
        .then((willDelete)=>{
            if(willDelete){
                axios.delete(this.url + 'article/' + id)
                .then(res=>{
                    this.setState({
                       article:res.data.article,
                       status:"delete"
                    });
                  
                })
                swal("El articulo ha sido borrado",{
                    icon:"success",
                });
            }else{  
                swal('El archivo no sera borrado');
            }
        });

      /*  axios.delete(this.url + 'article/' + id)
         .then(res=>{
             this.setState({
                article:res.data.article,
                status:"delete"
             });
           
         }) */
    }
    render() {
        if(this.state.status==='delete'){
            return <Redirect to="/blog"></Redirect>
        }
        var article = this.state.article;
        return (
            <div className="center">
                <section id="content">
                    {
                        this.state.article &&
                        <article className="article-item article-detail">


                            <div className="image-wrap">
                            {
                              article.image !== null ? (
                                <img src={this.url+'get-image/'+article.image} alt={article.title}></img>
                              ):(
                                <img src="https://images.unsplash.com/photo-1621570070356-b77aa8bf71b0?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt={article.title}></img>
                              )
                          }
                            </div>

                            <h1 className="subheader">{article.title}</h1>
                            <p>{article.content}</p>
                            <span className="date">
                                <Moment locale="es" fromNow>{article.date}</Moment>
                            </span>
                            <button onClick={
                                ()=>{
                                    this.deleteArticle(article._id)
                                }
                            } className="btn btn-danger">Eliminar</button>
                            <Link to={"/blog/editar/"+article._id} className="btn btn-warning">Editar</Link>
                           
                            
                            <div className="clearfix"></div>
                        </article>
                    }

                    {
                     !this.state.article && this.state.article ==='success' &&
                     <div id="article">
                        <h2 className="subheader">El articulo no existe</h2>
                        <p>Intentalo de nuevo más tarde</p>
                     </div>
                    }
                    
                    {
                     this.state.article == null &&
                     <div id="article">
                        <h2 className="subheader">Cargando...</h2>
                        <p>Espere unos segundo</p>
                     </div>
                    }
                    



                </section>
                <Sidebar></Sidebar>
            </div>
        );
    }
}

export default Article;