(function ( $ ) {


    $.fn.stager = function (collection, view, settings) {

      collection.__proto__.display = settings.display;
      collection.__proto__.filterCondition = settings.filterCondition
      view.model.__proto__.display = settings.display;
      view.model.__proto__.identifier = settings.identifier
      view.cursorPosition = 0;

      var $stager = $('<div></div>');
      $stager.addClass('input-group');

      var $input_element = $('<input>');
      $input_element.attr('type', 'text');
      $input_element.attr('name', 'assignee');
      $input_element.attr('placeholder', settings.placeholder);
      $input_element.addClass('form-control element');
      $input_element.data('collection', []);


      var $span = $('<span>+</span>');
      $span.addClass('btn input-group-addon');
      $span.attr('id', 'element-stager');
      $stager.append($input_element);
      $stager.append($span);

      this.find('.stage').append($stager);

      this.find('#element-stager').on('click', function () {
        this.stage(view, settings.display, settings.identifier);
      }.bind(this));

      this.on('keyup', function (event) {
        var code = event.keyCode || event.which
        if ($(document.activeElement).attr("class") === "form-control element" && code == 40) {
          this.stage(view, settings.display, settings.identifier);
        } else if ($(document.activeElement).attr("class") === "form-control element") {
          var completed = this.adder(event, view, collection, settings.filterCondition, settings.display);

          this.find('.list').empty();
          var $results = $('<div></div>');
          $results.attr('id', 'results');
          $results.addClass('dropdown open');

          var $list = $('<ul></ul>');
          $list.addClass('dropdown-menu list');

          $results.append($list);

          event.preventDefault();
          var fragment = $(event.target).val().slice(0, view.cursorPosition).toLowerCase();
          console.log(fragment);
          var resultsArray = collection.filter(fragment);
          if (settings.comparator) {
            resultsArry.sort(comparator);
          }

          if (resultsArray.length === 0) {
            this.find('#results').remove();
          } else {
            var currents = [];
            resultsArray.forEach(function (el) {
              if (settings.display(el) !== settings.display(completed)) {
                var $result = $('<li></li>');
                $result.addClass('list-group-item')
                $result.text(settings.identifier(el));
                $result.data(el);
                $list.append($result);
              } else if (el.id !== completed.id) {
                currents.push(el);
              }

            })
            currents.forEach(function (el) {
              var $result = $('<li></li>');
              $result.addClass('list-group-item');
              $result.text(settings.identifier(el));
              $result.data(el);
              $list.prepend($result);
            });

            var $result = $('<li></li>');
            $result.addClass('list-group-item')
            if (!settings.unique) {
              $result.text(settings.identifier(completed));
              $result.data(completed);
              $list.prepend($result);
            }
            this.find('.stage').append($results);
          }
          $list.on('click', function (event) {
            this.find('input.element').data('buffer', $(event.target).data());
            this.stage(view, settings.display, settings.identifier);
          }.bind(this))
        }
      }.bind(this));


      this.find('input[type=submit]').on('click', function (event) {
        this.submit(event, view, settings.submit, settings.extra, settings.type, settings.collectionName, settings.primaryKey, settings.foreignKey, settings.modelType, settings.show);
      }.bind(this));

    };

    $.fn.stage = function (view, display, identifier) {
      this.find('#results').remove();
      view.cursorPosition = 0;

      var $input = this.find('input.element')
      var $buff = this.find('input.element').data('buffer');
      var collection = $input.data('collection');
      collection.push($buff);
      $input.data('collection', collection);
      var $nextElement = $('<div></div>');
      $nextElement.addClass('staged-element');
      $nextElement.text(identifier($buff));
      this.find('.remover').remove();
      var $remover = $('<button>x</button>');
      $remover.css('margin', '3px');
      $remover.addClass('remover btn btn-default btn-xs');
      $nextElement.append($remover);

      this.find('#elements-stage').prepend($nextElement);
      this.find('input.element').val('');
      this.find('.remover').on('click', function () {
        this.remover();
      }.bind(this))
    };

    $.fn.remover = function () {
      this.find('input.element').data('collection').pop();
      this.find('.staged-element')[0].remove();
      var $remover = $('<button>x</button>');
      $remover.css('margin', '3px');
      $remover.addClass('remover btn btn-default btn-xs');
      $(this.find('.staged-element')[0]).append($remover);
      this.find('.remover').on('click', function () {
        this.remover();
      }.bind(this))
    };

    $.fn.adder = function (event, view, collection, filterCondition) {
      // event.preventDefault();
      var code = event.keyCode || event.which
      var $target = this.find("input.element")
      if (code === 8) {
        view.cursorPosition = view.cursorPosition - 1;
      } else {
        view.cursorPosition = view.cursorPosition + 1;
      }
      var name = $target.val();
      if (name[view.cursorPosition - 1] == " " && name[view.cursorPosition - 2] === " ") {
        view.cursorPosition = view.cursorPosition - 1;
        name = name.replace(/  /, " ");
      }
      else {
        var prefix = name.slice(0, view.cursorPosition)
        var result = collection.filter_auto_complete(prefix)[0];
      if (result) {
        $target.val(collection.display(result));
      } else {
        $target.val(prefix);
      }
      var cursorPosition = view.cursorPosition;
      } if (result) {
        this.find('input.element').data('buffer', result);
      }
      this.find('input.element').setCursorPosition(view.cursorPosition);
      return result;
    };

    $.fn.submit = function (event, view, submit, extra, type, collectionName, primaryKey, foreignKey, modelType, show) {
      event.preventDefault();
      var $input = this.find('input.element');
      var attrs = this.find('form').serializeJSON();
      var collection = $input.data('collection');

      var numElements = collection.length;
      var count = 0;
      view.attrs = attrs
      view.attrs[collectionName] = [];
      view.attrs = attrs
      if (extra) {
        for (k in extra) {
          attrs[k.toString()] = extra[k.toString()];
        }
      }
      view.attrs['collectionName'] = [];
      var success = function (model) {
        view.attrs.id = model.id;
        for (var i = 0; i < collection.length; i++) {
          var last = i === collection.length - 1;
          var el = collection[i];
          if (submit) {

            submit(el);
          } else if (show) {
            var foreign = el.id;
            if (el) {
              var primary = view.model.id;
              var keys = {};
              keys[primaryKey] = primary;
              keys[foreignKey] = foreign
              var assignment = new type(keys);
              assignment.save();
              view.attrs[collectionName].push(el);
              if (last) {
                model.attributes = view.attrs;

              }
            }

            model.fetch({
              success: function (model) {
                view.collection.add(model);
              }
            })

            view.render();
          } else {
            var foreign = el.id;
              var primary = view.model.id;
              var keys = {};
              keys[primaryKey] = primary;
              keys[foreignKey] = foreign
              var assignment = new type(keys);
              assignment.save();
          }
      }

    };

      function errors(model, response) {
        $('.errors').empty();
        response.responseJSON.forEach(function (el) {
          var $li = $('<li></li>');
          $li.text(el);
          $('.errors').append($li);
        });
      }

      delete view.model.attributes.id;
      view.model.save(attrs, {
        wait: true,
        success: success,
        error: errors
      });
    }

  $.fn.setCursorPosition = function(pos) {
    this.each(function(index, elem) {
      if (elem.setSelectionRange) {
        elem.setSelectionRange(pos, pos);
      } else if (elem.createTextRange) {
        var range = elem.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
      }
    });
    return this;
  };

}( jQuery ));
