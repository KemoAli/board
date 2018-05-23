import React, { Component } from 'react'
import FaPencil from 'react-icons/lib/fa/pencil'
import FaTrash from 'react-icons/lib/fa/trash'
import FaFloppyO from 'react-icons/lib/fa/floppy-o'



class Note extends Component{
    constructor(props){
        super(props)

        this.state={
            editing: false
        }
        this.edit =this.edit.bind(this)
        this.remove =this.remove.bind(this)
        this.save =this.save.bind(this);
        this.renderForm=this.renderForm.bind(this)
        this.renderDisplay=this.renderDisplay.bind(this)
        this.randomBetween =this.randomBetween.bind(this)
    }
    save(e){
        e.preventDefault();
        this.props.onChange(this.enteredText.value,  this.props.index)
        this.setState({
            editing:false
        })

    }
    componentWillMount(){
        this.style ={
            right: this.randomBetween(0,window.innerWidth-200, 'px'),
            top: this.randomBetween(0,window.innerWidth-200, 'px'),
            left: this.randomBetween(0,window.innerWidth-200, 'px'),
            bottom: this.randomBetween(20,window.innerWidth-200, 'px'),

            backgroundColor: '#'+Math.random().toString(16).substr(-6),
            transform: `rotate(${this.randomBetween(-25,25,'deg')})`
        }
    }
    componentDidUpdate(){
        var textarea
        if(this.state.editing){
            textarea = this.enteredText
            textarea.focus()
            textarea.select()

        }
    }
    randomBetween(x,y,s){
        return x + Math.ceil(Math.random() *(y-x)) + s
    }
    edit(){
        this.setState({
            editing:true
        })
    }
    remove(){
        this.props.onRemove(this.props.index)
    }

    renderForm(){
        return(
            <div className="note" style={this.style}>
                <form onSubmit={this.save}>
                    <textarea ref={input =>this.enteredText =input}
                    defaultValue={this.props.children}></textarea>
                    <button id="save"><FaFloppyO/></button>
                </form>

            </div>
        )
    }
    shouldComponentUpdate(nextProps, nextState){
        return(
            this.props.children !== nextProps.children || this.state !== nextState
        )

    }
    renderDisplay(){
        return(
            <div className="note" style={this.style}>
                <p>{this.props.children}</p>
                <span>
                    <button onClick={this.edit} id="edit"><FaPencil/></button>
                    <button onClick={this.remove} id="remove"><FaTrash/></button>
                </span>

            </div>
        )
    }
    render(){
        return this.state.editing ? this.renderForm() : this.renderDisplay()
       /* if(this.state.editing){
            return  this.renderForm()
        }else return this.renderDisplay();*/
    }
}
export default Note