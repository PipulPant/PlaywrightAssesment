export class CheckoutPage {
    constructor(page) {
        this.page = page;

        // Info fields
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.cancelButton = page.locator('[data-test="cancel"]');

        // Review fields
        this.finishButton = page.locator('[data-test="finish"]');
        this.summaryInfo = page.locator('.summary_info');

        // Finish fields
        this.completeHeader = page.locator('.complete-header');
        this.backToProductsButton = page.locator('[data-test="back-to-products"]');
    }

    async fillInformation(firstName, lastName, postalCode) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
        await this.continueButton.click();
    }

    async finishCheckout() {
        await this.finishButton.click();
    }
}
