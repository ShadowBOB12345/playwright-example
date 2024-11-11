import { test, expect } from '@playwright/test';
import { SearchPage } from '../pages/Search.page'; // Путь к вашему файлу

test('Поиск на ОЗОН', async ({ page }) => {
  const searchPage = new SearchPage(page);

  // Переходим на сайт
  await page.goto('https://www.ozon.ru');

  // Ищем по запросу
  await searchPage.search('ноутбук');

  // Проверяем, что результаты появились
  await searchPage.resultsAreVisible();

  // Проверяем, что хотя бы один результат содержит текст 'ноутбук'
  await searchPage.resultContains('ноутбук');

  // Применяем фильтр по цене
  await searchPage.filterByPrice(10000, 50000);

  // Применяем фильтр по категории
  await searchPage.filterByCategory('Электроника');

  // Проверяем количество результатов
  const count = await searchPage.getSearchResultsCount();
  console.log(`Количество найденных товаров: ${count}`);

  // Переходим на следующую страницу
  await searchPage.goToNextPage();
});