import React, {Component} from 'react';
import {connect} from 'react-redux'; 
import {fetchPost, deletePost} from '../actions';
import {Link} from 'react-router-dom';
class PostsShow extends Component{
  componentDidMount(){
    const {id} = this.props.match.params;
    this.props.fetchPost(id);

  }
  onDeleteClick(){
    const {id} = this.props.match.params;

    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });
  }
  render(){
    const {post} = this.props;
    console.log(post);
    if(!post){
      return <div className="progress">
        <div className="indeterminate"></div>
      </div>
    }
    return(
      <div>
        <div className="navbar-fixed">
          <nav>
            <div className="container nav-wrapper">
              <Link className="brand-logo" to="/">ReduxBlogger</Link>
              <ul id="nav-mobile" className="right ">
                <li><a onClick={this.onDeleteClick.bind(this)}> Delete Post</a></li>
              </ul>
            </div>
          </nav>
        </div>
        <div className="container">
            <h3>{post.title}</h3>
            <h6>Categories: {post.categories}</h6>
            <p>{post.content}</p>
        </div>
      </div>
      
    )
  }
}
// Second arguement is the set of props that is going to our component
// ownProps == this.props
function mapStateToProps({ posts },ownProps){
  return {post: posts[ownProps.match.params.id] };
}
export default connect(mapStateToProps, {fetchPost,deletePost})(PostsShow);