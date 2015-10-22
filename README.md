
## front-stage

front-stage is a jQuery plugin and a Backbone.js Collections extension that solves the problem of UI object creation involving a user-inputted collection requiring multiple fetches from the database in Backbone.js projects.

For example, consider an email. When using a form to create an email, a user should be able to CC a collection of users. While doing so, it would be nice if the following happened:

1. The user is prompted with a list of matches

2. The form autocompletes to a particular user

3. The form displays the users that have been selected so far

4. The form allows the user to remove selected users

Front-stage provides a framework that will automatically generate a dynamic form according to this general pattern, as well as deal with its submission. It's functionality can be overidden by the engineer.

If the searching involved in producing matching results for such forms were done on the back-end, there would be multiple fetched to the database per session. Since, front-stage uses a custom Backbone Collections for front-end-limited searching, front-stage avoids this problem.


## Usage

### Searchable.js

In order for a Backbone collection to compatable with the plugin, it must be extended from Searchable. E.g,

```
Manifold.Collections.Users = Backbone.Searchable.extend({
  ...
})
```
Among others, it will include the following methods:

```
filter: function (prefix, condition) {
  var condition = condition;
  prefix = prefix.toLowerCase();
  var regex = "^" + prefix
  if (prefix === "") {
    return [];
  } else if (!this.filterCondition) {
    return this.select(function (model) {
      return condition(model, regex);
    }.bind(this))
  } else {
    return this.select(function (model) {
      return this.filterCondition(model, regex);
    }.bind(this))
  }
},
...

select: function (condition) {
  var selected = [];
  this.models.forEach(function (model) {
    if (condition(model)) {
      selected.push(model);
    }
  });
  return selected;
}
```

### Creating input and staging area in a form

A div with class "stage" will contain the input for the collection's elements (e.g. users) and a div with id "elements-stage" will display the selected elements.

```
<form>
  <input name="title" placeholder="New Task">

  <textarea placeholder="Description" ></textarea>

  <input name="due_date">

  <div class="stage"></div>
  <div id="elements-stage"></div>

  <input type="submit" value="+" class="btn btn-default task-main-form">
</form>
```

![Form](/images/blank_user_form_with_background.png)

### Defining form dynamics and submission

To include a form in a page, the jQuery plugin 'stager' should be called on the Backbone view's $el in the view's render method. That is,

```
this.$el.stager(collection, view, setting)

```
where settings is an object with the following basic properties:

```
type
modelType
primaryKey
foreignKey
display
identifier
filterCondition
autoSelector
extra
placeholder
```

Consider the situation of using a form to create a task with a list of assignees as the collection in question. We elaborate on the basic settings properties below:


type:


The class of the Backbone model that represents the relationship between the object being created with the form and the elements of the collection in the form, e.g.

```
MyApp.Models.Assignment
```

modelType:

The class of the Backbone Model that is being created with the form, e.g.

```
MyApp.Models.Task
```

primaryKey:

The database key for the id of the object that is created with the form, e.g.

```
task_id
```

foreignKey:

The database key for the id of an element in the collection, e.g.

```
assignee_id
```

display:

What is displayed as the autocompleted input, e.g.

```
var display = function (model) {
  return (model.attributes.fname + " " + model.attributes.mname + " " + model.attributes.lname).replace(/  /, " ")
}

```

identifier:  

What is displayed in the results list to uniquely identify a result, e.g.

```
var identifier = function (model) {
  return display(model) + " " + model.attributes.email;
}
```

filterCondition:

The regex-based matching condition for the results list, e.g.

```
var filterCondition =  function (model, regex) {
  return model.attributes.fname.toLowerCase().match(regex) ||

  model.attributes.mname.toLowerCase().match(regex) ||

  model.attributes.lname.toLowerCase().match(regex);
}
```

autoSelector:

The method which selects the result from a prefix-matched search that is used as the autocompleted input. The first element of the results list will be the autocompleted input.

extra:

An object with properties of the object being created with the form, but that are not included in the form, e.g

```
var extra = { ownerId: MyApp.currentUser.id };
```

placeholder:

Placeholder for the input


All-in-all:

```
render: function () {
    var renderedContent = this.template({
      project: this.model
    });
    this.$el.html(renderedContent);
    var filterCondition =  function (model, regex) {
      return model.attributes.fname.toLowerCase().match(regex) || model.attributes.mname.toLowerCase().match(regex) || model.attributes.lname.toLowerCase().match(regex);
    }

    var display = function (model) {
      return (model.attributes.fname + " " + model.attributes.mname + " " + model.attributes.lname).replace(/  /, " ")
    }

    var extra = { ownerId: MyApp.currentUser.id };

    var identifier = function (model) {
      return model.attributes.fname + " " + model.attributes.mname + " " + model.attributes.lname + " " + model.attributes.email;
    }

    var autoSelector = function (arr) { return arr[0] }

    this.$el.stager(this.members, this, {
      type: MyApp.Models.Assignment,
      modelType: MyApp.Models.User,
      primaryKey: "task_id",
      foreignKey: "assignee_id",
      display: display,
      identifier: identifier,  
      filterCondition: filterCondition,
      autoSelector: autoSelector,
      extra: extra,
      placeholder: "assignee",
    });

    return this;
  }
  ```

The autocompleted input is staged by a down key press and a list result is staged by clicking on it.

![Form](/images/single_prefix_user_form_with_background.png)

![Form](/images/single_stagee.png)

![Form](/images/stagees.png)

### Additional settings

```
show
comparator
unique
collectionName
submit
```

show:

To make it so the current view immediately reflects the creation that will be done upon submission, a 'show' property can be added to the settings object with the value 'true, assuming that there is a listener for an add event on the collection in question.

Example:

![Form](/images/stagees.png)

![Form](/images/shown.png)

comparator:

Comparator for sorting of results list.

unique:

It may be the case the the displayed input uniquely individuates the model. In this case adding the property 'unique' and assigning it to 'true' will make it so the autocompleted input is not also displayed in the results list.

submit:

To override the default submit method, a submit property can be added and assigned to whatever function the engineer would like to be evaluated for each element of the collection
