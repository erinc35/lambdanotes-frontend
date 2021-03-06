import React, { Component } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchNotes } from "../actions";



class Notes extends Component {
  
  state = {
    search: "",
    titleCheck: true,
    contentCheck: false,
    order: {},
    authorized: false,
    token: '',
    abs: ''
  };
  
  componentDidMount() {
    console.log('cdm')
    let userId = localStorage.getItem('userId')
    if(userId) this.props.fetchNotes(userId);
    // localStorage.setItem('array', Array.from(this.props.notes))
  }

  logout = () => {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');      
      // this.props.history.push('/login');
      window.location.href = "/"
    }
  };

  handleSearch = (event) => {
    this.setState({
      search: event.target.value.toLowerCase().substr(0, 20)
    });
  }

  clickContent = (event) => {
    this.setState({
      contentCheck: !this.state.contentCheck,
      titleCheck: this.state.contentCheck
    });
  }

  clickTitle = (event) => {
    this.setState({
      titleCheck: !this.state.titleCheck,
      contentCheck: this.state.titleCheck
    });
  }

  handleAlphaSort = event => {
    event.preventDefault();
    let noteOrder = {};
    let noteTitles = this.props.notes.map(note => {
      return note.title;
    });
    noteTitles = noteTitles.sort();
    for (let i = 0; i < noteTitles.length; i++) {
      noteOrder[this.props.notes[i].title] = this.props.notes[i];
    }
    for (let i = 0; i < noteTitles.length; i++) {
      this.props.notes[i] = noteOrder[noteTitles[i]];
    }
    console.log(this.props.notes)
    
    // localStorage.setItem("array", JSON.stringify(this.props.notes));
    localStorage.setItem('currentOrder', JSON.stringify(this.props.notes).split(',') || [])
    // localStorage.setItem('currentOrder', localStorage.getItem('currentOrder') || [])
    // this.props.notes = localStorage.getItem('currentOrder')
    console.log(localStorage.getItem('currentOrder'))  
    console.log(this.props.notes)
    this.setState({ abs: this.props.staten })
    this.setState(this.state)
    console.log(this.state)
    // this.savedPosition()
  };

  savedPosition = () => {
    setTimeout(() => {
      let source = Array.from(document.getElementsByClassName("note"));
      let currentOrder = [];
      let savedOrder = {};
      source.forEach((item, index) => {
        currentOrder.push(item.id);
      });
      console.log(currentOrder)
      this.setState({ order: currentOrder });
      // console.log(typeof this.state.order);

      for (let i = 0; i < this.state.order.length; i++) {
        savedOrder[this.props.notes[i].id] = this.props.notes[i];
        // console.log("order notes", this.state.order)
      }
      for (let i = 0; i < this.state.order.length; i++) {
        this.props.notes[i] = savedOrder[this.state.order[i]];
        // console.log("prop notes", this.props.notes)
      }
      localStorage.setItem("array", JSON.stringify(this.props.notes));
    }, 300);
    this.setState({ abs: 'abs'})
    console.log(localStorage.getItem('array').forEach(not => {
      console.log(not)
    }))
    
  };

  render() {
    // console.log(localStorage.getItem('currentOrder'))
    console.log('this.props.notes', this.props.notes)
    console.log(this.state)
    if(!localStorage.getItem('token')){
      return <div className='notes-private'>Notes are private. You may be able to view it by <a href='/login'>logging in.</a> Don't have an account? <a href='/signup'>Signup here.</a></div>     
    }
    console.log('this.props.notes', this.props.notes)
    
    let filteredNotes = this.props.notes.filter(note => {
      if (this.state.search === "") {
        return this.props.notes;
      }
      if (this.state.titleCheck) {
        return note.title.toLowerCase().indexOf(this.state.search) !== -1;
      } else if (this.state.contentCheck) {
        return note.content.toLowerCase().indexOf(this.state.search) !== -1;
      }
      return this.props.notes;
    });

    return (

      <div className="col-sm-9 cards">
        <div className="sort-div">
          <button className="sort-but pt-sm-1">sort by date</button>
          <button className="sort-but pt-sm-1" onClick={this.handleAlphaSort}>
            sort by title
          </button>
          <button className="logout-but pt-sm-1" onClick={this.logout}>logout</button>          
        </div>
        <h4 className="your-notes">Your notes:</h4>
        <form>
          <input
            className="search-input"
            type="text"
            value={this.state.search}
            onChange={this.handleSearch}
            placeholder="Please choose a search type"
          />
          <div>
            <input
              className="search-title"
              defaultChecked
              type="radio"
              value={this.state.titleCheck}
              name="search"
              onChange={this.clickTitle}
            />
            <label className="search-label">Search Title</label>
            <input
              className="search-content"
              type="radio"
              value={this.state.contentCheck}
              name="search"
              onChange={this.clickContent}
            />
            <label className="search-label">Search Content</label>
          </div>
        </form>
        <div className="notes-list" id="sortable">
          {filteredNotes.map(note => {
            return (
              <Link
                to={`notes/${note._id}`}
                key={note._id + ''}
                className="link-wrap note"
                id={note._id}
                onMouseUp={this.savedPosition}
              >
                <div className="card mb-sm-4 col-sm-3 ui-state-default">
                  <div className="card-head no-bg">
                    <h5 className="d-sm-inline">{note.title}</h5>
                  </div>
                  <div className="list-group list-group-flush">
                    <p className="mt-sm-2">{note.content}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        {/* <div className="notelist" id="sortable">
          {filteredNotes.map(note => {
            return <Link style={{ textDecoration: "none", color: "black" }} key={note.id} to={`/note/${note.id}`} id={note.id} className="note-link note ui-state-default" onMouseUp={this.savedPosition}>
                <div>
                  <h4>{note.title}</h4>
                  <p>{note.body}</p>
                </div>
              </Link>;
          })}
        </div> */}
      </div>
    );
  }
};

const mapStateToProps = state => {
  // console.log('mapstate')
  // console.log('state', state)
  return {
    notes: state[0].requestedUser.notes
  };
};


export default connect(mapStateToProps, { fetchNotes })(Notes);