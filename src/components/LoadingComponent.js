const LoadingComponent = ({ size = "md", message = "Cargando.."}) => {

    const sizes = {
        sm: "spinner-border-sm",
        md: "",
        lg: "spinner-border-lg",
    }[size]

    return (
        <div className="d-flex flex-column align-items-center justify-content-center vh-100">
          <div className={`spinner-border text-primary ${sizes}`} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          {message && <p className="mt-3">{message}</p>}
        </div>
      );
}

export { LoadingComponent }