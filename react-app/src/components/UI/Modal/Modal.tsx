import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { PortalProps, VoidFunction } from '../../../types';

const Modal = (props: PortalProps): React.ReactElement<PortalProps> => {
  const modalRoot = document.getElementById('modal-root') as HTMLElement;
  const modalWrapper = document.createElement('div');

  useEffect((): VoidFunction => {
    modalRoot.appendChild(modalWrapper);
    return (): void => {
      modalRoot.removeChild(modalWrapper);
    };
  });

  return ReactDOM.createPortal(props.children, modalWrapper);
};

export default Modal;
