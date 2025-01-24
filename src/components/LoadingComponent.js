import { useLoading } from "../context/LoadingContext";

const LoadingComponent = ({ size = "md", message = "Cargando.."}) => {

    const sizes = {
        sm: "spinner-border-sm",
        md: "",
        lg: "spinner-border-lg",
    }[size]

    const { isLoading, loadingMessage } = useLoading()

    if(!isLoading) return null;
    
    return (
        <div className="d-flex flex-column align-items-center justify-content-center vh-100"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1050
        }}
        >
          <div className={`spinner-border text-primary ${sizes}`} role="status">
            <span className="visually-hidden">{loadingMessage}</span>
          </div>
          {message && <p className="mt-3">{message}</p>}
        </div>
      );
}

export { LoadingComponent }