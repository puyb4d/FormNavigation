WAF.define('AutoFormNavigation', ['waf-core/widget', 'Button', 'Text'], function(widget, Button, Text) {
    "use strict";

    var AutoFormNavigation = widget.create('AutoFormNavigation', {
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
    AutoFormNavigation.inherit('waf-behavior/layout/composed');
    AutoFormNavigation.setPart('first',    Button, { title: '⇤' });
    AutoFormNavigation.setPart('previous', Button, { title: '←' });
    AutoFormNavigation.setPart('position', Text,   { value: '' });
    AutoFormNavigation.setPart('next',     Button, { title: '→' });
    AutoFormNavigation.setPart('last',     Button, { title: '⇥' });
    AutoFormNavigation.setPart('new',      Button, { title: '+' });
    AutoFormNavigation.setPart('search',   Button, { title: 'Search' });
    AutoFormNavigation.setPart('save',     Button, { title: 'Save' });
    AutoFormNavigation.setPart('delete',   Button, { title: 'X' });

    return AutoFormNavigation;

});
