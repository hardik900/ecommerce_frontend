import { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./Foods.css"

const Foods = () => {

    // __________ GET API CALL FOR FETCHING DATA __________

    const [data, setData] = useState([])
    const [status, setStatus] = useState(false)

    const CallApi = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("https://ecommerce-backend-2-sy5y.onrender.com/foods", requestOptions)
            .then(response => response.json())
            .then(result => {
                setData(result)
                setStatus(true)
            })
            .catch(error => console.log('error', error));
    }

    // __________ GET API CALL FOR FETCHING DATA __________

    // __________ POST API CALL FOR ADDING DATA __________

    const [postData, setpostData] = useState({
        name: "",
        price: 0,
        image1: "",
        image2: "",
        image3: "",
        status: ""
    });

    function empty(){
        postData.name = ""
        postData.price = ""
        postData.image1 = ""
        postData.image2 = ""
        postData.image3 = ""
    }

    useEffect(() => {
        CallApi()
    }, [!postData.name])

    const [show, setShow] = useState(false);

    const handleClose = () => {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(postData);

        console.log(raw)

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        if(postData.name && postData.price && postData.image1 && postData.image2 && postData.image3){
            fetch("https://ecommerce-backend-2-sy5y.onrender.com/createfood", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setShow(false);
                if(postData.name && postData.image1){
                    CallApi()
                    empty()
                }
            })
            .catch(error => console.log('error', error));
        }else{
            setShow(false);
        }

        // 
    }
    const handleShow = () => setShow(true);
   
    const [SingleData, setSingleData] = useState({
        name: "",
        price: 0,
        image1: "",
        image2: "",
        image3: "",
        status: ""
    });
    const [singleDataStatus, setsingleDataStatus] = useState(false);

    const [showUpdate, setShowUpdate] = useState(false);

    const handleCloseUpdate = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(SingleData);

        var requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://ecommerce-backend-2-sy5y.onrender.com/food/" + SingleData._id, requestOptions)
            .then(response => response.text())
            .then(result => {
                setShowUpdate(false);
                setsingleDataStatus(false)
                CallApi()
            })
            .catch(error => console.log('error', error));
}

    const handleShowUpdate = (e) => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("https://ecommerce-backend-2-sy5y.onrender.com/food/" + e, requestOptions)
            .then(response => response.json())
            .then(result => {
                setShowUpdate(true);
                setSingleData(result)
                setsingleDataStatus(true)
            })
            .catch(error => console.log('error', error));
    }


    console.log("SingleData", SingleData)
    // __________ UPDATE API CALL FOR ADDING DATA __________




    // __________ DELETE API CALL FOR ADDING DATA __________

    const DeletetheData = (e) => {
        var requestOptions = {
            method: 'DELETE',
            redirect: 'follow'
        };

        fetch("https://ecommerce-backend-2-sy5y.onrender.com/food/" + e, requestOptions)
            .then(response => response.text())
            .then(result => {
                CallApi()
            })
            .catch(error => console.log('error', error));
    }

    // __________ DELETE API CALL FOR ADDING DATA __________

    return (
        <>
            {
                status ?
                    <>
                        <button className="btn btn-primary m-auto d-block my-3" onClick={handleShow}>Add Products</button>
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    {/* <th>Image</th> */}
                                    <th>Name</th>  
                                    <th>Image1</th>  
                                    <th>Image2</th>  
                                    <th>Image3</th>  
                                    <th>Price</th>
                                    {/* <th>Price</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((items, i) => (
                                    <tr>
                                        {/* <td><img src={items.image} width={`10%`}/></td> */}
                                        <td>{items.name}</td>
                                        <td className = "imgBox">
                                            <img className="imageSize" src={items.image1} />
                                        </td>
                                        <td className = "imgBox">
                                            <img className="imageSize" src={items.image2} />
                                        </td>
                                        <td className = "imgBox">
                                            <img className="imageSize" src={items.image3} />
                                        </td>
                                        <td>₹ {items.price}</td>
                                        <td>
                                            <button className="btn btn-primary mx-auto d-block my-1" onClick={() => handleShowUpdate(items._id)}>Edit</button>
                                            <button className="btn btn-danger mx-auto d-block my-1" onClick={() => DeletetheData(items._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                    </> : 
                    <div className="loaderContainer">
                        <div className="loader"></div>
                    </div>
            }


            {/* ______________________ ADD FOOD MODAL ______________________  */}

            <Modal show={show} onHide={handleClose} className="foodAdd">
                <Modal.Header closeButton>
                    <Modal.Title>Add Products</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container-fluid">
                        <div className="row">

                            <div className="col-6">
                                <label className="my-2">Enter name of Products</label>
                                <input type="text" onChange={(e) => setpostData(postData => ({ ...postData, ...{ name: e.target.value } }))} />
                            </div>

                            <div className="col-6">
                                <label className="my-2">Enter Price of Products</label>
                                <input type="number" onChange={(e) => setpostData(postData => ({ ...postData, ...{ price: Number(e.target.value) } }))} />
                            </div>

                            <div className="col-6">
                                <label className="my-2">Enter image1 url</label>
                                <input type="text"  onChange={(e) => setpostData(postData => ({ ...postData, ...{ image1: e.target.value } }))} />
                            </div>

                            <div className="col-6">
                                <label className="my-2">Enter image2 url</label>
                                <input type="text"  onChange={(e) => setpostData(postData => ({ ...postData, ...{ image2: e.target.value } }))} />
                            </div>

                            <div className="col-6">
                                <label className="my-2">Enter image3 url</label>
                                <input type="text"  onChange={(e) => setpostData(postData => ({ ...postData, ...{ image3: e.target.value } }))} />
                            </div>

                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>

            {/*______________________ ADD FOOD MODAL  ______________________*/}




            {/* ______________________ UPDATE FOOD MODAL ______________________ */}

            <Modal show={showUpdate} onHide={handleCloseUpdate} className="foodAdd">
                <Modal.Header closeButton>
                    <Modal.Title>Update Products</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {singleDataStatus ? <div className="container-fluid">
                        <div className="row">


                            <div className="col-6">
                                <label className="my-2">Enter Name of Products</label>
                                <input type="text" value={SingleData.name} onChange={(e) => setSingleData(postData => ({ ...postData, ...{ name: e.target.value } }))} />
                            </div>

                            <div className="col-6">
                                <label className="my-2">Enter Price of Products</label>
                                <input type="number" value={SingleData.price}  onChange={(e) => setSingleData(postData => ({ ...postData, ...{ price: Number(e.target.value) } }))} />
                            </div>

                            <div className="col-6">
                                <label className="my-2">Enter image1 url</label>
                                <input type="text" value={SingleData.image1}  onChange={(e) => setSingleData(postData => ({ ...postData, ...{ image1: e.target.value } }))} />
                            </div>

                            <div className="col-6">
                                <label className="my-2">Enter image2 url</label>
                                <input type="text" value={SingleData.image2}  onChange={(e) => setSingleData(postData => ({ ...postData, ...{ image2: e.target.value } }))} />
                            </div>

                            <div className="col-6">
                                <label className="my-2">Enter image3 url</label>
                                <input type="text" value={SingleData.image2}  onChange={(e) => setSingleData(postData => ({ ...postData, ...{ image3: e.target.value } }))} />
                            </div>

                        </div>
                    </div> : 
                    <div className="loaderContainer">
                        <div className="loader"></div>
                    </div>
                }

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleCloseUpdate}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* ______________________ UPDATE FOOD MODAL ______________________ */}
        </>
    );
}

export default Foods;
