# Frontend Setup and Usage Guide

## Prerequisites
- Node.js (version 18 or higher)
- npm (Node Package Manager)

## Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Install required shadcn components:
```bash
npm install @types/node --save-dev
```

## Development

1. Start the development server:
```bash
npm run dev
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── layout.jsx        # Root layout component
│   │   ├── page.jsx          # Home page
│   │   └── products/
│   │       └── page.jsx      # Products page
│   ├── components/           # Reusable components
│   └── lib/                  # Utility functions and configurations
├── public/                   # Static assets
└── package.json             # Project dependencies and scripts
```

## Available Routes

- Home: [http://localhost:3000](http://localhost:3000)
- Products: [http://localhost:3000/products](http://localhost:3000/products)

## API Integration

The frontend is configured to communicate with the backend API running on `http://localhost:5000`. Make sure the backend server is running before testing the frontend.

## Features

- Modern UI with shadcn components
- Responsive design
- Product listing and management
- Error handling and loading states

## Troubleshooting

If you encounter any issues:

1. Check if all dependencies are installed correctly
2. Ensure the backend server is running
3. Check the browser console for any error messages
4. Verify that the API endpoints are correct in the code

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

This project is licensed under the MIT License.
