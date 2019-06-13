import React, {Component} from 'react';
//import './App.css';

class App extends Component {

  state = {
    objects: [],
    object:{
      Id_del: 0,
      Id_get: 0,
      Id_up: 0,
      title: null,
      description: null,
      author: '',
      tags: '',
      created_at: null,
      updated_at: null
    }
  }

  componentDidMount(){
    this.getImport();
  }

  getImport = _ =>{
    fetch('http://localhost:4000/import')
    .then(response=> response.json())
    .then(response=> this.setState({ objects: response.data}))
    .catch(err => console.error(err))
  }

  addObject = _ =>{
    const {object} = this.state;
    fetch(`http://localhost:4000/import/add/?title=${object.title}&description=${object.description}&author=${object.author}&tags=${object.tags}&created_at=${object.created_at}&updated_at=${object.updated_at}`)
      .then(this.getImport)
      .catch(err => console.error(err))
  }

  deleteObject = _ =>{
    const{object} = this.state;
    fetch(`http://localhost:4000/import/delete/?Id=${object.Id_del}`)
      .then(this.getImport)
      .catch(err=>console.error(err))
  }

  getObject = _ =>{
    const{object} = this.state;
    fetch(`http://localhost:4000/import/get/${object.Id_get}`)
      .then(response=>response.json())
      .then(response=>this.setState({objects:response.data}))
      .catch(err=>console.error(err))
  }

  updateObjectTitle = _ =>{
    const{object} = this.state;
    fetch(`http://localhost:4000/import/update_title/?Id=${object.Id_up}&title=${object.title}`)
      .then(this.getImport)
      .catch(err=>console.error(err))
  }

  updateObjectDescription = _ =>{
    const{object} = this.state;
    fetch(`http://localhost:4000/import/update_description/?Id=${object.Id_up}&description=${object.description}`)
      .then(this.getImport)
      .catch(err=>console.error(err))
  }

  updateObjectAuthor = _ =>{
    const{object} = this.state;
    fetch(`http://localhost:4000/import/update_author/?Id=${object.Id_up}&author=${object.author}`)
      .then(this.getImport)
      .catch(err=>console.error(err))
  }

  updateObjectTags = _ =>{
    const{object} = this.state;
    fetch(`http://localhost:4000/import/update_tags/?Id=${object.Id_up}&tags=${object.tags}`)
      .then(this.getImport)
      .catch(err=>console.error(err))
  }

  updateObjectCreation = _ =>{
    const{object} = this.state;
    fetch(`http://localhost:4000/import/update_created/?Id=${object.Id_up}&created_at=${object.created_at}`)
      .then(this.getImport)
      .catch(err=>console.error(err))
  }

  updateObjectUpdates = _ =>{
    const{object} = this.state;
    fetch(`http://localhost:4000/import/update_updated/?Id=${object.Id_up}&updated_at=${object.updated_at}`)
      .then(this.getImport)
      .catch(err=>console.error(err))
  }


  renderObject = ({Id, title, description, author,tags,created_at,updated_at}) => <div key={Id}>
          <div class="a"> {Id}. {title} </div>
          <div class="b">
          {description} 
          </div>
          <div class="c">Author:{author} Tags:{tags} Created:{created_at} Updated:{updated_at}</div>
          </div>

  render(){
    const {objects,object} = this.state;
    return (
      <div className="App">
      <div align="left">
      <div class="a">Create/ Edit Entry</div>
      Id Number:<input 
        value={object.Id_up} 
        onChange={e=>this.setState({object: {...object, Id_up: e.target.value}} )}/>
  
        <p>Title: <input 
          value={object.title} 
          onChange={e=>this.setState({object: {...object, title: e.target.value}} )}/> 
          <button onClick={this.updateObjectTitle}>Update Field</button>
          </p>
        <p>Description: <input 
          value={object.description} 
          onChange={e=>this.setState({object: {...object, description: e.target.value}} )}/>
          <button onClick={this.updateObjectDescription}>Update Field</button></p>

        <p>Author: <input 
          value={object.author} 
          onChange={e=>this.setState({object: {...object, author: e.target.value}} )}/>
          <button onClick={this.updateObjectAuthor}>Update Field</button></p>

        <p>Tags: <input 
          value={object.tags} 
          onChange={e=>this.setState({object: {...object, tags: e.target.value}} )}/>
          <button onClick={this.updateObjectTags}>Update Field</button></p>
        <p>Created: <input 
          value={object.created_at} 
          onChange={e=>this.setState({object: {...object, created_at: e.target.value}} )}/>
          <button onClick={this.updateObjectCreation}>Update Field</button></p>
        <p>Updated: <input 
          value={object.updated_at} 
          onChange={e=>this.setState({object: {...object, updated_at: e.target.value}} )}/>
          <button onClick={this.updateObjectUpdates}>Update Field</button></p>
      
      <p>
      <button onClick={this.addObject}>Add Entry</button>  
      </p>

      <br></br>
      <br></br>
     <div class="a"> Delete Entry</div>
     Id Number: <input 
        value={object.Id_del} 
        onChange={e=>this.setState({object: {...object, Id_del: e.target.value}} )}/>
     <button onClick={this.deleteObject}>Delete Entry</button>
      <br></br>

     <div class="a"> Get Entry</div>
     Id Number:<input 
        value={object.Id_get} 
        onChange={e=>this.setState({object: {...object, Id_get: e.target.value}} )}/>
     <button onClick={this.getObject}>Get Entry</button>
     <button onClick={this.getImport}>See All Entries</button>

     <br></br><br></br>
     <div class="a">Entries</div>
     <br></br>
      {objects.map(this.renderObject)}

       <br></br>
       <br></br>

      
      </div>
     </div>
   );
  }
}

export default App;
