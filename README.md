# Ozon Search Test Automation

This project is an automated test suite for the Ozon website's search functionality using Playwright and TypeScript. It implements the Page Object Model (POM) design pattern for better code maintainability and reusability.

### Description

- **`Search.page.ts`**: This file contains the Page Object Model for interacting with the search functionality on Ozon. It defines methods for searching, filtering by price, filtering by category, and interacting with search results.
  
- **`search.spec.ts`**: This is the test file where search functionality is tested. It checks if the search bar is visible, searches for a product, and verifies the results.

- **`playwright.config.ts`**: This file contains the configuration settings for Playwright, including the base URL of Ozon, timeouts, retries, and browser settings.

## Prerequisites

Before running the tests, ensure that you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or later)
- [Playwright](https://playwright.dev/) (can be installed using the provided `package.json`)

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-directory>
