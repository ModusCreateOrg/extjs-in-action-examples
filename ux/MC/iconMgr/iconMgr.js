/*
	Author       : Jay Garcia
	Site         : http://moduscreate.com
	Contact Info : jgarcia@moduscreate.com
	Purpose      : CSS set using the famfamfam silk icon set.
	Icon Sources : http://www.famfamfam.com/lab/icons/silk/
				 :
	Warranty     : none
	Price        : free
*/
Ext.define('MC.iconMgr.IconMgrModel', {
    extend : 'Ext.data.Model',
    fields   : [
        'name',
        'cssRule',
        'styleBody'
    ]
});

Ext.define('MC.iconMgr.IconMgrStore', {
    extend : 'Ext.data.Store',
    model  : 'MC.iconMgr.IconMgrModel',
    proxy  : {
        type : 'memory'
    },
    reader : {
        type : 'json'
    }
});


Ext.define('MC.iconMgr.Manager', {
    iconBase    : null,
	ruleBodyTpl : ' \n\r .{0} {  background-image: url({1}) !important; }',

	styleSheetId : 'MC_' + Ext.id(),
	styleSheet   : null,

	imgExt : (Ext.isIE6) ? '.gif' : '.png',

    constructor : function(cfg) {
        Ext.apply(this, cfg || {});

        if (! this.hasOwnProperty('iconBase')) {
            Ext.Error.raise('must specify iconBase in config');
        }

        this.styleSheet = Ext.get(Ext.util.CSS.createStyleSheet('/* ModusCreate.iconMgr stylesheet */\n',  this.styleSheetId));

        this.store = Ext.create('MC.iconMgr.IconMgrStore');

        this.callParent();
    },


    getIconCls : function(iconName) {
        if (! Ext.isString(iconName) || iconName.length == 0) {
            Ext.Error.raise('iconName required!');
        }

        var cls         = 'MC_icon_' + Ext.id(),
            iconImgPath = this.iconBase + '/' + iconName + this.imgExt,
            styleBody   = Ext.String.format(this.ruleBodyTpl, cls, iconImgPath),
            store       = this.store,
            styleSheet  = Ext.get(this.styleSheetId),
            isIE        = Ext.isIE,
            sheet       = isIE ?   document.styleSheets[this.styleSheetId] : styleSheet.dom.sheet,
            foundIcon   = store.findBy(function(rec, ind){
                if(rec.data.name == iconName) {
                     return(ind);
                }
            });

        if (foundIcon < 0) {
            store.add(Ext.create('MC.iconMgr.IconMgrModel', {
                name     : iconName,
                cssRule  : cls,
                styleTxt : styleBody
            }));

            if (isIE) {
                // Per http://www.quirksmode.org/dom/w3c_css.html#properties
                sheet.cssText += styleBody;
            }
            else {
                sheet.insertRule(styleBody, sheet.cssRules.length);
            }
            Ext.util.CSS.refreshCache();

            return(cls);
        }
        else {
            return(this.store.getAt(foundIcon).data.cssRule);
        }

    }
});



/*
	IMPORANT!!!

	Be sure to change iconBase if you change the directory name

*/
//MC.iconMgr.iconBrowser = function() {
//	var win;
//	var view;
//	var imgsFile;
//	var iconBase   = 'MC.iconMgr';
//	var iconsFile  = iconBase + '/icons.js';
//	var iconLoc    = iconBase + '/icons';
//	var imgExt     = (Ext.isIE6) ? '.gif' : '.png';
//	var imgIdSeed  = Ext.id();
//	return  {
//		init : function() {
//			if (! win) {
//
//				var store = new Ext.data.SimpleStore({
//					url       : iconsFile,
//					autoLoad  : true,
//					id        : 'name',
//					fields    : [ 'icon' ],
//					listeners : {
//						load : function() {
//							win.body.unmask();
//						}
//					}
//				});
//				view = 	new Ext.DataView({
//					itemSelector : 'div.iconwrap',
//					style        : 'overflow:auto',
//					multiSelect  : false,
//					store        : store,
//					border       : true,
//					trackOver    : true,
//					overClass    : 'x-grid3-row-alt',
//					tpl          : new Ext.XTemplate(
//						'<tpl for=".">',
//							'<div class="iconwrap" style="float: left;padding: 4px 4px 0px 4px;" id="' + Ext.idSeed +  '_{icon}">',
//								'<div style=""><img src="' + iconLoc + '/{icon}' + imgExt +'" class="thumb-img"></div>',
//							'</div>',
//						'</tpl>'
//					),
//					listeners     : {
//						mouseenter : function(view, index, element, evtObj) {
//							Ext.fly(win.topToolbar.items.items[2].el).update('' + store.getAt(index).data.icon);
//						},
//						mouseleave : function(view, index, element, evtObj) {
//							Ext.fly(win.topToolbar.items.items[2].el).update('&nbsp;');
//						}
//
//					}
//				});
//
//				var textField = new Ext.form.TextField({
//					width           : 150,
//					emptyText       : 'Type to filter...',
//					enableKeyEvents : true,
//					listeners       : {
//						keyup : {
//							buffer : 200,
//							fn     : function() {
//								var val = this.getValue();
//								var X = 0;
//
//								store.filterBy(function(record, id) {
//									var regex = new RegExp('.*' + val + '.*');
//									if( record.data.icon.match(regex) != null) {
//										return(true);
//									}
//									else {
//										return(false);
//									}
//								});
//							}
//						}
//					}
//				});
//
//				win = new Ext.Window({
//					height      : 400,
//					width       : 400,
//					minHeight   : 350,
//					minWidth    : 350,
//					layout      : 'fit',
//					closeAction : 'hide',
//					title       : 'moduscreate icon browser',
//					items       : view,
//					buttons     : [
//						{
//							text    : 'OK',
//							handler : this.hide,
//							scope   : this
//						}
//					],
//					listeners   : {
//						render : {
//							delay : 50,
//							fn    : function() {
//								win.body.mask('Working...', 'x-mask-loading');
//							}
//						}
//					},
//					tbar       : [
//						textField,
//						'-',
//						''
//					]
//				});
//			}
//		},
//		hide : function() {
//			win.hide();
//		},
//		show : function() {
//			this.init();
//			win.show();
//		}
//	}
//}();
