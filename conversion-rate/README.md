Lightning component that shows the conversion rate between currencies using an API from https://fixer.io/  &nbsp  
This is a quick implementation, and if I had had to do this in a real-life project I would have requested additional clarifications:
* Is the client using something similar currently? What they like and what they don't like about they're using?
* Is multi-currency enabled in the org? (determine how to choose the 'From' currency)
* Who is going to use the conversion rate and what for? (perhaps the default 'To' currency could be determined based on the account billing address or contact address or any other criteria, everything to minimize clicking and scrolling)
* Are there currencies the user would more often want to get the conversion rate for? (to put them at the top of the list, same reason as above) 
* Is a real time exchange rate needed or a daily one would suffice? 
* What plan do they have with their exchange rate provider?
* What should be the default currencies (from and to) for the conversion rate?
* Is it necessary to get an historical rate?
* Is there a period of the week the exchange rates do not fluctuate, for example the week-end? (more of a question for the provider, as it won't be necessary to keep requesting the rate for that period it it is not going to change - performance wise and not to use up the API call quota)

<img src="https://github.com/zen37/salesforce/blob/master/conversion-rate/global.png" alt="Global Actions" width="250"/>

<img src="https://github.com/zen37/salesforce/blob/master/conversion-rate/currency%20conversion.png" alt="Currency Conversion" width="250"/>

