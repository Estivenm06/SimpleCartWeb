require("../css/custom.css") 
require("../css/normalize.css") 
require("../css/skeleton.css")

// Variables
const cart = document.querySelector("#carrito");
const containerCart = document.querySelector("#lista-carrito tbody");
const coursesList = document.querySelector("#lista-cursos");
const clearCartBtn = document.querySelector("#vaciar-carrito");
let coursesCart = [];

//Uploading every listeners to buttons
UploadEventListeners();
function UploadEventListeners() {
  // When press the "Agregar al carrito" button
  coursesList.addEventListener("click", addCourse);

  // When press the delete course button
  cart.addEventListener("click", deleteCourse);

  // Button to clear the coursesCart
  clearCartBtn.addEventListener("click", (event) => {
    event.preventDefault();
    // Checking if we're pressing the correct button
    coursesCart = [];
    // Lastly calling the cartHTML
    clearHTML();
  });
}

//Functions
function addCourse(event) {
  event.preventDefault();
  if (event.target.classList.contains("agregar-carrito")) {
    const courseSelected = event.target.parentElement.parentElement;
    extractInformationCourse(courseSelected);
  }
}

function deleteCourse(event) {
  event.preventDefault();
  if (event.target.classList.contains("borrar-curso")) {
    // First find the course to delete id
    const courseId = event.target.getAttribute("data-id");
    // Create a new object without the course
    coursesCart = coursesCart.filter((course) => course.id !== courseId);
    // Updating cart in the HTML and showing it
    cartHTML();
  }
}

// Extract and send the information of the course to the cart
function extractInformationCourse(course) {
  // Destructuring the course
  const image = course.querySelector("img").src;
  const title = course.querySelector("h4").textContent;
  const price = course.querySelector(".precio span").textContent;
  const id = course.querySelector(".info-card a").getAttribute("data-id");

  // Making the course an object
  const courseInformation = {
    image: image,
    title: title,
    price: price,
    id: id,
    quantity: 1,
  };

  // If a course already exist only update the quantity
  const alreadyExist = coursesCart.some(
    (article) => article.id === courseInformation.id
  );
  if (alreadyExist) {
    coursesCart.find((course) =>
      course.id === courseInformation.id
        ? (course.quantity = course.quantity + 1)
        : ""
    );
  } else {
    // If does not exist in the previous array then it is going to save the course into the array
    coursesCart = [...coursesCart, courseInformation];
  }

  // Send the cart to HTML
  cartHTML();
}

function cartHTML() {
  //Clean HTML after add new course

  clearHTML();

  coursesCart.forEach((course) => {
    const { image, title, price, quantity, id } = course;
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>
        <img src=${image} width="100">
        </td><td>${title}</td>
        <td>${price}</td>
        <td>${quantity}</td>
        <td><a href="#" class="borrar-curso" data-id=${id}>X</a></td>
    `;
    // Inserting each HTML of the cart in the tbody
    containerCart.appendChild(row);
  });
}

function clearHTML() {
  // Slowest way
  // containerCart.innerHTML = ''

  // Quick way
  while (containerCart.firstChild) {
    containerCart.removeChild(containerCart.firstChild);
  }
}
