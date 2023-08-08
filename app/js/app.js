const menuTemplateSource = `
  <li class="menu__item">
    <article class="card">
      <img src="{{ image }}" alt="{{ name }}" class="card__image" />
      <div class="card__content">
        <h2 class="card__name">{{ name }}</h2>
        <p class="card__price">
          <i class="material-icons">monetization_on</i>
          {{ price }} кредитов
        </p>

        <p class="card__descr">{{ description }}</p>

        <ul class="tag-list">
          {{#each ingredients}}
            <li class="tag-list__item">{{this}}</li>
          {{/each}}
        </ul>
      </div>

      <button class="card__button button">
        <i class="material-icons button__icon">shopping_cart</i>
        В корзину
      </button>
    </article>
  </li>
`;

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('../menu.json'); // Загрузка файла JSON
    const menuData = await response.json(); // Преобразование в объект JavaScript

    const menuTemplate = Handlebars.compile(menuTemplateSource);
    const menuHtml = menuData.map(item => menuTemplate(item)).join('');

    const menuContainer = document.querySelector('.js-menu');
    menuContainer.innerHTML = menuHtml;
  } catch (error) {
    console.error('Error loading menu data:', error);
  }
});
