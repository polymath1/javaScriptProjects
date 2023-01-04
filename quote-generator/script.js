const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// this variable is global so it has to be above all functions and we are declaring it with 
//'let' as it will be changing.
let apiQuotes= [];



function showLoadingSpiner() {
    loader.hidden = false;
    quoteContainer.hidden= true;
}


function hideLoadingSpinner() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}


//Show New Quote
function newQuote() {
    showLoadingSpiner()
   // Pick a random quote from apiQuotes array
   const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
   // Check if Author field is blank and replace it with "unknown"
   if (!quote.author) {
    authorText.textContent = 'Unknown';
   } else {
    authorText.textContent = quote.author;

   }
   // Check Quote length to determine styling
   if (quote.text.length > 120) {
    quoteText.classList.add('long-quote');
   }else {

   }
   quoteText.classList.remove('long-quote')
   
   // Set  quote , hide loader 
   quoteText.textContent = quote.text;
   hideLoadingSpinner();
}

// Get quotes From API
async function getQuotes () {
    const apiURL = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // Catch Error Here
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}


//Event listeners go at the bottom as you need to declare your function before your event 
//listeners. 
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();
