export class InventoryPage {
    constructor(page) {
        this.page = page;
        this.inventoryList = page.locator('.inventory_list');
        this.cartIcon = page.locator('.shopping_cart_link');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.backpackAddButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
        this.backpackRemoveButton = page.locator('[data-test="remove-sauce-labs-backpack"]');
    }

    async goto() {
        await this.page.goto('/inventory.html');
    }

    async addBackpackToCart() {
        await this.backpackAddButton.click();
    }

    async goToCart() {
        await this.cartIcon.click();
    }

    getAddButtonByProductName(productName) {
        const dataTest = `add-to-cart-${productName.toLowerCase().replace(/\s+/g, '-')}`;
        return this.page.locator(`[data-test="${dataTest}"]`);
    }
}
