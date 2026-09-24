# Product Images

This project ships with **generative placeholder art** instead of real
photography — see `client/src/components/ProductArt.jsx`. Every product
renders as a distinct, elegant bottle illustration driven by its `tone`/
`accent` colors, so nothing looks like a broken image and the catalog
still reads as cohesive.

## Replacing placeholder art with real photography

1. Shoot or license three images per product (main, alternate, detail),
   export as optimized `.webp`, and drop them here following the naming
   pattern already referenced in `server/seed/seed.js`:

   ```
   /images/products/<slug>-1.webp
   /images/products/<slug>-2.webp
   /images/products/<slug>-3.webp
   ```

2. In `client/src/components/ProductCard.jsx`,
   `client/src/pages/ProductDetails.jsx`, and
   `client/src/components/QuickViewModal.jsx`, swap
   `<ProductArt tone={...} accent={...} variant={...} />` for
   `<img src={product.images[i]} alt={product.name} loading="lazy" />`.

3. Update `client/src/data/products.js` (and the `Product` model /
   `seed.js` on the backend) to include an `images: []` array per
   product, matching the API shape already defined in the `Product`
   Mongoose model.

No other code changes are required — every component that renders a
product image does so through this one swap point.
