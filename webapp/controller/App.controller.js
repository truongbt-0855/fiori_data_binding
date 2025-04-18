sap.ui.define([
    "sap/m/library",
    "sap/m/ObjectAttribute",
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/type/Currency"
], (mobileLibrary, ObjectAttribute, Controller, Currency) => {
    "use strict";

    return Controller.extend("ui5.databinding.controller.App", {
        formatMail(sFirstName, sLastName) {
            const oBundle = this.getView().getModel('data_i18n').getResourceBundle();

            return mobileLibrary.URLHelper.normalizeEmail(
                `${sFirstName}.${sLastName}@example.com`,
                oBundle.getText('mailSubject', [sFirstName]),
                oBundle.getText('mailBody')
            )
        },

        formatStockValue(fUnitPrice, iStockLevel, sCurrCode) {
            const oCurrency = new Currency();

            return oCurrency.formatValue([fUnitPrice * iStockLevel, sCurrCode], 'string')
        },

        onItemSelected(oEvent) {
            const oSelectItem = oEvent.getSource();
            const oContext = oSelectItem.getBindingContext('list_product');
            const sPath = oContext.getPath();
            const oProductDetailPanel = this.byId('productDetailsPanel');
            oProductDetailPanel.bindElement({ path: sPath, model: 'list_product' })
        },

        productListFactory(sId, oContext) {
            let oUIControl;

            // Decide based on the data which dependent to clone
            if (oContext.getProperty('UnitsInStock') === 0 && oContext.getProperty('Discontinued')) {
                // The item is discontinued, so use a StandardListItem
                oUIControl = this.byId('productSimple').clone(sId);
            } else {
                // The item is available, so we will create an ObjectListItem
                oUIControl = this.byId('productExtended').clone(sId);

                // The item is temporarily out of stock, so we will add a status
                if (oContext.getProperty('UnitsInStock') < 1) {
                    oUIControl.addAttribute(new ObjectAttribute({
                        text: {
                            path: 'data_i18n>outOfStock'
                        }
                    }))
                }
            }

            return oUIControl;
        }
    });
});