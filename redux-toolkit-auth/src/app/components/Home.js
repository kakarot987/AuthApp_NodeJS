import React, { useState } from 'react';
import './Home.css'; // Import your custom CSS for styling

function HomePage() {
  const [activeButton, setActiveButton] = useState(null);

  const sections = {
    securityInfo: {
      title: 'Security Information',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae metus non elit lacinia cursus.',
    },
    jwtInfo: {
      title: 'JWT Information',
      content: 'Information about JSON Web Tokens (JWT) and their usage.',
    },
    reactJsInfo: {
      title: 'ReactJS Information',
      content: 'Information about ReactJS and its features.',
    },
    nodeJsInfo: {
      title: 'NodeJS Information',
      content: 'Information about Node.js and server-side JavaScript.',
    },
  };

  const toggleSection = (section) => {
    setActiveButton(section);
  };

  return (
    <div className="home-page">
      <h1>Welcome to My React Security App</h1>
      <p>This is a simple home page with interactive security information.</p>

      <div className="horizontal-buttons">
        {Object.keys(sections).map((section) => (
          <button
            key={section}
            className={`toggle-button ${
              activeButton === section ? 'active' : ''
            }`}
            onClick={() => toggleSection(section)}
          >
            {activeButton === section
              ? `Hide ${sections[section].title}`
              : `Show ${sections[section].title}`}
          </button>
        ))}
      </div>

      {activeButton && (
        <div className="security-info visible">
          <h2>{sections[activeButton].title}</h2>
          <p>{sections[activeButton].content}</p>
        </div>
      )}
    </div>
  );
}

export default HomePage;
