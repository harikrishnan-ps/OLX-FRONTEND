# Project Structure

```text
olx-clone/
├── .vscode
│   ├── extensions.json
│   ├── launch.json
│   ├── mcp.json
│   └── tasks.json
├── public
│   ├── assets
│   │   └── mock-data
│   │       └── products.json
│   └── favicon.ico
├── src
│   ├── app
│   │   ├── core
│   │   │   ├── guards
│   │   │   │   └── auth.guard.ts
│   │   │   ├── interceptors
│   │   │   │   ├── auth.interceptor.ts
│   │   │   │   └── error.interceptor.ts
│   │   │   ├── models
│   │   │   │   ├── ad.model.ts
│   │   │   │   ├── api.models.ts
│   │   │   │   ├── category.model.ts
│   │   │   │   ├── chat.model.ts
│   │   │   │   ├── message.model.ts
│   │   │   │   ├── notification.model.ts
│   │   │   │   ├── product.model.ts
│   │   │   │   └── user.model.ts
│   │   │   └── services
│   │   │       ├── admin.service.ts
│   │   │       ├── auth.service.ts
│   │   │       ├── auth.spec.ts
│   │   │       ├── auth.ts
│   │   │       ├── categories.service.ts
│   │   │       ├── category.spec.ts
│   │   │       ├── category.ts
│   │   │       ├── chat.service.ts
│   │   │       ├── chat.spec.ts
│   │   │       ├── chat.ts
│   │   │       ├── cms.service.ts
│   │   │       ├── locations.service.ts
│   │   │       ├── media.service.ts
│   │   │       ├── notification.spec.ts
│   │   │       ├── notification.ts
│   │   │       ├── notifications.service.ts
│   │   │       ├── product.spec.ts
│   │   │       ├── product.ts
│   │   │       ├── products.service.ts
│   │   │       ├── reviews.service.ts
│   │   │       ├── user.spec.ts
│   │   │       ├── user.ts
│   │   │       ├── users.service.ts
│   │   │       └── wishlist.service.ts
│   │   ├── layout
│   │   │   ├── footer
│   │   │   │   ├── footer.css
│   │   │   │   ├── footer.html
│   │   │   │   ├── footer.scss
│   │   │   │   ├── footer.spec.ts
│   │   │   │   └── footer.ts
│   │   │   └── navbar
│   │   │       ├── navbar.css
│   │   │       ├── navbar.html
│   │   │       ├── navbar.scss
│   │   │       ├── navbar.spec.ts
│   │   │       └── navbar.ts
│   │   ├── pages
│   │   │   ├── admin
│   │   │   │   ├── admin-banners
│   │   │   │   │   ├── admin-banners.css
│   │   │   │   │   ├── admin-banners.html
│   │   │   │   │   └── admin-banners.ts
│   │   │   │   ├── admin-categories
│   │   │   │   │   ├── admin-categories.css
│   │   │   │   │   ├── admin-categories.html
│   │   │   │   │   └── admin-categories.ts
│   │   │   │   ├── admin-cms
│   │   │   │   │   ├── admin-cms.css
│   │   │   │   │   ├── admin-cms.html
│   │   │   │   │   └── admin-cms.ts
│   │   │   │   ├── admin-dashboard
│   │   │   │   │   ├── admin-dashboard.css
│   │   │   │   │   ├── admin-dashboard.html
│   │   │   │   │   └── admin-dashboard.ts
│   │   │   │   ├── admin-layout
│   │   │   │   │   ├── admin-layout.css
│   │   │   │   │   ├── admin-layout.html
│   │   │   │   │   └── admin-layout.ts
│   │   │   │   ├── admin-listings
│   │   │   │   │   ├── admin-listings.css
│   │   │   │   │   ├── admin-listings.html
│   │   │   │   │   └── admin-listings.ts
│   │   │   │   ├── admin-reports
│   │   │   │   │   ├── admin-reports.css
│   │   │   │   │   ├── admin-reports.html
│   │   │   │   │   └── admin-reports.ts
│   │   │   │   ├── admin-reviews
│   │   │   │   │   ├── admin-reviews.css
│   │   │   │   │   ├── admin-reviews.html
│   │   │   │   │   └── admin-reviews.ts
│   │   │   │   └── admin-users
│   │   │   │       ├── admin-users.css
│   │   │   │       ├── admin-users.html
│   │   │   │       └── admin-users.ts
│   │   │   ├── category-page-cars
│   │   │   │   ├── category-page-cars.css
│   │   │   │   ├── category-page-cars.html
│   │   │   │   ├── category-page-cars.spec.ts
│   │   │   │   └── category-page-cars.ts
│   │   │   ├── chat-interface
│   │   │   │   ├── chat-interface.css
│   │   │   │   ├── chat-interface.html
│   │   │   │   ├── chat-interface.scss
│   │   │   │   ├── chat-interface.spec.ts
│   │   │   │   └── chat-interface.ts
│   │   │   ├── favourites-page
│   │   │   │   ├── favourites-page.css
│   │   │   │   ├── favourites-page.html
│   │   │   │   ├── favourites-page.spec.ts
│   │   │   │   └── favourites-page.ts
│   │   │   ├── forgot-password
│   │   │   │   ├── forgot-password.html
│   │   │   │   └── forgot-password.ts
│   │   │   ├── home-page
│   │   │   │   ├── home-page.css
│   │   │   │   ├── home-page.html
│   │   │   │   ├── home-page.scss
│   │   │   │   ├── home-page.spec.ts
│   │   │   │   └── home-page.ts
│   │   │   ├── login-page
│   │   │   │   ├── login-page.css
│   │   │   │   ├── login-page.html
│   │   │   │   ├── login-page.scss
│   │   │   │   ├── login-page.spec.ts
│   │   │   │   └── login-page.ts
│   │   │   ├── my-ads-dashboard
│   │   │   │   ├── my-ads-dashboard.css
│   │   │   │   ├── my-ads-dashboard.html
│   │   │   │   ├── my-ads-dashboard.spec.ts
│   │   │   │   └── my-ads-dashboard.ts
│   │   │   ├── not-found-page
│   │   │   │   └── not-found-page.ts
│   │   │   ├── notifications-page
│   │   │   │   ├── notifications-page.css
│   │   │   │   ├── notifications-page.html
│   │   │   │   ├── notifications-page.scss
│   │   │   │   ├── notifications-page.spec.ts
│   │   │   │   └── notifications-page.ts
│   │   │   ├── post-an-ad
│   │   │   │   ├── post-an-ad.css
│   │   │   │   ├── post-an-ad.html
│   │   │   │   ├── post-an-ad.scss
│   │   │   │   ├── post-an-ad.spec.ts
│   │   │   │   └── post-an-ad.ts
│   │   │   ├── product-details
│   │   │   │   ├── product-details.css
│   │   │   │   ├── product-details.html
│   │   │   │   ├── product-details.scss
│   │   │   │   ├── product-details.spec.ts
│   │   │   │   └── product-details.ts
│   │   │   ├── registration-page
│   │   │   │   ├── registration-page.css
│   │   │   │   ├── registration-page.html
│   │   │   │   ├── registration-page.spec.ts
│   │   │   │   └── registration-page.ts
│   │   │   ├── reset-password
│   │   │   │   ├── reset-password.html
│   │   │   │   └── reset-password.ts
│   │   │   ├── search-results
│   │   │   │   ├── search-results.css
│   │   │   │   ├── search-results.html
│   │   │   │   ├── search-results.scss
│   │   │   │   ├── search-results.spec.ts
│   │   │   │   └── search-results.ts
│   │   │   ├── user-profile
│   │   │   │   ├── user-profile.css
│   │   │   │   ├── user-profile.html
│   │   │   │   ├── user-profile.spec.ts
│   │   │   │   └── user-profile.ts
│   │   │   └── verify-otp
│   │   │       ├── verify-otp.html
│   │   │       └── verify-otp.ts
│   │   ├── shared
│   │   │   ├── category-menu
│   │   │   │   ├── category-menu.css
│   │   │   │   ├── category-menu.html
│   │   │   │   ├── category-menu.scss
│   │   │   │   ├── category-menu.spec.ts
│   │   │   │   └── category-menu.ts
│   │   │   ├── components
│   │   │   │   └── navbar
│   │   │   │       ├── navbar.component.html
│   │   │   │       ├── navbar.component.scss
│   │   │   │       └── navbar.component.ts
│   │   │   ├── empty-state
│   │   │   │   ├── empty-state.css
│   │   │   │   ├── empty-state.html
│   │   │   │   ├── empty-state.spec.ts
│   │   │   │   └── empty-state.ts
│   │   │   ├── filter-sidebar
│   │   │   │   ├── filter-sidebar.css
│   │   │   │   ├── filter-sidebar.html
│   │   │   │   ├── filter-sidebar.scss
│   │   │   │   ├── filter-sidebar.spec.ts
│   │   │   │   └── filter-sidebar.ts
│   │   │   ├── image-gallery
│   │   │   │   ├── image-gallery.css
│   │   │   │   ├── image-gallery.html
│   │   │   │   ├── image-gallery.spec.ts
│   │   │   │   └── image-gallery.ts
│   │   │   ├── image-upload
│   │   │   │   ├── image-upload.css
│   │   │   │   ├── image-upload.html
│   │   │   │   └── image-upload.ts
│   │   │   ├── loading-skeleton
│   │   │   │   ├── loading-skeleton.css
│   │   │   │   ├── loading-skeleton.html
│   │   │   │   ├── loading-skeleton.spec.ts
│   │   │   │   └── loading-skeleton.ts
│   │   │   ├── location-picker
│   │   │   │   ├── location-picker.css
│   │   │   │   ├── location-picker.html
│   │   │   │   └── location-picker.ts
│   │   │   ├── product-card
│   │   │   │   ├── product-card.css
│   │   │   │   ├── product-card.html
│   │   │   │   ├── product-card.scss
│   │   │   │   ├── product-card.spec.ts
│   │   │   │   └── product-card.ts
│   │   │   ├── reviews-list
│   │   │   │   ├── reviews-list.css
│   │   │   │   ├── reviews-list.html
│   │   │   │   └── reviews-list.ts
│   │   │   ├── search-bar
│   │   │   │   ├── search-bar.css
│   │   │   │   ├── search-bar.html
│   │   │   │   ├── search-bar.scss
│   │   │   │   ├── search-bar.spec.ts
│   │   │   │   └── search-bar.ts
│   │   │   └── seller-card
│   │   │       ├── seller-card.css
│   │   │       ├── seller-card.html
│   │   │       ├── seller-card.scss
│   │   │       ├── seller-card.spec.ts
│   │   │       └── seller-card.ts
│   │   ├── app.config.ts
│   │   ├── app.css
│   │   ├── app.html
│   │   ├── app.routes.ts
│   │   ├── app.spec.ts
│   │   └── app.ts
│   ├── assets
│   │   ├── icons
│   │   ├── images
│   │   │   ├── banners
│   │   │   ├── categories
│   │   │   ├── products
│   │   │   └── users
│   │   └── mock-data
│   │       ├── categories.json
│   │       ├── messages.json
│   │       ├── notifications.json
│   │       ├── products.json
│   │       └── users.json
│   ├── environments
│   │   ├── environment.development.ts
│   │   ├── environment.production.ts
│   │   └── environment.ts
│   ├── styles
│   │   ├── _animations.scss
│   │   ├── _components.scss
│   │   ├── _mixins.scss
│   │   ├── _reset.scss
│   │   ├── _typography.scss
│   │   ├── _utilities.scss
│   │   └── _variables.scss
│   ├── index.html
│   ├── main.ts
│   ├── material-theme.scss
│   ├── styles.css
│   └── styles.scss
├── .editorconfig
├── .gitignore
├── .prettierrc
├── angular.json
├── olx_api_documentation_table.html
├── package-lock.json
├── package.json
├── proxy.conf.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
└── tsconfig.spec.json
```
