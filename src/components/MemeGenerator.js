import React, {Component} from 'react'
import {getRandomInt} from '../general-functions'

class MemeGenerator extends Component {
    constructor(props) {
        super(props)

        this.state = {
            topText: "",
            bottomText: "",
            randomImage: "http://i.imgflip.com/1bij.jpg",
            allMemeImgs: [],
        }
        
        this.handleChange = this.handleChange.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
    }

    handleChange(event) {
        event.preventDefault();
        const {value, name} = event.target;
        
        this.setState({
            [name]: value,
        })
    }

    handleFormSubmit(event) {
        event.preventDefault();
        const randomInt = getRandomInt(0, this.state.allMemeImgs.length);
        const url = this.state.allMemeImgs[randomInt].url;

        this.setState({
            randomImage: url,
        })
    }

    componentDidMount() {
		const headers = {"X-Requested-With": "XMLHttpRequest"};
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        fetch(proxy + "https://api.imgflip.com/get_memes/", {headers: headers})
            .then(response => response.json())
            .then(response => {
                const {memes} = response.data;
                this.setState({
                    allMemeImgs: memes,
                })
            })
    }

    render() {
        return (
            <div>
                <form className="meme-form" onSubmit={this.handleFormSubmit}>
                    <input type="text" name="topText" value={this.state.topText} placeholder="Top text" onChange={this.handleChange} />
                    <input type="text" name="bottomText" value={this.state.bottomText} placeholder="Bottom text" onChange={this.handleChange} />
                    <button type="submit">Generate!</button>
                </form>
                <div className="meme">
                    <img src={this.state.randomImage} alt="" />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}

export default MemeGenerator