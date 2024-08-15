import React from 'react';
import styles from './Modal.module.css';

export function Modal({ isOpen, onClose, children }) {
        if (!isOpen) return null;

        return (
                <div className={styles.modalOverlay} onClick={onClose}>
                        <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                                {children}
                                <button className={styles.closeButton} onClick={onClose}>
                                        &times;
                                </button>
                        </div>
                </div>
        );
};