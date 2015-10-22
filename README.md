
## front-stage

front-stage is a jQuery plugin and a Backbone.js Collections extension that solves the problem of UI object creation involving a user-inputted collection in Backbone.js projects.

For example, consider an email. When using a form to create an email, a user should be able to CC a collection of users. While doing so, it would be nice if the following happened:

1. the user is prompted with a list of matches

2. the form autocompleted to a particular user

3. the form displayed the users that have been selected so far

4. the form allowed the user to remove selected users

Front-stage provides a framework that will automatically generate a dynamic form according to this general framework as well as deal with its submission. It's functionality can be overidden by the engineer.

The searching involved in producing matching results is done on the front-end with a custom Backbone Collections extension to avoid multiple fetches per session from the database.


## Usage

### Creating the staging area in a form

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

    this.$el.stager(this.organization.members(), this, {
      type: Manifold.Models.TeamMembership,
      collectionName: "team_members",
      modelType: Manifold.Models.User,
      primaryKey: "project_id",
      foreignKey: "member_id",
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
