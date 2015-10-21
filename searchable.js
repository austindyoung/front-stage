Backbone.Searchable = Backbone.Collection.extend({
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

  autoCondition: function (model, regex) {
    return this.display(model).toLowerCase().match(regex);
  },


  filter_auto_complete: function (prefix) {
    prefix = prefix.toLowerCase();
    var regex = "^" + prefix
    if (prefix === "") {
      return [];
    } else {
      return this.select(function (model) {
        // debugger
        return this.autoCondition(model, regex);
      }.bind(this)
  )};


  select: function (condition) {
    var selected = [];
    this.models.forEach(function (model) {
      if (condition(model)) {
        selected.push(model);
      }
    });
    return selected;
  }
})
