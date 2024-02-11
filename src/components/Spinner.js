const Spinner = () => {
    return (
    <>
    <div className="spinner-border text-dark mb-3 mt-5" style={{width: "4rem", height: "4rem"}} role="status">
        <span className="sr-only"></span>
    </div>
    <h4>Loading...</h4>
    </>
    );
}

export default Spinner;