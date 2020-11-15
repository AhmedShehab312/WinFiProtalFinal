import React from 'react';
import { Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { CardBody } from 'reactstrap';
import { InputWithText } from '../../App/components/ComponentModule'
import Aux from "../../hoc/_Aux";
import TableData from '../../App/components/Tables/TablesComp';
import './PackagesStyle.scss';
import i18n from '../../i18n';
import { HtttpDeleteDefult, HtttpPostDefult, HtttpPutDefult, HtttpGetDefult } from '../../actions/httpClient';
import { connect } from 'react-redux';
import { displayToast } from '../../globals/globals';
import { StorePackages } from '../../store/actions/PackagesAction';


class Packages extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Packages: null,
            newPackage: {},
            showAdd: false,
            showEdit: false,
            showDetails: false,
            selectedPackage: null,
            selectedPackageIndex: null,
            btnDisableEdit: true,
            EditArr: [],
            btnDisableAdd: true,
            AddArr: [],
            btnDisableAdd: true,

        }
    }


    async componentDidMount() {
        const { StorePackages } = this.props;
        let Result;
        await HtttpGetDefult('package/list', true).then((res) => {
            if (res) {
                Result = res;
                StorePackages(res);
            }
        })

        let Packages = await Result.filter((Item) => {
            return Item.isDeleted == false;
        })

        this.setState({ Packages: Packages });
        setTimeout(
            () => this.setState({ Packages: Packages }),
            10
        );

    }

    Details(item) {
        this.setState({ selectedPackage: item, showDetails: true })

    }

    Edit(item, index) { this.setState({ selectedPackage: item, selectedPackageIndex: index, showEdit: true }); }

    Add() { this.setState({ showAdd: true, newPackage: {} }) }


    headCells = [
        { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
        { id: 'smsCount', numeric: false, disablePadding: true, label: 'SMS Count' },
        { id: 'notificationCount', numeric: false, disablePadding: true, label: 'Notification Count' },
        { id: 'emailCount', numeric: false, disablePadding: true, label: 'Email Count' },
    ];


    DataShowPerTable = ["name", "smsCount", "notificationCount", "emailCount"];


    async changeAddInput(Input, val) {
        switch (Input) {
            case 'name':
                this.setState({
                    newPackage: {
                        ...this.state.newPackage,
                        name: val
                    }
                })
                break;
            case 'smsCount':
                this.setState({
                    newPackage: {
                        ...this.state.newPackage,
                        smsCount: val
                    }
                })
                break;
            case 'notificationCount':
                this.setState({
                    newPackage: {
                        ...this.state.newPackage,
                        notificationCount: val
                    }
                })
                break;
            case 'emailCount':
                this.setState({
                    newPackage: {
                        ...this.state.newPackage,
                        emailCount: val
                    }
                })
                break;
            case 'expireTime':
                this.setState({
                    newPackage: {
                        ...this.state.newPackage,
                        expireTime: val
                    }
                })
                break;
            case 'price':
                this.setState({
                    newPackage: {
                        ...this.state.newPackage,
                        price: val
                    }
                })
                break;
            case 'currency':
                this.setState({
                    newPackage: {
                        ...this.state.newPackage,
                        currency: val
                    }
                })
                break;
        }

    }

    async changeEditInput(Input, val) {
        switch (Input) {
            case 'name':
                this.setState({
                    selectedPackage: {
                        ...this.state.selectedPackage,
                        name: val
                    }
                })
                break;
            case 'smsCount':
                this.setState({
                    selectedPackage: {
                        ...this.state.selectedPackage,
                        smsCount: val
                    }
                })
                break;
            case 'notificationCount':
                this.setState({
                    selectedPackage: {
                        ...this.state.selectedPackage,
                        notificationCount: val
                    }
                })
                break;
            case 'emailCount':
                this.setState({
                    selectedPackage: {
                        ...this.state.selectedPackage,
                        emailCount: val
                    }
                })
                break;
            case 'expireTime':
                this.setState({
                    selectedPackage: {
                        ...this.state.selectedPackage,
                        expireTime: val
                    }
                })
                break;
            case 'price':
                this.setState({
                    selectedPackage: {
                        ...this.state.selectedPackage,
                        price: val
                    }
                })
                break;
            case 'currency':
                this.setState({
                    selectedPackage: {
                        ...this.state.selectedPackage,
                        currency: val
                    }
                })
                break;
        }

    }





    checkEditValidation(index, val) {
        const { EditArr } = this.state;
        let updatedArr;
        updatedArr = EditArr;
        updatedArr[index] = val;
        this.setState({ EditArr: updatedArr })
        this.checkDisableOrEnableBtnEdit(7, EditArr);

    }


    checkDisableOrEnableBtnEdit(num, arr) {
        let result;
        if (arr.length == num) {
            result = arr.filter((Item) => {
                return Item
            });
            if (result.length != num) {
                this.setState({ btnDisableEdit: true })
            }
            else {
                this.setState({ btnDisableEdit: false })
            }
        }
        else {
            this.setState({ btnDisableEdit: true })
        }
    }


    checkAddValidation(index, val) {

        const { AddArr } = this.state;
        let updatedArr;
        updatedArr = AddArr;
        updatedArr[index] = val;
        this.setState({ AddArr: updatedArr })
        this.checkDisableOrEnableBtnAdd(7, AddArr);

    }


    checkDisableOrEnableBtnAdd(num, arr) {
        let result;
        if (arr.length == num) {
            result = arr.filter((Item) => {
                return Item
            });
            if (result.length != num) {
                this.setState({ btnDisableAdd: true })
            }
            else {
                this.setState({ btnDisableAdd: false })
            }
        }
        else {
            this.setState({ btnDisableAdd: true })
        }
    }


    AddPackage() {
        const { newPackage, Packages } = this.state;
        this.setState({ showAdd: false });
        HtttpPostDefult('package/create', newPackage).then((res) => {
            if (!res.error) {
                Packages.push(newPackage)
                StorePackages(Packages);
                this.setState({ Packages: Packages })
                displayToast('Package data is added successfully', true);
            }
            else {
                displayToast('Package data is not added successfully', false);
            }

        })
    }


    EditPackage() {
        const { selectedPackage, selectedPackageIndex, Packages } = this.state;
        const { StorePackages } = this.props;
        this.setState({ showEdit: false });
        let res = selectedPackage;
        HtttpPutDefult('package/' + selectedPackage._id + '', res, true).then((res) => {
            if (res) {
                Packages[selectedPackageIndex] = selectedPackage;
                this.setState({ Packages: Packages, editMode: false });
                StorePackages(Packages)
                displayToast('Package data is updated successfully', true);
            }
        })
    }

    AddForm() {
        const { showAdd, newPackage, btnDisableAdd } = this.state;
        const { name, smsCount, notificationCount, emailCount, expireTime, price, currency } = newPackage;
        const handleClose = () => this.setState({ showAdd: false });
        return (
            <>
                <Modal show={showAdd} onHide={handleClose} dialogClassName="modal-80w">
                    <Modal.Header closeButton>
                        <Modal.Title>Add Package</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CardBody>
                            <Form>
                                <Row>
                                    <Col md={6}>
                                        <InputWithText type="text" label={"Name"} placeholder={"Enter package name"} value={name} isRequired onChange={(val) => this.changeAddInput("name", val)} onBlur={(val) => { this.checkAddValidation('0', val) }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputWithText type="text" label={"SMS Count"} placeholder={"Enter SMS Count"} isRequired onChange={(val) => this.changeAddInput("smsCount", val)} validation="number" onBlur={(val) => { this.checkAddValidation('1', val) }} value={smsCount} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputWithText type="text" label={"Notification Count"} placeholder={"Enter Notification Count"} onChange={(val) => this.changeAddInput("notificationCount", val)} value={notificationCount} validation="number" isRequired onBlur={(val) => { this.checkAddValidation('2', val) }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputWithText type="text" label={"Email Count"} placeholder={"Enter Email Count"} onChange={(val) => this.changeAddInput("emailCount", val)} value={emailCount} validation="number" isRequired onBlur={(val) => { this.checkAddValidation('3', val) }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"Price"} placeholder={"Enter Price"} onChange={(val) => this.changeAddInput("price", val)} value={price} validation="number" isRequired onBlur={(val) => { this.checkAddValidation('4', val) }} />
                                    </Col>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"Currency"} placeholder={"Enter Currency"} onChange={(val) => this.changeAddInput("currency", val)} value={currency} isRequired onBlur={(val) => { this.checkAddValidation('5', val) }} />
                                    </Col>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"Expire Time"} placeholder={"Enter Expire Time"} onChange={(val) => this.changeAddInput("expireTime", val)} validation="number" value={expireTime} isRequired onBlur={(val) => { this.checkAddValidation('6', val) }} />
                                    </Col>
                                </Row>
                            </Form>

                        </CardBody>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                        <Button variant="primary" disabled={btnDisableAdd} onClick={() => this.AddPackage()}>Save Changes</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }

    DetailsForm() {
        const { showDetails, selectedPackage } = this.state;
        const { name, smsCount, notificationCount, emailCount, expireTime, price, currency } = selectedPackage

        const handleClose = () => this.setState({ showDetails: false });
        return (
            <>
                <Modal show={showDetails} onHide={handleClose} dialogClassName="modal-70w BranchesDetails">
                    <Modal.Header closeButton>
                        <Modal.Title>Package Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CardBody>
                            <Form>
                                <Row>
                                    <Col md="4">
                                        <div className="detailsContainer">
                                            <label className="Title">Name:</label>
                                            <label className="subTitle">{name ? name : "No value"}</label>
                                        </div>
                                    </Col>
                                    <Col md="4">
                                        <div className="detailsContainer">
                                            <label className="Title">SMS Count:</label>
                                            <label className="subTitle">{smsCount ? smsCount : "No value"}</label>
                                        </div>
                                    </Col>
                                    <Col md="4">
                                        <div className="detailsContainer">
                                            <label className="Title">Notification Count:</label>
                                            <label className="subTitle">{notificationCount ? notificationCount : "No value"}</label>
                                        </div>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md="6">
                                        <div className="detailsContainer">
                                            <label className="Title">Email Count:</label>
                                            <label className="subTitle">{emailCount ? emailCount : "No value"}</label>
                                        </div>
                                    </Col>
                                    <Col md="6">
                                        <div className="detailsContainer">
                                            <label className="Title">Expire Time:</label>
                                            <label className="subTitle">{expireTime ? expireTime : "No value"}</label>
                                        </div>
                                    </Col>
                                </Row>


                                <Row>
                                    <Col md="6">
                                        <div className="detailsContainer">
                                            <label className="Title">Price:</label>
                                            <label className="subTitle">{price ? price : "No value"}</label>
                                        </div>
                                    </Col>
                                    <Col md="6">
                                        <div className="detailsContainer">
                                            <label className="Title">Currency:</label>
                                            <label className="subTitle">{currency ? currency : "No value"}</label>
                                        </div>
                                    </Col>
                                </Row>


                            </Form>
                        </CardBody>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }



    EditForm() {
        const { showEdit, selectedPackage, btnDisableEdit } = this.state;
        const { name, smsCount, notificationCount, emailCount, expireTime, price, currency } = selectedPackage;

        const handleClose = () => this.setState({ showEdit: false });
        return (
            <>
                <Modal show={showEdit} onHide={handleClose} dialogClassName="modal-70w">
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Package</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CardBody>
                            <Form>
                                <Row>
                                    <Col md={6}>
                                        <InputWithText type="text" label={"Name"} placeholder={"Enter package name"} value={name} isRequired onChange={(val) => this.changeEditInput("name", val)} onBlur={(val) => { this.checkEditValidation('0', val) }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputWithText type="text" label={"SMS Count"} placeholder={"Enter SMS Count"} isRequired onChange={(val) => this.changeEditInput("smsCount", val)} validation="number" onBlur={(val) => { this.checkEditValidation('1', val) }} value={smsCount} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputWithText type="text" label={"Notification Count"} placeholder={"Enter Notification Count"} onChange={(val) => this.changeEditInput("notificationCount", val)} value={notificationCount} validation="number" isRequired onBlur={(val) => { this.checkEditValidation('2', val) }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputWithText type="text" label={"Email Count"} placeholder={"Enter Email Count"} onChange={(val) => this.changeEditInput("emailCount", val)} value={emailCount} validation="number" isRequired onBlur={(val) => { this.checkEditValidation('3', val) }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"Price"} placeholder={"Enter Price"} onChange={(val) => this.changeEditInput("price", val)} value={price} validation="number" isRequired onBlur={(val) => { this.checkEditValidation('4', val) }} />
                                    </Col>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"Currency"} placeholder={"Enter Currency"} onChange={(val) => this.changeEditInput("currency", val)} value={currency} isRequired onBlur={(val) => { this.checkEditValidation('5', val) }} />
                                    </Col>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"Expire Time"} placeholder={"Enter Expire Time"} onChange={(val) => this.changeEditInput("expireTime", val)} validation="number" value={expireTime} isRequired onBlur={(val) => { this.checkEditValidation('6', val) }} />
                                    </Col>
                                </Row>
                            </Form>

                        </CardBody>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                        <Button variant="primary" disabled={btnDisableEdit} onClick={() => this.EditPackage()}>Save Changes</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }

    delete(Item, key) {
        const { Packages } = this.state;
        const { StorePackages } = this.props;
        Packages[key].isDeleted = true;
        HtttpPutDefult("package/" + Item._id + "", Packages[key], true).then((res) => {
            if (res) {
                Packages.splice(key, 1);
                this.setState({ Packages: Packages })
                StorePackages(Packages)
                displayToast('Package is deleted successfully', true);

            }
        })
    }




    render() {
        const { Packages, showAdd, showDetails, showEdit } = this.state;

        return (
            <Aux>
                <div className="Packages">
                    {showAdd && this.AddForm()}
                    {showEdit && this.EditForm()}
                    {showDetails && this.DetailsForm()}

                    <Row>
                        <Col md="12">
                            <TableData
                                headCells={this.headCells}
                                data={Packages}
                                DataShowPerTable={this.DataShowPerTable}
                                handleDelete={(val, index) => { this.delete(val, index) }}
                                handleDetails={(val, index) => { this.Details(val, index) }}
                                handleEdit={(val, index) => { this.Edit(val, index) }}
                                totalPages={1}
                                Title={"Packages"}
                                handleAdd={() => { this.Add() }}
                                showDelete
                                noResultMSG={"There is no available packages"}
                            />
                        </Col>
                    </Row>
                </div>

            </Aux>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        Packages: state.storage.PackagesState.Packages,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        StorePackages: (val) => dispatch(StorePackages(val)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Packages);

