import _ from 'lodash';
import React, {Component} from 'react';
import { fetchPosts } from '../actions';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class PostsIndex extends Component{
  componentDidMount(){
    this.props.fetchPosts();
  }
  renderPosts(){
    return _.map(this.props.posts, post =>{
      return(
        <Link to={`/posts/${post.id}`}>
          <li key={post.id} className="list-group-item">
            {post.title}
          </li>
        </Link>   
      )
    })
  }
  render(){
    console.log(this.props.posts);
    return(
      <div>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/posts/new">
            Add Post
          </Link>
        </div>
        <h3>Posts</h3>

        <ul className="list-group">
          {this.renderPosts()}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {posts:state.posts};
}
// In the past we have been using the mapDispatchToProps method to get an action creator directly into a component
// null ~ because we are not mapping state to props
// Since we {fetchposts : fetchposts} = {fetchposts}
// This is just a shortcut 
export default connect(mapStateToProps,{fetchPosts})(PostsIndex);