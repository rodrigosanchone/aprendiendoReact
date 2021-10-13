import React, { Component } from "react";
/*import Slider from './Slider';*/
import Sidebar from './Sidebar';
class Formulario extends Component {
    nombreRef= React.createRef();
    apellidoRef= React.createRef();
    bioRef= React.createRef();
    generoHombreRef= React.createRef();
    generoMujerRef= React.createRef();
    generoOtroRef= React.createRef();

    state={
        user:{}
    }
    recibirFormulario=(e)=>{
        e.preventDefault();
        var genero = 'hombre';
        if(this.generoHombreRef.current.checked){
            genero = this.generoHombreRef.current.value;
        }else if(this.generoMujerRef.current.checked){
            genero = this.generoMujerRef.current.value;
        }else{
           // genero = this.generoOtroRef.current.value;
        }
        var user ={
            nombre:this.nombreRef.current.value,
            apellido:this.apellidoRef.current.value,
            bio:this.bioRef.current.value,
            genero:  genero
        }

        this.setState({
             user:user
        })
      
       console.log('Formulario enviado')
       console.log(user);
    }
    render() {
       /*  var butonString = "Blog"; */
       if(this.state.user.nombre){
           var user = this.state.user;
       }
        return (
            <div id="formulario">

                <div className="center">
                    <div id="content">
                      {/*Creación del htmlFormulario */}
                      <h1 className="subheader">htmlFormulario</h1>
                            {/*Mostrar datos registrados*/}
                              {
                                  this.state.user.nombre &&
                                  <div id="user-data">
                                       <p>Nombre: <strong>{user.nombre}</strong></p>
                                       <p>Apellido: <strong>{user.apellido}</strong></p>
                                       <p>Biografía: <strong>{user.bio}</strong></p>
                                       <p>Genero: <strong>{user.genero}</strong></p> 
                                  </div>    
                              }
                                    <form action="" className="mind-form" onSubmit={this.recibirFormulario} onChange={this.recibirFormulario}>
                                        <div className="form-group">
                                            <label htmlFor="" name="nombre">Nombre</label>
                                            <input type="text" name="nombre" ref={this.nombreRef}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="" name="apellido">Apellido</label>
                                            <input type="text" name="apellido" ref={this.apellidoRef}/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="" name="">Biografia</label>
                                            <textarea name="bio" id="" cols="30" rows="10" ref={this.bioRef}></textarea>
                                        </div>

                                        <div className="form-group radiobuttons">
                                            <input type="radio" name="genero" value="hombre" ref={this.generoHombreRef}/>Hombre
                                            <input type="radio" name="genero" value="mujer"  ref={this.generoMujerRef}/>Mujer
                                            <input type="radio" name="genero" value="otro"  ref={this.generoOtroeRef}/>Otro
                                        </div>

                                        <div className="clearfix"></div>

                                        <input type="submit" value="Enviar" className="btn btn-success"/>

                                    </form>
                    </div>
                    <Sidebar
                      blog="false"
                    />
                </div>
            
            </div>

        )



    }
}

export default Formulario;