import React from 'react';

import './Notepad.css';

import cx from 'classnames';

import { Spinner } from 'react-bootstrap';

import axios from 'axios';

import deepCopy from 'deep-clone';

class View extends React.Component {


    // Set initial state
    state = {
        inputText: '',
        color: 'green',
        alert: '',
        addTextLoading: false,
        notes: []
    };


    componentDidMount() {
        this.loadTextsHandler();
    }

    addNote = newNote => {
        console.log(this.state);

        newNote.id = Math.floor(Math.random() * 10000000000000) + 1;
        this.setState(state => {
            let newState = deepCopy(state);
            newState.notes.splice(0, 0, { ...newNote });
            return newState;
        });
    }

    deleteNote = id => {
        let new_notes = this.state.notes.filter(note => note.id !== id);
        this.setState(state => {
            let newState = deepCopy(state);
            newState.notes = new_notes;
            return newState;
        });
    }

    loadTextsHandler = async () => {
        try {

            const accessToken = JSON.parse(localStorage.getItem('user')).accessToken;
            if (!accessToken) {
                throw new Error("Token not found in localStorage");
            }
            const token = `Bearer ${accessToken}`;

            const reply = await axios.get('https://hot-snail-4.loca.lt/user/getTexts', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            });

            console.log(reply.data);

            // reply.data.texts.reverse();

            reply.data.texts.forEach(element => {
                this.addNote({
                    content: element,
                    bgColor: this.state.color
                });
                console.log('ijnijhijh');
            });

        } catch (err) {
            console.log(err);
        }
    }

    render() {
        // Create list of notes
        console.log(this.state.notes);
        let list = this.state.notes.map(note => {
            if (note.id !== null) {
                return (
                    <div key={1 + Math.floor(Math.random() * 10000000000000)} className="asdf">
                        <div className={note.bgColor + ' note-box alert col-md-11'}>
                            {note.content}
                        </div>
                        <div className="col-md-1 text-center">
                            <button className="delete btn btn-default" onClick={() => this.handleDeleteNote(note.id)} >&times;</button>
                        </div>
                    </div>)
            } else {
                return null;
            }
        });

        // Render app content
        return (
            <div className="notepadContainer">
                <div className="panel panel-default">
                    <div className="panel-body">
                        {this.state.addTextLoading ?
                            <div className={"refreshContentContainer"}>
                                <div className={cx("refreshContentWrap", "refreshContentHrAnimation")}>
                                    <hr className={cx("refreshContentColored")} />
                                    <hr className={cx("refreshContentColored")} />
                                </div>
                            </div>
                            : null}
                        <form className="form-group zxcv">
                            <label htmlFor="note-add">Add New Note</label>
                            <input
                                id="note-add"
                                className="form-control"
                                type="text"
                                value={this.state.inputText}
                                placeholder="Type note here"
                                onChange={this.handleInputText}
                            />
                            <label htmlFor="select-color" >Select Color</label>
                            <div id="select-color">
                                <input className="color-radio" type="radio" onClick={this.selectGreen} checked={this.state.color === 'green' ? 'checked' : ''} /> Green &nbsp;
                                <input className="color-radio" type="radio" onClick={this.selectRed} checked={this.state.color === 'red' ? 'checked' : ''} /> Red &nbsp;
                                <input className="color-radio" type="radio" onClick={this.selectBlue} checked={this.state.color === 'blue' ? 'checked' : ''} /> Blue &nbsp;
                                <input className="color-radio" type="radio" onClick={this.selectOrange} checked={this.state.color === 'orange' ? 'checked' : ''} /> Orange &nbsp;
                            </div>
                        </form>
                        <button className="btn btn-success" onClick={this.handleAddNote} >Add Note</button>
                        <span className="alerts">{this.state.alert}</span>
                    </div>
                </div>
                <div className="notesCon">
                    <h3 className="text-center">Notes</h3>
                    <hr style={{ margin: 0 }} />
                    <div className="listData">
                        {this.state.notes.length === 0 ? <Spinner animation="grow" variant="dark" /> : list}
                    </div>
                </div>
            </div>
        )
    }

    // Update state of input text
    handleInputText = e => {
        const val = e.target.value;
        this.setState(state => {
            let newState = deepCopy(state);
            newState.inputText = val;
            return newState;
        });
    }

    // Add new note
    handleAddNote = async () => {

        // Add note if input is not blank
        if (this.state.inputText !== '') {
            this.setState(state => {
                let newState = deepCopy(state);
                newState.addTextLoading = true;
                return newState;
            });

            try {


                const data = {
                    "newText": this.state.inputText
                }

                const accessToken = JSON.parse(localStorage.getItem('user')).accessToken;
                if (!accessToken) {
                    throw new Error("Token not found in localStorage");
                }
                const token = `Bearer ${accessToken}`;

                console.log("asdf", token);

                const reply = await axios.post('https://hot-snail-4.loca.lt/user/addTexts', data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    }
                });

                this.addNote({
                    content: this.state.inputText,
                    bgColor: this.state.color
                });

                if (this.state.inputText !== '') {
                    // Show success alert message
                    this.showAddAlert();
                }

                this.setState(state => {
                    let newState = deepCopy(state);
                    newState.addTextLoading = false;
                    newState.inputText = '';
                    return newState;
                });



            } catch (err) {
                this.setState(state => {
                    let newState = deepCopy(state);
                    newState.addTextLoading = false;
                    return newState;
                });
                console.log(err);
            }

        }

    }

    // Delete a note
    handleDeleteNote = id => {

        this.deleteNote(id);

        this.showDeleteAlert();

    }

    showAddAlert = () => {
        this.setState(state => {
            let newState = deepCopy(state);
            newState.alert = 'Note Added!';
            return newState;
        });

        let hideAlert = setTimeout(this.hideAlert, 1000);
    }

    showDeleteAlert = () => {
        this.setState(state => {
            let newState = deepCopy(state);
            newState.alert = 'Note Deleted!';
            return newState;
        });

        let hideAlert = setTimeout(this.hideAlert, 1000);
    }

    hideAlert = () => {
        this.setState(state => {
            let newState = deepCopy(state);
            newState.alert = '';
            return newState;
        });
    }

    // Set new note background color to green - default
    selectGreen = () => {
        this.setState(state => {
            let newState = deepCopy(state);
            newState.color = 'green';
            return newState;
        });
    }

    // Set new note background color to red
    selectRed = () => {
        this.setState(state => {
            let newState = deepCopy(state);
            newState.color = 'red';
            return newState;
        });
    }

    // Set new note background color to blue
    selectBlue = () => {
        this.setState(state => {
            let newState = deepCopy(state);
            newState.color = 'blue';
            return newState;
        });
    }

    // Set new note background color to orange
    selectOrange = () => {
        this.setState(state => {
            let newState = deepCopy(state);
            newState.color = 'orange';
            return newState;
        });
    }

}


export default View;