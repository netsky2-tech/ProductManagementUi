const ToastNotifications = ({title, message}) => {
    return (
        <div class="toast-container position-fixed bottom-0 end-0 p-3" data-bs-autohide="true">
            <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                <strong class="me-auto">{title}</strong>
                <small>Ahora</small>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Cerrar"></button>
                </div>
                <div class="toast-body">
                {message}
                </div>
            </div>
        </div>
    );
}

export { ToastNotifications }