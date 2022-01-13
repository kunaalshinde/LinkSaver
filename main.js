// DOM MANIPULATION IS EXPENSIVE!!!

// element button is accessed using this variable
const inputBtn = document.querySelector(".input-btn");

// array to store inputs
let myLinks = []

// input field is accessed using inputEl variable
const inputEl = document.querySelector(".input-el");

// unordered list field is stored
const ulEl = document.querySelector(".ul-el");

// now we have to check if there are already links stored if so fetch them and store
const linksfromLocalStorage = JSON.parse(localStorage.getItem("Links"));

//store the delete button in variable
const deleteBtn = document.querySelector(".del-btn");

// store the delete all button in variable
const deleteAllBtn = document.querySelector(".delall-btn");

// store the tab button in variable
const tabBtn = document.querySelector(".tab-btn");

// if already links are there then fetch and display them
if(linksfromLocalStorage)
{
    myLinks = linksfromLocalStorage;
    render(myLinks);
}


// this is eventlistener function which takes event and function as arguments
// whenever event occurs function is executed
inputBtn.addEventListener("click", function() {
    // fetch the value in text input and push it in array myLinks
    myLinks.push(inputEl.value);
    // Once value given clear out input field
    inputEl.value = "";
    // now we have to store links in local storage
    // below function is used to store in local storage but its argumetns are strings
    // and we have array to store so we use JSON object to convert it into string
    // using attribute stringify we can also convert it back from string using 
    // attribute parse
    localStorage.setItem("Links", JSON.stringify(myLinks));
    render(myLinks);
});


// this listens for double click on delete button and when event occurs delete
// all the links from local storage
deleteAllBtn.addEventListener("dblclick", function() {
    localStorage.clear();
    myLinks = [];
    // clearing out the DOM by passing empty array
    render(myLinks);
});


// this listens on save tab button 
tabBtn.addEventListener("click", function() {
    // we have get link of current tab which we do using chrome API
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLinks.push(tabs[0].url);
        localStorage.setItem("Links", JSON.stringify(myLinks));
        render(myLinks);
    });
});


// this function  shows the number of links saved on webpage
function render(links)
{
    // To increase the performance to our site we create a variable and store empty string 
    // then add the item to it instead of ulEl.innerHTML once all items are added we render 
    // all the items inside the unordered list using ulEl.innerHTML
    let listItems = ""; 


    // We have ul tag in html now we have to insert websites with li tags so we have 
    // to use innerHTML attribute
    for(let i = 0; i < links.length; i++)
    {
            // we have to make the links clickable so we will wrap them in <a> tag
            // target='_blank' open url in new tab and not in popup window
            //listItems += "<li>" + "<a  target = '_blank' href = '" + myLinks[i] + "'>" + myLinks[i] + "</a>" + "</li>";
            //  Template strings used ` not ' or "
            listItems += `
                <li>
                    <a target = '_blank' href = '${links[i]}''>
                    ${links[i]}
                    </a>
                </li>
            `;
            
            // Instead of innerHTML we can use another method
            // In this we do 3 steps:
            // const li = document.createElement("li"); // 1. creating an element
            // li.textContent = myLinks[i]; // 2. set text content
            // ulEl.append(li); // 3. append to ul

    }

    // now we render it using ulEl.innerHTML
    ulEl.innerHTML = listItems;
}