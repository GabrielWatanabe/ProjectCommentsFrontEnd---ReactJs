import React, { Component }from 'react';
import './styles.css'


class Comment extends Component {
    constructor(props){
        super(props);
        
        this.createComment = this.createComment.bind(this);
        this.getComment = this.getComment.bind(this);
        this.getAudio = this.getAudio.bind(this);
        this.state = {
            text: "",
            comments: []
        }
    }

    componentDidMount() {
        this.setState({ comments: []})
        this.getComment();
    }

    getComment() {
        let currentComponent = this
        fetch("http://localhost:3333/comments")
            .then(res => res.json())
            .then(
                (result) => {
                        currentComponent.setState({ 
                            comments: result
                        })
                },
                (error) => {
                  this.setState({
                    isLoaded: true,
                    error
                  });
                }
              )
    }

    createComment() {

        (async () => {
            const rawResponse = await fetch("http://localhost:3333/comments", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({st_comment: this.state.text })
            });
            const teste = await rawResponse.json()
            console.log(teste)
            // this.setState({comments: [...this.state.comments, await rawResponse.json()]})

        })()
    }

    getAudio = (text) => {
        (async () => {
            const rawResponse = await fetch("http://localhost:3333/texttospeech", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({st_comment: text })
            });
            
            this.setState({comments: [...this.state.comments, await rawResponse.json()]})

        })()
    }

    render() {
        return(
            <div className="comment">
                <div className="left">
                    <h2 className="title-comment">Comentário</h2>
                    <textarea className="text-comment" onChange={(event)=>{this.setState({text: event.target.value})}}></textarea>
                    <input className="button-comment" type="button" value="CADASTRAR" onClick={this.createComment.bind(this)}></input>
                </div>
                <div className="line"></div>
                <div className="right">
                    <h2>Comentários</h2>
                    <div className="show-comments">
                        {this.state.comments.map(comment => (
                            <article key={comment.id}>
                                <div className="div-label">
                                <p>{comment.st_comment}</p>
                                </div>
                                <input  className="button-comment" type="button" value="Ouvir" onClick={() => this.getAudio(comment.st_comment)} />
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default Comment;