
## front-stage

front-stage is a jQuery plugin and a Backbone.js Collections extension that solves the problem of UI object creation involving a user-inputted collection.

For example, consider an email. When using a form to create an email, a user should be able to CC a collection of users. While doing so, it would be nice if teh following happened:

(1) the user is prompted with a list of matches

(2) the form autocompleted to a particular user

(3) the form displayed the users that have been selected so far

(4) the form allowed the user to remove selected users

Front-stage provides a framework that will automatically generate a dynamic form according to this general framework as well as deal with its submission. It's functionality can be overidden by the engineer.

## Usage

```
<form>
  <input name="title">

  <textarea placeholder="Description" ></textarea>

  <input name="due_date">

  <div class="stage"></div>
  <div id="elements-stage"></div>

  <input type="submit" value="+" class="btn btn-default task-main-form">
</form>
```
* [DB schema][schema]

[schema]: ./docs/schema.md

## Implementation Timeline
