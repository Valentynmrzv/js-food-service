const menuTemplateSource = `
  <li class="menu__item">
    <article class="card">
      <img src="{{ image }}" alt="{{ name }}" class="card__image" />
      <div class="card__content">
        <h2 class="card__name">{{ name }}</h2>
        <p class="card__price">
          <i class="material-icons">monetization_on</i>
          {{ price }}
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
        Add to сart
      </button>
    </article>
  </li>
`;

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const themeSwitchToggle = document.querySelector('#language-switch-toggle');
    const menuContainer = document.querySelector('.js-menu');

    const menuTemplate = Handlebars.compile(menuTemplateSource);

    const fetchAndRenderMenu = async (menuUrl) => {
      const response = await fetch(menuUrl);
      const menuData = await response.json();
      const menuHtml = menuData.map(item => menuTemplate(item)).join('');
      menuContainer.innerHTML = menuHtml;
    };

    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage === 'en') {
      themeSwitchToggle.checked = true;
    }

    await fetchAndRenderMenu(savedLanguage === 'en' ? '../menu-en.json' : '../menu.json');

    themeSwitchToggle.addEventListener('change', async (event) => {
      const newMenuUrl = event.target.checked ? '../menu-en.json' : '../menu.json';
      await fetchAndRenderMenu(newMenuUrl);

      localStorage.setItem('language', event.target.checked ? 'en' : 'ru');
    });
  } catch (error) {
    console.error('Error loading menu data:', error);
  }
});

