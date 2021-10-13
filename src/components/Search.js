import React, { Component } from "react";
import Slider from './Slider';
import Sidebar from './Sidebar';
import Articles from './Articles'
/* import axios from 'axios'; */
class Search extends Component {

     state={
         articles:{},
         status: null
     }
    render() {
        var searched = this.props.match.params.Search;
      /*  
        axios.get("http://localhost:3900/api/articles")
          .then(res=>{
              console.log(res.data);
              this.setState({
                  articles: res.data.articles,
                  status: 'success'
              })
          }
         ); */

       /* var butonString = "Blog";*/
        return ( 
           
           
            <div id="home">
                <Slider
                    title= {'Busqueda:' + searched }
                    size="slider-small"
                />
                <div className="center">
                    <div id="content">
                      {/**Listado de articulos que vendran de la api */}
                    
                         <Articles 
                           Search={searched}
                         />                     
                    </div>
                    <Sidebar
                      blog="true"
                    />
                </div>
            
            </div>

        )



    }
}

export default Search;