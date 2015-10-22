
## front-stage

front-stage is a jQuery plugin and a Backbone.js Collections extension that solves the problem of UI object creation involving a user-inputted collection in Backbone.js projects.

For example, consider an email. When using a form to create an email, a user should be able to CC a collection of users. While doing so, it would be nice if the following happened:

1. the user is prompted with a list of matches

2. the form autocompletes to a particular user

3. the form displays the users that have been selected so far

4. the form allows the user to remove selected users

Front-stage provides a framework that will automatically generate a dynamic form according to this general framework as well as deal with its submission. It's functionality can be overidden by the engineer.

If the searching involved in producing matching results for such forms were done on the back-end, there would be multiple fetched to the database per session. Since, front-stage uses a custom Backbone Collections for front-end-limited searching, front-stage avoids this problem.


## Usage

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

type:

The class of the Backbone model that represents the relationship between the object being created with the form and the elements of the collection in the form, e.g.

```
EmailApp.Models.CarbonCopy
```

modelType:

The class of the Backbone Model that is being created with the form, e.g.

```
EmailApp.Models.Email
```

collectionName

primaryKey

foreignKey

collectionName

display

identifier  

filterCondition

autoSelector

extra

placeholder

show

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

    this.$el.stager(this.members, this, {
      type: Manifold.Models.TeamMembership,
      modelType: Manifold.Models.User,
      primaryKey: "project_id",
      foreignKey: "member_id",
      collectionName: "team_members",
      display: display,
      identifier: identifier,  
      filterCondition: filterCondition,
      autoSelector: autoSelector,
      extra: extra,
      placeholder: "member",
      show: true
    });

    return this;
  }
  ```

![Form](/images/single_prefix_user_form_with_background.png)

![Form](/images/single_stagee.png)

![Form](/images/stagees.png)

![Form](/images/shown.png)



  ```
  this.$el.stager(collection, this, {
    type: Manifold.Models.WorkspaceProjectMembership,
    collectionName: "projects",
    modelType: Manifold.Models.User,
    primaryKey: "workspace_id",
    foreignKey: "project_id",
    display: display,
    identifier: display,
    placeholder: "project",
    filterCondition: filterCondition,
    autoSelector: autoSelector,
    comparator: comparator
    submit: submit
    extra: extra,
    show: true,
    unique: true,
  });
  ```
* [DB schema][schema]

[schema]: ./docs/schema.md

## Implementation Timeline
