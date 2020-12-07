import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderStyle:'none!important'
    },

})



export default function ModalComponent(props) {

    const classes = useStyles()
    return (
        <>
               <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                className={classes.modal}
                open={props.open}
                onClose={props.handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
               {props.children}
            </Modal>
        </>
    )
}
