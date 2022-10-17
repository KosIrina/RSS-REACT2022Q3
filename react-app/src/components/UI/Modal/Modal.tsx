import React from 'react';
import ReactDOM from 'react-dom';
import { PortalProps } from '../../../types';

const modalRoot = document.getElementById('modal-root') as HTMLElement;

class Modal extends React.Component<PortalProps> {
  modalWrapper: HTMLElement;

  constructor(props: PortalProps) {
    super(props);
    this.modalWrapper = document.createElement('div');
  }

  componentDidMount(): void {
    modalRoot.appendChild(this.modalWrapper);
  }

  componentWillUnmount(): void {
    modalRoot.removeChild(this.modalWrapper);
  }

  render(): React.ReactElement<PortalProps> {
    return ReactDOM.createPortal(this.props.children, this.modalWrapper);
  }
}

export default Modal;
