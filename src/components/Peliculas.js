import React, { Component } from 'react';
import Pelicula from './Pelicula'
import Slider from './Slider';
import Sidebar from './Sidebar'
class Peliculas extends Component {
    state = {
        peliculas: [
            {
                titulo: 'Batman',
                año: 1989,
                img: "https://pasionporelcine.net/wp-content/uploads/2020/04/Batman-1989-Cr%C3%ADtica.jpg"

            },
            {
                titulo: 'Gran Torino',
                año: 2008,
                img: "https://i.blogs.es/cd5a41/gran-torino-01_500/450_1000.jpg"

            },
            {
                titulo: 'Looper',
                año: 2012,
                img: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQD3Lr-K4UWitVEkamuMoG8hzc6qePbN160226F1wH20iShoZje"

            }
        ],
        nombre: "Rodrigo Sancho",
        favorita: {}
    };

    cambairTitulo = () => {
        var { peliculas } = this.state;
        var random = Math.floor(Math.random() * 3);
        peliculas[random].titulo = "Batman regresa";
        this.setState({
            peliculas: peliculas
        })
    }
    favorita = (pelicula, indice) => {
        console.log("favorita");
        console.log(pelicula, indice);
        this.setState({
            favorita: pelicula
        })
    }
    render() {
        var pStyle = {
            background: 'green',
            color: '#ffffff',
            padding: '10px',
        }
        return (

            <react-frames>
                <Slider
                    title="Peliculas"
                    size="slider-small"
                />
                <div className="center">
                    <div id="content" className="peliculas">
                        
                        <h2>Listado de peliculas  {this.state.nombre}</h2>
                        <div>
                            <button onClick={this.cambairTitulo}>
                                Cambiar titulo
                    </button>
                            {
                                this.state.favorita.titulo ? (
                                    <p className="favorita"
                                        style={
                                            pStyle
                                        }>
                                        <strong>Pelicula favorita:</strong>
                                        <span> {this.state.favorita.titulo}</span>
                                    </p>
                                ) : (
                                    <p style={pStyle}>No ha seleccionado una pelicula favorita</p>
                                )

                            }


                        </div>

                        {/**crear componentes peliculas */}
                        <div id="articles" className="peliculas">
                            {
                                this.state.peliculas.map((pelicula, i) => {
                                    return (
                                        <Pelicula key={i}
                                            pelicula={pelicula}
                                            indice={i}
                                            marcarFavorita={this.favorita} />

                                    )
                                })
                            }
                        </div>
                    </div>
                    <Sidebar
                      blog="false"
                    />
                </div>
                
            </react-frames>


        );

    }

}

export default Peliculas;