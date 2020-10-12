import React, { component } from 'react';

class Model {
    constructor() {
        this.notes = []
    }

}

var model = new Model();

class View extends React.Component {

    constructor() {
        super();
        // Set initial state
        this.state = {
            inputText: '',
            color: 'green',
            alert: ''
        };

    }

    render() {
        // Create list of notes
        let list = model.notes.map(function (note) {
            if (note.id != null) {
                return (<div>
                    <div className={note.bgColor + ' note-box alert col-md-11'}>
                        {note.content}
                    </div>
                    <div className="col-md-1 text-center">
                        <button className="delete btn btn-default" onClick={this.handleDeleteNote.bind(this, note.id)} >&times;</button>
                    </div>
                </div>)
            }
        }, this);

        // Render app content
        return <div>
            <div className="panel panel-default">
                <div className="panel-body">
                    <form className="form-group">
                        <label for="note-add">Add New Note</label>
                        <input
                            id="note-add"
                            className="form-control"
                            type="text"
                            value={this.state.inputText}
                            placeholder="Type note here"
                            onChange={this.handleInputText.bind(this)}
                        />
                        <label for="select-color" >Select Color</label>
                        <div id="select-color">
                            <input className="color-radio" type="radio" onClick={this.selectGreen.bind(this)} checked={this.state.color == 'green' ? 'checked' : ''} /> Green &nbsp;
          <input className="color-radio" type="radio" onClick={this.selectRed.bind(this)} checked={this.state.color == 'red' ? 'checked' : ''} /> Red &nbsp;
          <input className="color-radio" type="radio" onClick={this.selectBlue.bind(this)} checked={this.state.color == 'blue' ? 'checked' : ''} /> Blue &nbsp;
          <input className="color-radio" type="radio" onClick={this.selectOrange.bind(this)} checked={this.state.color == 'orange' ? 'checked' : ''} /> Orange &nbsp;
        </div>
                    </form>
                    <button className="btn btn-success" onClick={this.handleAddNote.bind(this)} >Add Note</button>
                    <span className="alerts">{this.state.alert}</span>
                </div>
            </div>
            <h3 className="text-center">Notes</h3>
            <hr />
            <div>
                {model.notes.length === 0 ? <h3>No Notes</h3> : list}
            </div>
        </div>
    }

    // Update state of input text
    handleInputText(e) {
        this.setState({ inputText: e.target.value })
    }

    // Add new note
    handleAddNote() {

        // Add note if input is not blank
        if (this.state.inputText != '') {
            controller.addNote({
                content: this.state.inputText,
                bgColor: this.state.color
            });
        }

        // Update component state
        this.setState({
            inputText: ''
        });

        // Show note successfully added alert
        if (this.state.inputText != '') {
            // Show success alert message
            this.showAddAlert();
        }

    }

    // Delete a note
    handleDeleteNote(id) {

        controller.deleteNote(id);

        this.showDeleteAlert();

    }

    showAddAlert() {
        this.setState({ alert: 'Note Added!' })

        let hideAlert = setTimeout(this.hideAlert.bind(this), 1000);
    }

    showDeleteAlert() {
        this.setState({ alert: 'Note Deleted!' })

        let hideAlert = setTimeout(this.hideAlert.bind(this), 1000);
    }

    hideAlert() {
        this.setState({ alert: '' })
    }

    // Set new note background color to green - default
    selectGreen() {
        this.setState({ color: 'green' })
    }

    // Set new note background color to red
    selectRed() {
        this.setState({ color: 'red' })
    }

    // Set new note background color to blue
    selectBlue() {
        this.setState({ color: 'blue' })
    }

    // Set new note background color to orange
    selectOrange() {
        this.setState({ color: 'orange' })
    }

}


class Controller {
    addNote(newNote) {
        newNote.id = (model.notes.length + 1);
        model.notes.push(newNote);
    }

    deleteNote(id) {
        let new_notes = [];
        for (let i = 0; i < model.notes.length; i++) {
            if (model.notes[i]['id'] == id) {
                // do nothing
            } else {
                new_notes.push(model.notes[i]);
            }
        }
        model.notes = new_notes;
    }
}

var controller = new Controller();

export default View;