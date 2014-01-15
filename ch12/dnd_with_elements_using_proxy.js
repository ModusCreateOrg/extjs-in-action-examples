Ext.onReady(function() {
        // A list of method overrides
    var overrides = {
        // Called when mousedown for a specific amount of time
        startDrag : function() {
            var dragProxy = Ext.get(this.getDragEl());
            var el = Ext.get(this.getEl());

            // Apply CSS styles to the drag element
            dragProxy.addCls('lockerRoomChildren');
            dragProxy.addCls('ddProxy');
            dragProxy.setOpacity(.70);
            dragProxy.update(el.dom.innerHTML);
            dragProxy.setSize(el.getSize())
            //Cache the original XY Coordinates of the element, we'll use this later.
            this.originalXY = el.getXY();
            //el.hide();
        },

        // Only called when element is dragged over the a dropzone with the same ddgroup
        onDragEnter : function(evtObj, targetElId) {
            var targetEl = Ext.get(targetElId);
            targetEl.addCls('dropzoneOver');
        },
        // Only called when element is dragged out of a dropzone with the same ddgroup
        onDragOut : function(evtObj, targetElId) {
            var targetEl =  Ext.get(targetElId);
            targetEl.toggleCls('dropzoneOver');
        },
        // Called when element is dropped not anything other than a
        // dropzone with the same ddgroup
        onInvalidDrop : function() {
            this.invalidDrop = true;
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
        },
        b4EndDrag : Ext.emptyFn,
        endDrag : function() {
            var dragProxy = Ext.get(this.getDragEl());
            if (this.invalidDrop === true) {
                var dragEl = Ext.get(this.getEl());

                //el.dom.style.position = 'relative';

    //            dragEl.dom.style.position = '';

                var animCfgObj = {
                    easing   : 'easeOut',
                    duration : .25,
                    callback : function() {
                        //dragEl.dom.style.position = '';
                        dragProxy.hide();
                        dragEl.highlight();
                    }
                };
                dragProxy.moveTo(this.originalXY[0], this.originalXY[1], animCfgObj);
            }
            else {
                dragProxy.hide();
            }
            delete this.invalidDrop;
        }
    };

    // Setup the people to be draggable
    var maleElements = Ext.get('maleLockerRoom').select('div');
    Ext.each(maleElements.elements, function(el) {
        var dd = new Ext.dd.DDProxy(el, 'males', {
            isTarget  : false
        });
        Ext.apply(dd, overrides);
    });

    var femaleElements = Ext.get('femaleLockerRoom').select('div');
    Ext.each(femaleElements.elements, function(el) {
        var dd = new Ext.dd.DDProxy(el, 'females', {
            isTarget  : false
        });
        Ext.apply(dd, overrides);
    });


    var maleLockerRoomDropTarget = new Ext.dd.DropTarget('maleLockerRoom', {
        ddGroup : 'males'
    });

    var femaleLockerRoomDropTarget = new Ext.dd.DropTarget('femaleLockerRoom', {
        ddGroup : 'females'
    });


    // pool and hot tub drop targets
    var poolDropTarget = new Ext.dd.DropTarget('pool', {
        ddGroup : 'males'
    });

    poolDropTarget.addToGroup('females');

    var hotTubDropTarget = new Ext.dd.DropTarget('hotTub', {
         ddGroup : 'males'
     });

    hotTubDropTarget.addToGroup('females');


});
