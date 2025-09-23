# Chatbot UI

This project is a simple and visually appealing chatbot application built with React.js and TypeScript. It features a user-friendly interface that allows users to interact with the chatbot seamlessly.

## Features

- **Chat Window**: A dedicated area for displaying messages and user interactions.
- **Message Bubbles**: Individual message components that differentiate between sent and received messages.
- **Input Box**: An intuitive input field for users to type and send messages.

## Project Structure

```
chatbot-ui
├── public
│   └── index.html          # Main HTML file
├── src
│   ├── components          # React components
│   │   ├── ChatWindow.tsx  # Main chat interface
│   │   ├── MessageBubble.tsx# Individual message representation
│   │   └── InputBox.tsx    # User input field
│   ├── styles              # CSS styles
│   │   ├── ChatWindow.module.css  # Styles for ChatWindow
│   │   ├── MessageBubble.module.css # Styles for MessageBubble
│   │   └── InputBox.module.css     # Styles for InputBox
│   ├── assets              # Images and icons
│   ├── App.tsx            # Main application component
│   └── index.tsx          # Entry point for the React application
├── package.json            # npm configuration
├── tsconfig.json           # TypeScript configuration
└── README.md               # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd chatbot-ui
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage

To start the application, run:
```
npm start
```
This will launch the app in your default web browser.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License.