import Modal from 'react-bootstrap/Modal'

export default function CustomModal({ children, showModal, handleClose, ...restProps }) {


    return (
        <>
            <Modal show={showModal} onHide={handleClose} {...restProps}>
                <Modal.Body>
                    {children}
                </Modal.Body>
            </Modal>
        </>
    )
}