import React, { Component } from 'react';
import { BrowserRouter, Route, Switch,Redirect } from 'react-router-dom';

import Home from './components/Home';
import Header from './components/Header';
import Blog from './components/Blog'

import Footer from './components/Footer';
import Peliculas from './components/Peliculas';
import SeccionPruebas from './components/SeccionPruebas';
import EditArticle from './components/EditArticle';
import MiComponente from './components/MiComponente';
import Formulario from './components/Formulario';
import Search from './components/Search';
import Error from './components/Error';

import Article from './components/Article';
/* import Global from './Global';
import axios from 'axios';  */
import CreateArticle from './components/CreateArticle';
class Router extends Component {


  render() {
   
    return (
      <BrowserRouter>
        <Header/>

     
        {/**Configurar rutas y páginas */}
      
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/blog" component={Blog}/>
            <Route exact path="/blog/busqueda/:Search" component={Search}/>
              <Route exact path="/redirect/:Search" render={(props)=>{
                var search = props.match.params.Search; 
                return(<Redirect to={"/blog/busqueda/"+search}></Redirect>) }
              
              }/>
            <Route exact path="/blog/articulo/:id" component={Article}/>
            <Route exact path="/blog/crear" component={CreateArticle}/>
            <Route exact path="/blog/editar/:id" component={EditArticle}/>
            <Route exact path="/formulario" component={Formulario}/>
            <Route exact path="/peliculas" component={Peliculas}/>
            <Route exact path="/ruta-prueba" component={SeccionPruebas} />
            <Route exact path="/segunda-ruta" component={MiComponente} />
           

            <Route exact path="/pagina-1" render={() => (
              <div>
                <h1>Página 1</h1>
                <MiComponente saludo="Hola amigo"></MiComponente>
              </div>

            )} />
            <Route exact path="/pruebas/:nombre/:apellidos?" render={

              (props) => {
                var nombre = props.match.params.nombre;
                var apellido = props.match.params.apellidos;
                return (
                  <div id="content">
                    <h1 className="subHeader">Página de pruebas</h1>
                    <h2>

                      {nombre && !apellido &&

                        <span>{nombre}</span>

                      }

                      {nombre && apellido &&
                        <span>
                          {nombre} {apellido}
                        </span>


                      }

                    </h2>

                  </div>
                )
              }
            } />
            <Route component={Error} />
          </Switch>
         


          <div className="clearfix"></div>
          <Footer />
        


      </BrowserRouter>
    );

  }
}

export default Router;