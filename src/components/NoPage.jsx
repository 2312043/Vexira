import { Outlet, Link } from "react-router-dom";

function NoPage(){
    return (
        <div class="row">
                <div class="card-c">
                                <h2>Error 404</h2>
                                <h5>Page Not Found.</h5>
                                <button class="btn btn-primary btn-sm">
                                <Link to="/" className="col-sm-12">Go to Home Page</Link>
                                </button>
                            </div>
                </div>
    )
}

export default NoPage