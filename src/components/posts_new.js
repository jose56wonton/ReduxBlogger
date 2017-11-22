import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';

class PostsNew extends Component{
  renderField(field){
    return(
        <div className="form-group">
          <label>{field.label}</label>
          <input 
            className="form-control"
            type="text"
            {...field.input}
          />
          {field.meta.error}
        </div>
      )
  }
  render(){
    return(
      <div>
        <form onSubmit={}>
          <Field
            label="Title"
            name="title"
            component={this.renderField}

          />
          <Field
            label="Categories"
            name="categories"
            component={this.renderField}

          />
          <Field
            label="Contents"
            name="contents"
            component={this.renderField}

          />
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }
}
function validate(values){
  //console.log(values) -> {title: 'asdf', categories: 'asdf', content: 'asdf'}
  const errors = {};
  //validate the imputs from 'values' 
  if(!values.title ){
    errors.title = 'Enter a title';
  }
  if(!values.catergories){
    errors.catergories = 'Enter some categories';
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
})(PostsNew);