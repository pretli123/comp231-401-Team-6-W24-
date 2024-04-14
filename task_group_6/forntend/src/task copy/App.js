import React, { useState } from 'react';
import Modal from 'react-modal';

export default function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Open Modal</button>
      <Modal isOpen={showModal} onRequestClose={() => setShowModal(false)}>
        <h2>Modal Content</h2>
        <button onClick={() => setShowModal(false)}>Close</button>
      </Modal>
    </div>
  );
}