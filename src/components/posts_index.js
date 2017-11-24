import _ from 'lodash';
import React, { Component } from 'react';
import { fetchPosts } from '../actions';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class PostsIndex extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }
  renderPosts() {
    return _.map(this.props.posts, post => {
      return (
        <Link key={post.id}className="collection-item" to={`/posts/${post.id}`}>
          {post.title}
        </Link>
      )
    })
  }
  render() {
    console.log(this.props.posts);
    return (
      <div>
        <div classNames="navbar-fixed">
          <nav>
            <div className="container nav-wrapper">
              <Link className="brand-logo" to="/">ReduxBlogger</Link>
              <ul id="nav-mobile" className="right ">
                <li><Link className="" to="/posts/new">Add Post</Link></li>
              </ul>
            </div>
          </nav>
        </div>
        <div className="container">          
          <div className="collection">
            {this.renderPosts()}
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { posts: state.posts };
}
// In the past we have been using the mapDispatchToProps method to get an action creator directly into a component
// null ~ because we are not mapping state to props
// Since we {fetchposts : fetchposts} = {fetchposts}
// This is just a shortcut 
export default connect(mapStateToProps, { fetchPosts })(PostsIndex);