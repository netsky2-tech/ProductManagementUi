import { useState } from "react";

const ToastNotifications = ({title, message, show}) => {

    return (
        show && (
            <div 
             id="liveToast" 
             className="toast show position-fixed bottom-0 end-0 p-3"
             role="alert" 
             aria-live="assertive" 
             aria-atomic="true"
             data-bs-autohide="true"
             >
                <div className="toast-header">
                <strong className="me-auto">{title}</strong>
                <small>Ahora</small>
                <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Cerrar"></button>
                </div>
                <div className="toast-body">
                {message}
                </div>
            </div>
        )
    );
}

export { ToastNotifications }