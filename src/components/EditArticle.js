import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import swal from 'sweetalert';

import SimpleReactValidator from 'simple-react-validator';
import Global from '../Global';
import Sidebar from './Sidebar';

//1. Recoger el id del articulo a editar de la url
//2. Crear un metodo para sacar ese objeto del backend
//3. Rellenar el fomrulario con esos datos
//4. Actializar el objeto haciendo un petición al backend 
class EditArticle extends Component {
    url = Global.url;

    articleId = null;
    titleRef = React.createRef();
    contentRef = React.createRef();
    state = {
        article: {},
        status: null,
        selectedFile: null
    };
    componentWillMount() {
        this.articleId = this.props.match.params.id;
        this.getArticle(this.articleId);
        this.validator = new SimpleReactValidator({
            messages: {
                required: 'Este campo es requerido',
                alpha_num_space: 'Solo carcteres alfanúmericos son admitidos '
            }
        });
    }

    //Saco el id del articulo
    getArticle = (id) => {
        axios.get(this.url + 'article/' + id)
            .then(res => {
                this.setState({
                    article: res.data.article
                })
            });
    }

    changeState = () => {

        this.setState({
            article: {
                title: this.titleRef.current.value,
                content: this.contentRef.current.value,
                image: this.state.article.image
            }
        });

        // console.log(this.state);

        this.validator.showMessages();
        this.forceUpdate();

    }
    saveArticle = (e) => {
        e.preventDefault();
        //alert(this.titleRef.current.value)


        //rellenar  state con valores del form
        this.changeState();

        if (this.validator.allValid()) {
            //Hacer una petición  http por post para guardar el articulo
            axios.put(this.url + 'article/'+this.articleId, this.state.article)
                .then(res => {
                    if (res.data.article) {
                        this.setState({
                            article: res.data.article,
                            status: 'waiting'
                        });
                        //alerta 
                        swal(
                            'Articulo creado',
                            'El articulo se edito exitosamente',
                            'success'
                        )
                        //subir la img
                        if (this.state.selectedFile != null) {

                            //sacar el id del articulo guardado
                            var articleId = this.state.article._id;

                            //crear un form data y añadir fichero

                            const formData = new FormData();

                            formData.append(
                                'file0',
                                this.state.selectedFile,
                                this.state.selectedFile.name
                            );

                            //petición ajax

                            axios.post(this.url + 'upload-image/' + articleId, formData)
                                .then(res => {
                                    if (res.data.article) {
                                        this.setState({
                                            article: res.data.article,
                                            status: 'success'
                                        });
                                    } else {
                                        this.setState({
                                            article: res.data.article,
                                            status: 'failed'
                                        });
                                    }
                                })

                        } else {
                            this.setState({
                                status: 'success'
                            });
                        }
                    } else {
                        this.setState({
                            status: 'failed'
                        })
                    }
                })
        } else {
            this.setState({
                status: 'failed'
            });
            this.validator.showMessages();
            this.forceUpdate();
        }


    }

    fileChange = (event) => {
        //console.log(event)
        this.setState({
            selectedFile: event.target.files[0]
        });
        console.log(this.state);
    }
    render() {
       // console.log(this.state.article);
        if (this.state.status === 'success') {
            return <Redirect to="/blog"></Redirect>;
        }
        return (
            <div className="center">
                <section id="content">
                    <h1 className="subHeader">
                        Editar Articulo
                    </h1>
                    {
                        this.state.article.title &&

                        <form className="mind-form" onSubmit={this.saveArticle}>
                            <div className="form-group">
                                <label htmlFor="title">
                                    Titulo
                            </label>
                                <input type="text" name="title" defaultValue={this.state.article.title} ref={this.titleRef} onChange={this.changeState} />
                                {this.validator.message('title', this.state.article.title, 'required|alpha_num_space')}
                            </div>
                            <div className="form-group">
                                <label htmlFor="content">
                                    Contenido
                             </label>
                                <textarea type="text" name="content" defaultValue={this.state.article.content} ref={this.contentRef} onChange={this.changeState} />
                                {this.validator.message('content', this.state.article.content, 'required')}
                            </div>
                            <div className="form-group">
                                <label htmlFor="file0">
                                    Imagen
                           </label> 
                           <div className="image-wrap">
                            {
                              this.state.article.image !== null ? (
                                <img src={this.url+'get-image/'+this.state.article.image} alt={this.state.article.title} className="thumb"></img>
                              ):(
                                <img src="https://images.unsplash.com/photo-1621570070356-b77aa8bf71b0?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt={this.state.article.title} className="thumb"></img>
                              )
                          }
                            </div>
                            <input type="file" name="file0" onChange={this.fileChange} />
                            </div>
                            <input type="submit" value="Enviar" className="btn btn-success" />
                        </form>
                    }
                    {
                         !this.state.article.title &&
                         <h2 className="subheader">Cargando...</h2>
                    }

                </section>
                <Sidebar />
            </div>
        )
    }
}

export default EditArticle;