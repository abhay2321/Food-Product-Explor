# Food-Product-Explorer

A simple React application to search and explore food products using the Open Food Facts API.

## Features

- Search products by name or barcode
- Filter by food categories
- Sort results
- Responsive design for all devices
- Clean, user-friendly interface

## How It Works

1. **Search Functionality**
   - Type any food name in the search bar
   - Or Enter the barcode

2. **Category Filtering**
   - Select from popular food categories
   - See only relevant products

3. **Sorting Options**
   - Sort by name (A-Z or Z-A)
   - Sort by nutrition grade

## Installation
```
# 1. Clone the repository
git clone https://github.com/yourusername/food-product-explorer.git

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```
## Technologies Used
- React
- CSS
- Open Food Facts API
- Axios for API calls

## Troubleshooting
If you encounter any issues:
- Make sure all dependencies are installed
- Check your internet connection
- Verify the API is available

## Challenges I Faced (And Fixed!)
1.Problem: Categories weren't filtering right
  Solution: Found the perfect API endpoint after some tasty debugging

2.Problem: Mobile view was messy
  Solution: Redesigned the layout to be more flexible

3.Problem: Search felt slow
  Solution: Added a slight delay before searching (debouncing)

## What's Next?
I'm thinking about adding:
- ❤️ Favorite products feature
- 📊 Better nutrition visuals
- 🌍 Multi-language support
- 🧪 More tests for reliability

## License
MIT License - free to use and modify
