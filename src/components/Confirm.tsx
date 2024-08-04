import {
    Button, Dialog, DialogActions,
    DialogContent, DialogContentText, DialogTitle,
} from '@mui/material';

type AlertDialogPropsType = {
    open: boolean
    handleClose: () => void
    handleAgree: () => void
    handleDisagree?: () => void
    title: string
    content: string
    agreeTitle: string
    disagreeTitle: string
}

export const Confirm = ({open, handleClose, handleAgree, handleDisagree, title, agreeTitle, disagreeTitle, content}:AlertDialogPropsType) => {

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDisagree ?? handleClose}>{disagreeTitle}</Button>
                <Button onClick={handleAgree} autoFocus>
                    {agreeTitle}
                </Button>
            </DialogActions>
        </Dialog>
    );
}