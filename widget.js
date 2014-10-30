WAF.define('FormNavigation', ['waf-core/widget', 'Button', 'Text'], function(widget, Button, Text) {
    "use strict";

    var FormNavigation = widget.create('FormNavigation', {
        datasource: widget.property({ type: 'datasource' }),
        init: function() {
            var actions = {
                'first':    function() { this.datasource().select(0); },
                'previous': function() { this.datasource().selectPrevious(); },
                'next':     function() { this.datasource().selectNext(); },
                'last':     function() { this.datasource().select(this.datasource().length - 1); },
                'new':      function() { this.datasource().addNewElement(); },
                'search':   function() { this.fire('search'); },
                'save':     function() { this.datasource().save(); },
                'delete':   function() { this.datasource().remove(); }
            };
            function getHandler(key) {
                return function() {
                    if(this.datasource()) {
                        actions[key].call(this);
                    }
                };
            }
            for (var key in actions) {
                this.getPart(key).subscribe('action', getHandler(key), this);
            }

            var updateCount = function() {
                if(this.datasource()) {
                    this.getPart('position').value((this.datasource().getPosition() + 1) + '/' + this.datasource().length);
                } else {
                    this.getPart('position').value('');
                }
            };
            this.datasource.subscribe('currentElementChange', updateCount, this);
            this.datasource.onChange(updateCount);
            updateCount.call(this);
        }
    });
    FormNavigation.inherit('waf-behavior/layout/composed');
    FormNavigation.setPart('first',    Button, { title: '⇤' });
    FormNavigation.setPart('previous', Button, { title: '←' });
    FormNavigation.setPart('position', Text,   { value: '' });
    FormNavigation.setPart('next',     Button, { title: '→' });
    FormNavigation.setPart('last',     Button, { title: '⇥' });
    FormNavigation.setPart('new',      Button, { title: '+' });
    FormNavigation.setPart('search',   Button, { title: 'Search' });
    FormNavigation.setPart('save',     Button, { title: 'Save' });
    FormNavigation.setPart('delete',   Button, { title: 'X' });

    return FormNavigation;

});
