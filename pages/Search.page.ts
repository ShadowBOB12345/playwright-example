import { Page, Locator } from '@playwright/test';

export class SearchPage {
  readonly page: Page;

  // Определение селекторов
  searchInput: Locator;
  searchButton: Locator;
  resultItems: Locator;
  priceFilter: Locator;
  categoryFilter: Locator;
  paginationNextButton: Locator;
  resultTitles: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator('input[name="search"]');  // Селектор поля поиска
    this.searchButton = page.locator('button[type="submit"]'); // Селектор кнопки поиска
    this.resultItems = page.locator('.product-item');  // Селектор для элементов результатов
    this.priceFilter = page.locator('.price-filter');  // Селектор для фильтра по цене
    this.categoryFilter = page.locator('.category-filter');  // Селектор для фильтра по категории
    this.paginationNextButton = page.locator('.pagination-next'); // Селектор для кнопки "Следующая страница"
    this.resultTitles = page.locator('.product-title'); // Селектор для названий продуктов в результатах
  }

  // Метод для ввода текста в поле поиска
  async search(query: string) {
    // Ожидаем, что элемент будет доступен и видим
    await this.page.waitForSelector('input[name="search"]', { state: 'visible', timeout: 60000 });

    // Вводим текст в поле поиска
    await this.page.fill('input[name="search"]', query); 
    // Кликаем на кнопку поиска
    await this.page.click('button[type="submit"]');
  }

  // Метод для фильтрации по цене
  async filterByPrice(min: number, max: number) {
    await this.page.fill('.price-filter input[name="minPrice"]', min.toString());
    await this.page.fill('.price-filter input[name="maxPrice"]', max.toString());
    await this.page.click('.price-filter button[type="submit"]'); // Применяем фильтр
  }

  // Метод для фильтрации по категории
  async filterByCategory(category: string) {
    await this.page.selectOption('.category-filter', { label: category });  // Выбираем категорию из выпадающего списка
  }

  // Метод для проверки количества результатов поиска
  async getSearchResultsCount(): Promise<number> {
    const results = await this.resultItems.count();  // Подсчитываем количество найденных элементов
    return results;
  }

  // Метод для проверки наличия хотя бы одного результата
  async resultsAreVisible() {
    await this.page.waitForSelector('.search-results'); // Ожидаем появления блока с результатами
  }

  // Метод для проверки, что хотя бы один результат поиска содержит нужный текст
  async resultContains(text: string) {
    const result = await this.resultTitles.locator(`text=${text}`).first();
    await result.isVisible();  // Проверяем, что хотя бы одно название продукта содержит указанный текст
  }

  // Метод для перехода на следующую страницу результатов
  async goToNextPage() {
    await this.paginationNextButton.click();  // Кликаем на кнопку следующей страницы
    await this.page.waitForTimeout(1000); // Ждем немного, чтобы страница успела загрузиться
  }
}
