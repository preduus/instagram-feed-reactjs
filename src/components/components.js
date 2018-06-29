import React from 'react';
import axios from 'axios';

function prevent(e){
    e.preventDefault();
}

export class Navbar extends React.Component {
    render() {
        return (
            <div className="navbar">
                <a href="">
                    <i className="fa fa-instagram" />
                    <span />
                </a>
            </div>
        );
    }
};

export class Lilbar extends React.Component {
    render() {
        return (
            <div className="lil-bar">
                <div className="bar-cont">
                    <a role="button">
                    <i className="fa fa-user-plus" />
                    </a>
                    <a onClick={(e) => { prevent(e) }} className="list-order" role="button">
                    <i className="fa fa-ellipsis-h" />
                    </a>
                </div>
            </div>
        );
    }
};

export class List extends React.Component {
    render() {
        return (
            <div className="list">
                <ul>
                    <li>
                        <a href="http://bit.ly/2KecIeq">
                            <img src="https://goo.gl/3DEeah" alt="" className="avatar avatar-50" />preduus
                        </a>
                    </li>
                    <li>
                    <a href="">Log in</a>
                    </li>
                    <li>
                    <a href="">Sign up</a>
                    </li>
                    <li>
                    <a href="">Report this user</a>
                    </li>
                    <li className="collapse">
                    <a href="">Collapse the bar</a>
                    </li>
                </ul>
            </div>
        );
    }
};

export class Section extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            posts: []
        };
    }

    componentDidMount() {
        this.posts();
    }

    posts() {
        axios.get(`https://jsonplaceholder.typicode.com/posts`)
            .then(res => {
                const posts = res.data;
                this.setState({ posts });
            })
    }

    render() {
        return (
            <section>
                {
                    this.state.posts.map((post, index) => {
                        post.image = "https://loremflickr.com/320/240?random=" + index;
                        return <PostContent key={index} {...post} />
                    })
                }
            </section>
        );
    }
};

export class PostContent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: [],
            comments: [],
            commentChange: ''
        };

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleComment = this.handleComment.bind(this);
    }

    componentDidMount() {
        this.user();
    }

    user(userID){
        axios.get(`https://jsonplaceholder.typicode.com/users/`+ this.props.userId)
            .then(res => {
                const user = res.data;
                this.setState({ user: user });
            })
    }
    
    handleFormSubmit(e){
        this.setState({
            comments: [
                ...this.state.comments,
                { comment: this.state.commentChange }
            ]
        })
        this.setState({
            commentChange: ''
        })
        e.preventDefault();
    }
    
    handleComment(e){
        this.setState({
            commentChange: e.target.value
        })
    }

    render() {
        const user = this.state.user;
        const userPicture = "https://randomuser.me/api/portraits/women/" + this.props.userId + ".jpg";
        return (
            <div className="insta fade-scroll">
                <div className="top-insta">
                    <a href="http://bit.ly/2KecIeq">
                        <img src={ userPicture } alt="" />
                    </a>
                    <a href="http://bit.ly/2KecIeq" className="user">{ user.username }</a>
                    <span className="dot" />
                </div>
                <div className="post">
                    {this.props.title !== '' && <p>{this.props.title}</p>}
                    { this.props.image !== '' &&  
                        <div>
                            <div className="overlay">
                                <span />
                            </div>
                            <img src={ this.props.image } alt="" />
                        </div>
                    }
                </div>
                <div className="footer">
                    <div className="react">
                        <a onClick={(e) => { prevent(e) }} role="button">
                            <span className="love" />
                        </a>
                        <a onClick={(e) => { prevent(e) }} role="button">
                            <span className="comment" />
                        </a>
                        <a onClick={(e) => { prevent(e) }} role="button">
                            <span className="save" />
                        </a>
                    </div>

                    { 
                        this.state.comments.map((comment, index) => {
                            return <Comments key={index} username="preduus" {...comment } />
                        }) 
                    }

                    <form onSubmit={ this.handleFormSubmit } className="comment-section">
                        <input value={ this.state.commentChange } onChange={ this.handleComment } type="text" id="cmnt" placeholder="Add a comment..." />
                        <button type="submit" className="dot02"> <span className="dot02"></span></button>
                    </form>
                </div>
            </div> 
        );
    }
}

export class Comments extends React.Component {

    render(){
        return (
            <div className="caption">
                <a href="http://bit.ly/2KecIeq">{this.props.username}</a>
                {<span>{this.props.comment.toString()}</span>}
            </div>
        );
    }
}

export class Footer extends React.Component {
    render() {
        return (
            <footer>
                <div className="footer-cont">
                    <ul>
                    <li>
                        <a onClick={(e) => { prevent(e) }}>About us</a>
                    </li>
                    <li>
                        <a onClick={(e) => { prevent(e) }}>Support</a>
                    </li>
                    <li>
                        <a onClick={(e) => { prevent(e) }}>Blog</a>
                    </li>
                    <li>
                        <a onClick={(e) => { prevent(e) }}>Privacy</a>
                    </li>
                    <li>
                        <a onClick={(e) => { prevent(e) }}>Terms</a>
                    </li>
                    </ul>
                    <span className="copyright">© 2018 INSTAGRAM</span>
                </div>
            </footer>
        );
    }
};