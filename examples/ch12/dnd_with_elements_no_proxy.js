
Ext.onReady(function() {
    // A list of method overrides
    var overrides = {
        // Only called when element is dragged over the a dropzone with the same ddgroup
        onDragEnter : function(evtObj, targetElId) {
            // Colorize the dropzone, inviting the user
            var targetEl =  Ext.get(targetElId);
            targetEl.addClass('dropzoneOver');
        },
        // Only called when element is dragged out of a dropzone with the same ddgroup
        onDragOut : function(evtObj, targetElId) {
            var targetEl =  Ext.get(targetElId);
            targetEl.removeClass('dropzoneOver');
        },
        // Called when mousedown for a specific amount of time
        b4StartDrag : function() {
            var el = Ext.get(this.getEl());

            //Cache the original XY Coordinates of the element, we'll use this later.
            this.originalXY = el.getXY();
        },
        // Called when element is dropped not anything other than a
        // dropzone with the same ddgroup
        onInvalidDrop : function() {
            this.invalidDrop = true;
        },
        endDrag : function() {
            if (this.invalidDrop === true) {
                var dragEl = Ext.get(this.getEl());

                var animCfgObj = {
                    easing   : 'elasticOut',
                    duration : 1,
                    callback : function() {
                        dragEl.dom.style.position = '';
                    }
                };
                dragEl.moveTo(this.originalXY[0], this.originalXY[1], animCfgObj);
                delete this.invalidDrop;
            }

        },
        // Called upon successful drop of an element on a DDTarget with the same
        onDragDrop : function(evtObj, targetElId) {
            var dragEl = Ext.get(this.getEl());
            var dropEl = Ext.get(targetElId);

            if (dragEl.dom.parentNode.id != targetElId) {

                dropEl.appendChild(dragEl);
                this.onDragOut(evtObj, targetElId);
                dragEl.dom.style.position ='';

            }
            else {
                this.onInvalidDrop();
            }
        }
    };

    // Setup the people to be draggable
    var maleElements = Ext.get('maleLockerRoom').select('div');
    Ext.each(maleElements.elements, function(el) {
        var dd = new Ext.dd.DD(el, 'males', {
            isTarget  : false
        });
        Ext.apply(dd, overrides);
    });

    var femaleElements = Ext.get('femaleLockerRoom').select('div');
    Ext.each(femaleElements.elements, function(el) {
        var dd = new Ext.dd.DD(el, 'females', {
            isTarget  : false
        });
        Ext.apply(dd, overrides);
    });


    var mlrDDTarget = new Ext.dd.DDTarget('maleLockerRoom','males');

    var flrDDTarget = new Ext.dd.DDTarget('femaleLockerRoom', 'females');


    // pool and hot tub drop targets
    var poolDDTarget = new Ext.dd.DDTarget('pool', 'males');
    poolDDTarget.addToGroup('females');

    var hotTubDDTarget = new Ext.dd.DDTarget('hotTub', 'females');
    hotTubDDTarget.addToGroup('males');


});
