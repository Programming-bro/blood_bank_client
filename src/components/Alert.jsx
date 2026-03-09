const Alert = ({ message, type }) => {
    if (!message) return null;

    const bgColor = type === "success" ? "bg-green-100 border-green-400 text-green-700" : "bg-red-100 border-red-400 text-red-700";

    return (
        <div className={`border-l-4 p-4 mb-4 rounded shadow-sm animate-bounce-in ${bgColor}`} role="alert">
            <p className="font-bold">{type === "success" ? "Success" : "Error"}</p>
            <p>{message}</p>
        </div>
    );
};

export default Alert;