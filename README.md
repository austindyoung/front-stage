# Manifold

## Minimum Viable Product
Manifold is a clone of Asana that will enable users to:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [x] Create accounts
- [x] Create sessions (log in)
- [ ] Create tasks
- [ ] Create projects
- [ ] Monitor dashboard


create
update
mark complete

## Design Docs
* [DB schema][schema]

[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, basic back-end functionality (2 days)
I will implement auth with BCrypt. By the end of this phase, users will be able
to create accounts and sessions in the browser. In addition, in the back-end (console)
there will be support for performing all of the basic manipulations. This includes:
creating workspaces, tasks, projects, comments. I will then push to Heroku.


### Phase 2: Backbone front-end (3 days)
I will add API routes to serve task, comment, workspace, project data as JSON,
then add Backbone models and collections that fetch data from those routes.
By the end of this phase, users will be able to access the functionality
implemented in phase 1 but from the front-end.


### Phase 3: Editing and Displaying (3 days)
I will add functionality for editing of all applicable fields as well as use CSS
and Bootstrap to produce additional functionality as well as to improve user experience.


### Phase 4: Searching (2 days)
I will implement support for task searching by due date and title. This will be
based on the principles contained in W6D5, AJAX Twitter, UsersSearch.

### Phase 5: Calendar (~2 days)
I will implement a calendar which will display tasks by due date. This will involve using the Google Calendar API and CSS for unique styling.

### Phase 6: Following (~2 days)


### Bonus Features (TBD)
