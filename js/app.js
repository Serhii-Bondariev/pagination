// Функція для отримання даних з віддаленого ресурсу за допомогою Fetch API
async function getData() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();
  return data;
}

// Основна функція
async function main() {
  // Отримання даних
  const postsData = await getData();
  let currentPage = 1; // Поточна сторінка
  let rows = 10; // Кількість записів на сторінці

  // Функція для відображення списку даних
  function displayList(arrData, rowPerPage, page) {
    const postsEl = document.querySelector(".posts");

    // Очищення контейнера перед оновленням даних
    postsEl.innerHTML = "";

    const start = rowPerPage * page;
    const end = start + rowPerPage;
    const paginatedData = arrData.slice(start, end);

    paginatedData.forEach((el) => {
      const postEl = document.createElement("div");
      postEl.classList.add("post");
      postEl.innerText = `${el.title}`;
      postsEl.appendChild(postEl);
    });
  }

  // Функція для відображення пагінації
  function displayPagination(arrData, rowPerPage) {
    const paginationEl = document.querySelector('.pagination');
    const pagesCount = Math.ceil(arrData.length / rowPerPage);
    const ulEl = document.createElement("ul");
    ulEl.classList.add('pagination__item');

    for (let i = 0; i < pagesCount; i++) {
      const liEl = displayPaginationBtn(i + 1);
      ulEl.appendChild(liEl);
    }
    paginationEl.appendChild(ulEl);
  }
  
  // Функція для створення кнопок пагінації
  function displayPaginationBtn(page) {
    const liEl = document.createElement("li");
    liEl.classList.add('pagination__item');
    liEl.innerText = page;

     if (currentPage == page) liEl.classList.add('pagination__item--active');
     
     // Обробник подій для зміни сторінки при кліку на кнопку
     liEl.addEventListener('click', () => {
      currentPage = page;
      displayList(postsData, rows, currentPage);
    
      let currentItemLi = document.querySelector('li.pagination__item--active');
      currentItemLi.classList.remove('pagination__item--active');
    
      liEl.classList.add('pagination__item--active');
    });

    return liEl;
  }

  // Відображення списку та пагінації на початку
  displayList(postsData, rows, currentPage);
  displayPagination(postsData, rows);
};

// Виклик основної функції для початку роботи
main();
