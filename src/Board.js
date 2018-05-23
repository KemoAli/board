import React, { Component } from 'react'
import Note from './Note'
import FaPlus from 'react-icons/lib/fa/plus'


class Board extends Component{
    constructor(props){
        super(props)
        this.eachNote =this.eachNote.bind(this)
        this.update =this.update.bind(this)
        this.remove = this.remove.bind(this)
        this.nextId =this.nextId.bind(this)
        this.add = this.add.bind(this)

        this.state = {
            notes:[
            ]
        }
    }

    eachNote(note, i){
        return(
            <Note key={note.id}
                  index={note.id}
                  onChange={this.update}
                  onRemove={this.remove}
                  onDrag ={this.drag}

            >
                {note.note}

            </Note>

        )
    }
    componentWillMount(){
        var self =this
        if(this.props.count){
            fetch('https://baconipsum.com/api/?type=all-meat&sentence=${this.props.count}')
                .then(response =>response.json())
                .then(json => json[0].split('. ')
                    .forEach(sentence => self.add(sentence.substring(0,25))))
        }
    }
    add(text){
        this.setState(prevState => ({
            notes: [
                ...prevState.notes,
                {
                    id: this.nextId(),
                    note:text
                }
            ]
        }))
    }
    nextId(){
      this.uniqueid = this.uniqueid || 0
        return this.uniqueid++
    }
    remove(id){
        this.setState(preState =>({
            notes:preState.notes.filter(note =>note.id !== id)
        }))
    }
    update(_text, i){
        console.log('Updating item at index', i ,_text)
        this.setState(preSate =>({
            notes: preSate.notes.map(
                note =>(note.id !== i) ? note :
                {...note, note : _text}
            )
        }))
    }
    render(){
        return(
                <div className="board">
                    {
                        //<Note/>
                        this.state.notes.map(this.eachNote)


                    }
                    <button id="add" onClick={this.add.bind(null, "Add New Note")} >
                        <FaPlus />
                    </button>
                </div>
        )
    }
}
export default Board