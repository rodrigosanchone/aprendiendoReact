import React, { Component } from "react";
import Slider from './Slider';
import Sidebar from './Sidebar';
import Articles from './Articles';
class Home extends Component {
    render() {
       // var butonString = "Ir al blog";
        return (
            <div id="home">
                <Slider
                    title="Bienvenido al Curso de React"
                    size="slider-big"
                    btn="Ir al blog"
                />
                <div className="center">
                    <div id="content">
                        <h1 className="subHeader">Ultimos articulos</h1>
                        <Articles home="true"/>
                    </div>
                    <Sidebar></Sidebar>
                </div>
            
            </div>

        )



    }
}

export default Home;
