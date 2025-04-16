sap.ui.define([
    'sap/ui/core/UIComponent',
    "sap/ui/model/BindingMode"
], (UIComponent, BindingMode) => {
    'use strict';

    return UIComponent.extend('ui5.databinding.Component', {
        metadata: {
            interfaces: ['sap.ui.core.IAsyncContentCreation'],
            manifest: 'json'
        },

        /**
         * @override
         */
        init() {
            UIComponent.prototype.init.apply(this, arguments);
            
            // this.getModel('data_json').setDefaultBindingMode(BindingMode.OneWay);
        }
    })
})