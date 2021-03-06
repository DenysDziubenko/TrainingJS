/**
*	Application View
*/

define([
  'backbone',
  'underscore',
  'jquery',
  "text!itemTemplate/itemTemplate.html"],
  function(
    Backbone,
    _,
    $,
    itemTemplate){

    var ItemView = Backbone.View.extend({
      tagName: 'li',
      className:'list-group-item',
      template: _.template(itemTemplate),
      render: function(){
        this.$el.html(this.template(this.model.toJSON()));
        this.input = this.$('.edit');
        return this;
      },
      initialize: function(){
        this.model.on('change', this.render, this);
        this.model.on('destroy', this.remove, this);
      },
      events: {
        'click .label-primary' : 'edit',
        'keypress .edit' : 'updateOnEnter',
        'blur .edit' : 'close',
        'click .toggle': 'toggleCompleted',
        'click .destroy': 'destroy'
      },
      edit: function(){
        this.$el.addClass('editing');
        this.input.focus();
      },
      close: function(){
        var value = this.input.val().trim();
        if(value) {
          this.model.save({title: value});
        }
        this.$el.removeClass('editing');
      },
      updateOnEnter: function(e){
        if(e.which == 13){
          this.close();
        }
      },
      toggleCompleted: function(){
        this.model.toggle();
      },
      destroy: function(){
        this.model.destroy();
      }
    });

	return ItemView;
});
