import React from 'react'

export default function Form(props) {
    return (
        <div className="container py-3">
            <form onSubmit={ props.loadData }>
                <div className="row">
                    <div className="col-sm-3 offset-sm-2">
                        <input type="text" className="form-control" name="country" placeholder="Enter a Country" />
                    </div>

                    <div className="col-sm-3">
                        <input type="text" className="form-control" name="city" placeholder="Enter a City" />
                    </div>

                    <div className="col-sm-3 mt-md-0">
                        <button className="btn btn-success font-weight-bold btn-lg"> Get Weather</button>
                    </div>

                </div>
            </form>
            { props.error ?

                <div className="contanier py-3">
                    <div className=" alert alert-warning alert-dismissible  ">
                        <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                        <strong>Warning!</strong> You should <a href="#" className="alert-link">Enter a valid country and City</a>.
                </div>
                </div>

                :
                null
            }
        </div >
    )
}
