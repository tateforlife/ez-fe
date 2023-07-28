import React from 'react';
import {
    Grid,
    Stack,
    Dialog,
    DialogTitle,
    Button,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import './style.css';

const SignDialog = (props) => {
    const { onClose, open, setImage, isLoading } = props;
    const [ref, setRef] = React.useState();

    React.useEffect(() => {
        const canvas = document.getElementById('canvas');
        if (canvas) {
            const parent = document.getElementsByClassName('sign-parent')[0];
            const ctx = canvas.getContext('2d')
            ctx.canvas.width = canvas.clientWidth;
            ctx.canvas.height = canvas.clientHeight;
            let coord = { x: 0, y: 0 };
        
            document.addEventListener("mousedown", start);
            document.addEventListener("touchstart", start);
            document.addEventListener("mouseup", stop);
            document.addEventListener("touchend", stop);
        
            function reposition(e) {
                let x, y;
                if(e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel'){
                    var evt = (typeof e.originalEvent === 'undefined') ? e : e.originalEvent;
                    var touch = evt.touches[0] || evt.changedTouches[0];
                    x = touch.pageX;
                    y = touch.pageY;
                } else if (e.type == 'mousedown' || e.type == 'mouseup' || e.type == 'mousemove' || e.type == 'mouseover'|| e.type=='mouseout' || e.type=='mouseenter' || e.type=='mouseleave') {
                    x = e.clientX;
                    y = e.clientY;
                }
                const tempX = x - ((window.innerWidth - parent.clientWidth) / 2) - 33;
                const tempY = y - ((window.innerHeight - parent.clientHeight) / 2) - 33;
                coord.x = tempX;
                coord.y = tempY;
            }
            function start(event) {
                document.addEventListener("mousemove", draw);
                document.addEventListener("touchmove", draw);
                reposition(event);
            }
            function stop() {
                document.removeEventListener("mousemove", draw);
                document.removeEventListener("touchmove", draw);
            }
            function draw(event) {
                ctx.beginPath();
                ctx.lineWidth = 5;
                ctx.lineCap = "round";
                ctx.strokeStyle = "000000";
                ctx.moveTo(coord.x, coord.y);
                reposition(event);
                ctx.lineTo(coord.x, coord.y);
                ctx.stroke();
                
                // console.log(canvas.toDataURL())
            }
        }
    }, [ref]);

    const handleClose = () => onClose();
  
    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Draw a signature</DialogTitle>
            <div className='sign-parent'>
                <canvas ref={ref => setRef(ref)} id="canvas"></canvas>
                <Grid container columnSpacing={2}>
                    <Grid item xs={12}>
                        <Stack direction="row" justifyContent="space-between">
                            <Button
                                variant="contained"
                                onClick={onClose}
                                color="error"
                            >
                                Close
                            </Button>
                            <LoadingButton
                                loading={isLoading}
                                color="success"
                                loadingPosition="start"
                                startIcon={<SaveIcon />}
                                variant="contained"
                                onClick={() => {
                                    setImage(ref.toDataURL());
                                }}
                            >
                                Sign
                            </LoadingButton>
                        </Stack>
                    </Grid>
                </Grid>
            </div>
        </Dialog>
    );
};

export default SignDialog;
