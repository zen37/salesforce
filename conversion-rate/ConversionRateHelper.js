({
            
    setCurrencies : function(cmp) {

    var action = cmp.get("c.getInitValues");
  
 		action.setCallback(this, function(response) { 
            
            var state = response.getState();

            if (state === "SUCCESS") {    
                cmp.set("v.fromCurrency", response.getReturnValue().CurrencyFrom);
                this.setListCurrenciesTo(cmp, response);
            }
            else { 
                this.handleError(cmp, response);
            }
      
        });            
 		$A.enqueueAction(action);
	},    
    
        
      getExchangeRate : function(cmp) {
        
        var action = cmp.get("c.getConversionRate");
        
        action.setParams({ currencyFrom : cmp.get("v.fromCurrency"), 
                           currencyTo : cmp.find('mySelect').get('v.value') });
        
        action.setCallback(this, function(response) {
            
            var state = response.getState();
           
            if (state === "SUCCESS") { 
                
                var rate = response.getReturnValue();
                
                if (!rate.includes('ERROR')){
                    
                    var roundAmount;
                    var amount = cmp.find('amount').get('v.value');
                    
                    if (amount == 1) {
                        roundAmount = false; // no need for rounding, just display the complete rate
                    } 
                    else {
                        roundAmount = true;
                    }
                    
                    var num = rate * amount; 
                    var result = this.formatResult(roundAmount, num );
                    
                    cmp.set("v.rate", result);
                } 
            	  else {
                    this.displayError(cmp, rate);
                }               

            } 
              else {
                this.handleError(cmp, response);
            }             
        });
   
       $A.enqueueAction(action);      
       },
    
    
      swapCurrencies  : function(cmp) {
 
 		    var swapFrom;
        var swapTo;
        
        swapFrom = cmp.find('mySelect').get('v.value');  
        swapTo = cmp.get('v.fromCurrency');
        
        cmp.set("v.fromCurrency", swapFrom);
        cmp.set("v.selectedValue", swapTo);
                
      },
    
    
    setListCurrenciesTo : function(cmp, response) {
            
           var list = response.getReturnValue().Currencies;
           var currencies = [];
                
           for (var i=0; i< list.length; i++) { 
                   var currency = {value: list[i], label: list[i]};
                   currencies.push(currency);
                }  
        
           cmp.set("v.currencies", currencies); 
           var currencyTo =  response.getReturnValue().CurrencyTo;
           cmp.set("v.selectedValue", currencyTo);    
           
    },
    
    
    formatResult : function(roundResult, num) {

        if(roundResult){
          	return (num.toFixed(2)).toString();        
        }
        else {
            return num.toString();   
        }        
    },
    
    
    handleError : function(cmp, response){
        
        var errorMsg;
        var state = response.getState(); 
        
		if (state === "INCOMPLETE") {
        errorMsg = "No response from server or client is offline.";
    	}
    	else {
   		 var errors = response.getError();
         if (errors) {
            if (errors[0] && errors[0].message) {
                        errorMsg = errors[0].message;
            }
         } 
            else {
              errorMsg = "Unknown error";
           }           
		}
    
         this.displayError(cmp, msg);
    },
    
    displayError : function (cmp, msg){
           cmp.find('notifLib').showToast({
                 "title": "ERROR retrieving the exchange rate!",
                 "message": msg
          });   
    }
})
