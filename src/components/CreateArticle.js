import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import swal from 'sweetalert';

import SimpleReactValidator from 'simple-react-validator';
import Global from '../Global';
import Sidebar from './Sidebar';


class CreateArticle extends Component {
    url = Global.url;
    titleRef = React.createRef();
    contentRef = React.createRef();
    state = {
        article: {},
        status: null,
        selectedFile: null
    };
    componentWillMount() {
        this.validator = new SimpleReactValidator({
            messages:{
                    required:'Este campo es requerido',
                    alpha_num_space: 'Solo carcteres alfanúmericos son admitidos '
            }
        });
      }

    changeState = () => {

        this.setState({
            article: {
                title: this.titleRef.current.value,
                content: this.contentRef.current.value
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
            axios.post(this.url + 'save', this.state.article)
                .then(res => {
                    if (res.data.article) {
                        this.setState({
                            article: res.data.article,
                            status: 'waiting'
                        });
                        //alerta 
                        swal(
                            'Articulo creado',
                            'El articulo se creo exitosamente',
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
        } else{
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
        if (this.state.status === 'success') {
            return <Redirect to="/blog"></Redirect>;
        }
        return (
            <div className="center">
                <section id="content">
                    <h1 className="subHeader">
                        Crear Articulo
                 </h1>
                    <form className="mind-form" onSubmit={this.saveArticle}>
                        <div className="form-group">
                            <label htmlFor="title">
                                Titulo
                            </label>
                            <input type="text" name="title" ref={this.titleRef} onChange={this.changeState} />
                            {this.validator.message('title', this.state.article.title, 'required|alpha_num_space')}
                        </div>
                        <div className="form-group">
                            <label htmlFor="content">
                                Contenido
                             </label>
                            <textarea type="text" name="content" ref={this.contentRef} onChange={this.changeState} />
                            {this.validator.message('content', this.state.article.content, 'required')}
                        </div>
                        <div className="form-group">
                            <label htmlFor="file0">
                                Imagen
                        </label>
                            <input type="file" name="file0" onChange={this.fileChange} />
                        </div>
                        <input type="submit" value="Enviar" className="btn btn-success" />
                    </form>
                </section>
                <Sidebar />
            </div>
        )
    }
}

export default CreateArticle;