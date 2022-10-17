import React from 'react';
import ReactDOM from 'react-dom';
import { PortalProps } from '../../../types';

class Modal extends React.Component<PortalProps> {
  modalRoot: HTMLElement;
  modalWrapper: HTMLElement;

  constructor(props: PortalProps) {
    super(props);
    this.modalRoot = document.getElementById('modal-root') as HTMLElement;
    this.modalWrapper = document.createElement('div');
  }

  componentDidMount(): void {
    this.modalRoot.appendChild(this.modalWrapper);
  }

  componentWillUnmount(): void {
    this.modalRoot.removeChild(this.modalWrapper);
  }

  render(): React.ReactElement<PortalProps> {
    return ReactDOM.createPortal(this.props.children, this.modalWrapper);
  }
}

export default Modal;
