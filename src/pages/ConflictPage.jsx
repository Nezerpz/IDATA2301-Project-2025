// src/pages/ConflictPage.jsx
import React from 'react';

function ConflictPage({ error }) {
    return (
        <div>
            <h1>409 - Conflict</h1>
            <p>{error}</p>
        </div>
    );
}

export default ConflictPage;