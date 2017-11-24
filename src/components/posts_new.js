import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {createPost} from '../actions';

class PostsNew extends Component{

  //touched is used to identify if the form has been changed
  renderTextField(field){
    const {meta: {touched, error} } = field;
    return(
        <div >
        <label  >{field.label}</label>
          <input 
            type="text"
            {...field.input}
          />
          <div className="text-help">
             {touched ? error : ''}
          </div>          
        </div>
      )
  }
  onSubmit(values){
   
    this.props.createPost(values, () =>
    {
      this.props.history.push('/');
    });
  }
  render(){
    const {handleSubmit} = this.props;
    //This line can be explained by 
    // ReduxForm uses handleSubmit to get the values
    // Then it sends it to our helper onSubmit to console.log() or whatever
    // <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
    return(

      <div>
        <div classNames="navbar-fixed">
          <nav>
            <div className="container nav-wrapper">
              <Link className="brand-logo" to="/">ReduxBlogger</Link>
              
            </div>
          </nav>
        </div>
        <div className="container row">
          <form className="col s12" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <div className="row">
              <div className="col s6">
                <Field
                  label="Title"
                  name="title"
                  component={this.renderTextField}
                />
              </div>
              <div className="col s6">
                <Field
                  label="Categories"
                  name="categories"
                  component={this.renderTextField}
                />
              </div> 
            </div>
            <Field
              label="Content"
              name="content"
              component={this.renderTextField}
            />
            <button type="submit" className="waves-effect waves-light btn ">Submit</button>
            
            <Link to="/" className="waves-effect waves-light btn ">Cancel</Link>
          </form>
        </div>
      </div>
    )
  }
}
function validate(values){
  //console.log(values) -> {title: 'asdf', categories: 'asdf', content: 'asdf'}
  const errors = {};
  //validate the imputs from 'values' 
  if(!values.title){
    errors.title = 'Enter a title';
  }
  if (!values.categories){
    errors.categories = 'Enter some categories';
  }
  if(!values.content){
    errors.content = 'Enter some content please';
  }
  //if errors is  empty, the form is fine to submit
  //if errors has any props the redux  form assumes the form is invalid
  return errors;
}


//reduxForm is kinda like connect for redux
export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(null,{createPost})(PostsNew) 
);